// Refresh the published store artwork and gallery data without a runtime dependency.
// Requires npm ci. The website itself remains buildless HTML/CSS/JavaScript.
import { createHash } from 'node:crypto';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import gplay from 'google-play-scraper';
import sharp from 'sharp';

const root = new URL('../', import.meta.url);
const directory = new URL('assets/store/', root);
await mkdir(directory, { recursive: true });
const knownApps = [
  ['watchworld', 'com.WatchWorld'],
  ['exploding-booze', 'com.explodingbooze'],
  ['mazebound', 'nl.valentijnkeijser.towerdefense'],
];

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Store lookup failed: ${response.status} ${url}`);
  return response.json();
}
async function download(url, label, width) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Image download failed: ${response.status} ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  const webp = await sharp(buffer).resize({ width, withoutEnlargement: true }).webp({ quality: 86 }).toBuffer();
  const { width: outputWidth, height } = await sharp(webp).metadata();
  const hash = createHash('sha256').update(webp).digest('hex').slice(0, 10);
  const file = `${label}.${hash}.webp`;
  await writeFile(new URL(file, directory), webp);
  return { file, url, width: outputWidth, height };
}

// Apple developer ID supplied by the site owner. Only published software is used.
const appleLookup = 'https://itunes.apple.com/lookup?id=6825521256&entity=software&country=nl';
const apple = (await getJson(appleLookup)).results.filter(app => app.wrapperType === 'software');
const iosBooze = apple.find(app => app.trackId === 6825521254);
const paris = apple.find(app => app.trackId === 6825832241);
if (!iosBooze?.screenshotUrls?.length || !paris?.trackViewUrl) throw new Error('Expected App Store listings are unavailable; existing site data was retained.');
const stores = { checkedAt: new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(new Date()), apps: {} };
for (const [slug, appId] of knownApps) {
  const app = await gplay.app({ appId, lang: 'en', country: 'nl' });
  if (!app.screenshots?.length) throw new Error(`No Google Play screenshots for ${slug}`);
  const entry = { name: app.title, googlePlay: `https://play.google.com/store/apps/details?id=${appId}`, android: [], ios: [] };
  entry.icon = await download(app.icon + '=s512', slug + '-icon', 256);
  // The leading phone gallery is used for the party game; tablet duplicates are omitted.
  const screenshots = [...new Set(app.screenshots)].slice(0, slug === 'exploding-booze' ? 7 : 6);
  for (let i = 0; i < screenshots.length; i++) entry.android.push(await download(screenshots[i] + '=w1000', `${slug}-android-${i + 1}`, 800));
  if (slug === 'exploding-booze') {
    entry.appStore = iosBooze.trackViewUrl.replace('?uo=4', '');
    for (let i = 0; i < iosBooze.screenshotUrls.length; i++) {
      const url = iosBooze.screenshotUrls[i].replace('/320x480bb.jpg', '/800x0w.jpg');
      entry.ios.push(await download(url, `${slug}-ios-${i + 1}`, 800));
    }
  }
  stores.apps[slug] = entry;
  console.log(`${slug}: ${entry.android.length} Android, ${entry.ios.length} iOS screenshots.`);
}
stores.extra = { name: paris.trackName, appStore: paris.trackViewUrl.replace('?uo=4', ''), googlePlay: 'https://play.google.com/store/apps/details?id=com.tresorsdeparis' };
await writeFile(new URL('sources.json', directory), JSON.stringify(stores, null, 2) + '\n');

const runtime = Object.fromEntries(Object.entries(stores.apps).map(([slug, app]) => [slug, {
  name: app.name, googlePlay: app.googlePlay, ...(app.appStore ? { appStore: app.appStore } : {}),
  screenshots: Object.fromEntries(['android', 'ios'].map(platform => [platform, app[platform].map(({ file, width, height }) => ({ src: 'assets/store/' + file, width, height }))])),
}]));
const htmlUrl = new URL('index.html', root);
let html = await readFile(htmlUrl, 'utf8');
html = html.replace(/<img\b[^>]*data-store-image="([^"]+)"[^>]*>/g, (tag, key) => {
  const [slug, platform, number] = key.split(':');
  const app = stores.apps[slug];
  const asset = platform === 'icon' ? app.icon : app[platform][Number(number) - 1];
  if (!asset) throw new Error('Missing preview image: ' + key);
  return tag.replace(/src="[^"]+"/, `src="assets/store/${asset.file}"`).replace(/width="\d+"/, `width="${asset.width}"`).replace(/height="\d+"/, `height="${asset.height}"`);
});
html = html.replace(/<a\b[^>]*data-gallery="([^"]+)"[^>]*>/g, (tag, slug) => tag.replace(/href="[^"]+"/, `href="${runtime[slug].screenshots.android[0].src}"`));
await writeFile(htmlUrl, html);
const scriptUrl = new URL('script.js', root);
const script = await readFile(scriptUrl, 'utf8');
if (!script.includes('/* STORE_DATA_START */')) throw new Error('Gallery data marker is missing.');
await writeFile(scriptUrl, script.replace(/\/\* STORE_DATA_START \*\/[\s\S]*?\/\* STORE_DATA_END \*\//, '/* STORE_DATA_START */ ' + JSON.stringify(runtime, null, 4) + ' /* STORE_DATA_END */'));
console.log(`Updated previews, gallery data and provenance in ${fileURLToPath(directory)}.`);
