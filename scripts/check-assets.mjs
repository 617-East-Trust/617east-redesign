import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.resolve(__dirname, "../client/public/images");
const BUDGETS = [
  { pattern: /logo/, max: 150 * 1024 },
  { pattern: /og-image/, max: 300 * 1024 },
  { pattern: /founder|hero/, max: 400 * 1024 },
  { pattern: /contact-bg|services-bg|about-hero/, max: 500 * 1024 },
];
const GLOBAL_MAX = 1024 * 1024;
const TOTAL_MAX = 3 * 1024 * 1024;

let errors = [];
let totalSize = 0;
let files = fs.readdirSync(IMAGES_DIR).filter(f => /\.(png|jpg|jpeg|webp|avif|svg|gif)$/i.test(f));

for (const file of files) {
  const filePath = path.join(IMAGES_DIR, file);
  const size = fs.statSync(filePath).size;
  totalSize += size;

  if (size > GLOBAL_MAX) {
    errors.push(`FAIL: ${file} is ${(size / 1024 / 1024).toFixed(1)} MB (limit: 1 MB)`);
    continue;
  }

  let matched = false;
  for (const { pattern, max } of BUDGETS) {
    if (pattern.test(file)) {
      matched = true;
      if (size > max) {
        errors.push(`FAIL: ${file} is ${(size / 1024).toFixed(0)} KB (budget: ${(max / 1024).toFixed(0)} KB)`);
      }
      break;
    }
  }
}

if (totalSize > TOTAL_MAX) {
  errors.push(`FAIL: total image payload ${(totalSize / 1024 / 1024).toFixed(1)} MB (limit: ${(TOTAL_MAX / 1024 / 1024).toFixed(1)} MB)`);
}

if (errors.length > 0) {
  console.error("❌ Asset budget exceeded:");
  errors.forEach(e => console.error("  ", e));
  process.exit(1);
} else {
  console.log(`✅ Asset budget OK: ${files.length} files, ${(totalSize / 1024).toFixed(0)} KB total`);
}
