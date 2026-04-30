import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const poemsPath = path.join(rootDir, 'src/data/poems.json');
const outputDir = path.join(rootDir, 'public/images/poems');
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const poemId = args.find((arg) => !arg.startsWith('--'));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function buildPrompt(poem) {
  return [
    'Create a warm, elegant illustration for a Chinese poetry learning app.',
    'Style: refined watercolor and ink wash, child-friendly, cinematic natural light, no written text, no calligraphy, no watermark.',
    `Poem title: ${poem.title}`,
    `Dynasty: ${poem.dynasty}`,
    `Author: ${poem.author}`,
    `Poem text: ${poem.text.join(' ')}`,
    `Visual keywords: ${(poem.keywords ?? []).join(', ') || 'Chinese classical poetry'}`,
    'Composition: wide 16:9 landscape, clear subject, calm background, suitable behind readable poem text with a translucent overlay.',
  ].join('\n');
}

async function main() {
  const poems = JSON.parse(await readFile(poemsPath, 'utf8'));
  const selectedPoems = poemId ? poems.filter((poem) => poem.id === poemId) : poems;

  if (poemId && selectedPoems.length === 0) {
    throw new Error(`Poem not found: ${poemId}`);
  }

  await mkdir(outputDir, { recursive: true });

  if (dryRun) {
    for (const poem of selectedPoems) {
      console.log(`DRY RUN: ${poem.id} -> /images/poems/${poem.id}.webp`);
      console.log(buildPrompt(poem));
      console.log('---');
    }
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not set');
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  for (const [index, poem] of selectedPoems.entries()) {
    const outputPath = path.join(outputDir, `${poem.id}.webp`);

    if (existsSync(outputPath)) {
      console.log(`SKIP: ${poem.id} already exists`);
    } else {
      console.log(`GENERATE: ${poem.id}`);
      const response = await client.images.generate({
        model: 'dall-e-3',
        prompt: buildPrompt(poem),
        size: '1792x1024',
        response_format: 'b64_json',
      });

      const imageBase64 = response.data?.[0]?.b64_json;
      if (!imageBase64) {
        throw new Error(`No b64_json image returned for ${poem.id}`);
      }

      await writeFile(outputPath, Buffer.from(imageBase64, 'base64'));
      console.log(`SAVED: ${path.relative(rootDir, outputPath)}`);
    }

    if (index < selectedPoems.length - 1) {
      await delay(1500);
    }
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
