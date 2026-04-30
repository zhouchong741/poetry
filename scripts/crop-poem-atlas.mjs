import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [source, columnsArg, rowsArg, ...ids] = process.argv.slice(2);

if (!source || !columnsArg || !rowsArg || ids.length === 0) {
  console.error('Usage: node scripts/crop-poem-atlas.mjs <source> <columns> <rows> <poemId...>');
  process.exit(1);
}

const columns = Number(columnsArg);
const rows = Number(rowsArg);

if (!Number.isInteger(columns) || !Number.isInteger(rows) || columns <= 0 || rows <= 0) {
  console.error('Columns and rows must be positive integers.');
  process.exit(1);
}

if (ids.length > columns * rows) {
  console.error(`Too many poem ids for ${columns}x${rows} atlas.`);
  process.exit(1);
}

const outputDir = path.resolve('public/images/poems');
await mkdir(outputDir, { recursive: true });

const image = sharp(source);
const metadata = await image.metadata();
const width = metadata.width;
const height = metadata.height;

if (!width || !height) {
  throw new Error(`Unable to read image size: ${source}`);
}

const cellWidth = Math.floor(width / columns);
const cellHeight = Math.floor(height / rows);

for (const [index, id] of ids.entries()) {
  const column = index % columns;
  const row = Math.floor(index / columns);
  const left = column * cellWidth;
  const top = row * cellHeight;
  const extractWidth = column === columns - 1 ? width - left : cellWidth;
  const extractHeight = row === rows - 1 ? height - top : cellHeight;
  const out = path.join(outputDir, `${id}.webp`);

  await sharp(source)
    .extract({ left, top, width: extractWidth, height: extractHeight })
    .resize({ width: 1200, withoutEnlargement: false })
    .webp({ quality: 82 })
    .toFile(out);

  console.log(`SAVED ${path.relative(process.cwd(), out)}`);
}
