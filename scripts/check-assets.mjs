import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, readdir, access } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const pages = (await readdir(root)).filter(name => name.endsWith('.html'));
for (const page of pages) {
  const html = await readFile(new URL(page, root), 'utf8');
  assert(!/Lorem ipsum|Simon Doe/.test(html), `${page}: placeholder content`);
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
assert.equal([...html.matchAll(/class="project-card"/g)].length, 4);
for (const project of ['watchworld', 'tresors-de-paris', 'exploding-booze', 'mazebound']) {
  for (let i = 1; i <= 3; i++) await access(new URL(`assets/${project}-screen-${i}.webp`, root));
}
const css = await readFile(new URL('styles.css', root), 'utf8');
for (const [, asset] of css.matchAll(/url\(['"]([^'"]+)['"]\)/g)) await access(new URL(asset, root));
console.log('Four apps, all twelve gallery images and self-hosted font exist.');
