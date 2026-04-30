import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const rootDir = process.cwd();
const poems = JSON.parse(readFileSync(path.join(rootDir, 'src/data/poems.json'), 'utf8'));

test('Poem type exposes optional image field after keywords', () => {
  const source = readFileSync(path.join(rootDir, 'src/types/poem.ts'), 'utf8');
  assert.match(source, /keywords\?: string\[\];\n\s+image\?: string;/);
});

test('every poem has a local WebP illustration path and file', () => {
  for (const poem of poems) {
    assert.equal(poem.image, `/images/poems/${poem.id}.webp`, `${poem.id} image path`);
    assert.equal(
      existsSync(path.join(rootDir, 'public', poem.image)),
      true,
      `${poem.id} image file exists`,
    );
  }
});

test('poem detail page renders poem image as a decorative readable background', () => {
  const source = readFileSync(path.join(rootDir, 'src/app/poems/[poemId]/page.tsx'), 'utf8');
  assert.match(source, /backgroundImage: `url\(\$\{poem\.image\}\)`/);
  assert.match(source, /relative mb-8 overflow-hidden/);
  assert.match(source, /bg-white\/75/);
  assert.match(source, /dark:bg-paper-dark\/80/);
});
