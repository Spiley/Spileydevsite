import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const pages = (await readdir(root)).filter(name => name.endsWith('.html'));
for (const page of pages) {
  const html = await readFile(new URL(page, root), 'utf8');
  assert(!/Lorem ipsum|Simon Doe/.test(html), `${page}: placeholder content`);
  assert(!/\u2014|&mdash;|&#8212;|&#x2014;/i.test(html), `${page}: emdash in visible page source`);
  for (const [, target] of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (/^(?:[a-z]+:|\/\/)/i.test(target)) continue;
    const [pathname, fragment] = target.split('#');
    const file = pathname || page;
    await access(new URL(file, root));
    if (fragment && file.endsWith('.html')) {
      assert((await readFile(new URL(file, root), 'utf8')).includes(`id="${fragment}"`), `${page}: missing ${target}`);
    }
    const match = file.match(/^(styles|script)\.([a-f0-9]{12})\.(css|js)$/);
    if (match) {
      const [, name, hash, extension] = match;
      const generated = await readFile(new URL(file, root), 'utf8');
      const source = (await readFile(new URL(`${name}.${extension}`, root), 'utf8')).replace(/\r\n/g, '\n');
      assert.equal(generated, source, `${page}: stale ${file}`);
      assert.equal(createHash('sha256').update(generated).digest('hex').slice(0, 12), hash);
    }
  }
  assert(/styles\.[a-f0-9]{12}\.css/.test(html), `${page}: missing versioned stylesheet`);
  console.log(`${page}: local links, anchors and versioned assets OK.`);
}
const html = await readFile(new URL('index.html', root), 'utf8');
assert.equal([...html.matchAll(/class="project-card"/g)].length, 3);
assert(!html.includes('✳') && !html.includes('status-dot'), 'Removed decorative marks returned');
const extra = html.match(/<aside class="extra-app"[\s\S]*?<\/aside>/)?.[0];
assert(extra && !extra.includes('<img'), 'Trésors de Paris must remain an image-free extra');
const stores = JSON.parse(await readFile(new URL('assets/store/sources.json', root), 'utf8'));
const script = await readFile(new URL('script.js', root), 'utf8');
assert(!script.includes('\u2014'), 'Emdash in gallery text');
const runtime = JSON.parse(script.match(/\/\* STORE_DATA_START \*\/([\s\S]*?)\/\* STORE_DATA_END \*\//)[1]);
let screenshotCount = 0;
for (const [slug, app] of Object.entries(stores.apps)) {
  for (const platform of ['android', 'ios']) {
    assert.equal(runtime[slug].screenshots[platform].length, app[platform].length);
    for (let index = 0; index < app[platform].length; index++) {
      const shot = app[platform][index];
      assert.equal(runtime[slug].screenshots[platform][index].src, 'assets/store/' + shot.file);
      await access(new URL('assets/store/' + shot.file, root));
      screenshotCount++;
    }
  }
  await access(new URL('assets/store/' + app.icon.file, root));
}
assert(runtime['exploding-booze'].appStore.includes('/id6825521254'));
const css = await readFile(new URL('styles.css', root), 'utf8');
for (const [, asset] of css.matchAll(/url\(['"]([^'"]+)['"]\)/g)) await access(new URL(asset, root));
console.log(`Three featured apps, an image-free extra and ${screenshotCount} current store screenshots verified.`);
