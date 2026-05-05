import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const poemsPath = path.join(rootDir, 'src/data/poems.json');
const outputPath = path.join(rootDir, 'public/search-index.json');

const poems = JSON.parse(await readFile(poemsPath, 'utf8'));
const searchIndex = poems.map((poem) => ({
  id: poem.id,
  title: poem.title,
  author: poem.author,
  dynasty: poem.dynasty,
  type: poem.type,
  isRequired: poem.isRequired,
  text: poem.text,
}));

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, JSON.stringify(searchIndex), 'utf8');
console.log(`search index written: ${path.relative(rootDir, outputPath)} (${searchIndex.length} entries)`);
