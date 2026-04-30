import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const poemsPath = path.join(rootDir, 'src/data/poems.json');
const imagesDir = path.join(rootDir, 'public/images/poems');

async function main() {
  const poems = JSON.parse(await readFile(poemsPath, 'utf8'));
  const files = await readdir(imagesDir);
  const imageById = new Map(
    files
      .filter((file) => file.endsWith('.webp'))
      .map((file) => [path.basename(file, '.webp'), `/images/poems/${file}`]),
  );

  let updatedCount = 0;
  const updatedPoems = poems.map((poem) => {
    const image = imageById.get(poem.id);
    if (!image || poem.image === image) {
      return poem;
    }

    updatedCount += 1;
    return { ...poem, image };
  });

  await writeFile(poemsPath, `${JSON.stringify(updatedPoems, null, 2)}\n`);
  console.log(`Updated ${updatedCount} poem image field(s).`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
