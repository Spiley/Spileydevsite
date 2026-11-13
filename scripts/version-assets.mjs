import { createHash } from 'node:crypto';
import { readFile, writeFile, readdir } from 'node:fs/promises';
const root = new URL('../', import.meta.url);
const versions = new Map();
for (const source of ['styles.css', 'script.js']) {
  const content = (await readFile(new URL(source, root), 'utf8')).replace(/\r\n/g, '\n');
  const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
  const [name, extension] = source.split('.');
  const output = `${name}.${hash}.${extension}`;
  await writeFile(new URL(output, root), content);
  versions.set(source, output);
}
for (const file of (await readdir(root)).filter(name => name.endsWith('.html'))) {
  let html = await readFile(new URL(file, root), 'utf8');
  for (const [source, output] of versions) {
    const [name, extension] = source.split('.');
    html = html.replace(new RegExp(`${name}(?:\\.[a-f0-9]{12})?\\.${extension}`, 'g'), output);
  }
  await writeFile(new URL(file, root), html.replace(/[ \t]+$/gm, ''));
}
console.log('Versioned assets:', Object.fromEntries(versions));
