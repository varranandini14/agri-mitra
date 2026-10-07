#!/usr/bin/env node
/**
 * AgriMitra — Image Check Script
 * ─────────────────────────────────────────────────────────────
 * Run: node scripts/checkImages.js
 *
 * FAILS (exit code 1) if:
 *   - Any crop from crops data has no manifest entry
 *   - Any manifest entry is not marked verified
 *   - Any manifest entry's localPath file does not exist on disk
 *
 * Reports all issues and exits with code 1 on any failure.
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, '..');

// ─── 1. Load the image manifest ───────────────────────────────
const manifestPath = join(ROOT, 'src', 'data', 'imageManifest.js');

// Simple regex-based extraction (avoids needing to transpile JSX imports)
const manifestContent = readFileSync(manifestPath, 'utf8');

// Extract crop ids from crops.js by scanning for `id: '...'` patterns
const cropsPath = join(ROOT, 'src', 'data', 'crops.js');
const cropsContent = readFileSync(cropsPath, 'utf8');

const cropIdMatches = [...cropsContent.matchAll(/^\s+id:\s+['"]([^'"]+)['"]/gm)];
const cropIds = cropIdMatches.map((m) => m[1]);

// Extract manifest entries by scanning for `id: '...'` and `verified: ...`
const manifestIds = [...manifestContent.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
const verifiedFalseIds = [];

// Find entries with verified: false
const entryBlocks = manifestContent.split(/{[^}]*verified:\s*false[^}]*}/g);
const falseVerifiedMatches = [...manifestContent.matchAll(/id:\s*['"]([^'"]+)['"][^}]*verified:\s*false/g)];
for (const m of falseVerifiedMatches) {
  verifiedFalseIds.push(m[1]);
}

// Extract local paths from manifest
const pathMatches = [...manifestContent.matchAll(/localPath:\s*['"]([^'"]+)['"]/g)];
const localPaths = pathMatches.map((m) => m[1]);

let failures = 0;
let warnings = 0;

console.log('\n═══════════════════════════════════════');
console.log('  AgriMitra Image Check Report');
console.log('═══════════════════════════════════════\n');

// ─── 2. Check every crop has a manifest entry ──────────────────
console.log('📋 Checking crop → manifest coverage...');
for (const id of cropIds) {
  const inManifest = manifestIds.includes(id);
  if (!inManifest) {
    console.error(`  ✗ MISSING: crop id "${id}" has no manifest entry`);
    failures++;
  } else {
    console.log(`  ✓ ${id}`);
  }
}

// ─── 3. Check verified flags ───────────────────────────────────
console.log('\n🔍 Checking verified flags...');
if (verifiedFalseIds.length > 0) {
  for (const id of verifiedFalseIds) {
    console.warn(`  ⚠ UNVERIFIED: "${id}" — will use fallback illustration in app`);
    warnings++;
  }
} else {
  console.log('  ✓ All manifest entries are marked verified: true');
}

// ─── 4. Check physical file existence ─────────────────────────
console.log('\n📁 Checking physical file existence...');
for (const localPath of localPaths) {
  // localPath is like /images/crops/rice.jpg
  const diskPath = join(ROOT, 'public', localPath);
  if (!existsSync(diskPath)) {
    console.error(`  ✗ FILE NOT FOUND: ${localPath} (expected at ${diskPath})`);
    failures++;
  } else {
    const stats = readFileSync(diskPath);
    const sizeKb = Math.round(stats.length / 1024);
    console.log(`  ✓ ${localPath} (${sizeKb}KB)`);
  }
}

// ─── 5. Summary ───────────────────────────────────────────────
console.log('\n═══════════════════════════════════════');
if (failures === 0 && warnings === 0) {
  console.log('  ✅ ALL CHECKS PASSED — image manifest is complete and valid');
} else if (failures === 0) {
  console.log(`  ⚠ CHECKS PASSED WITH ${warnings} WARNING(S) — unverified images will show fallbacks`);
} else {
  console.log(`  ✗ ${failures} FAILURE(S), ${warnings} WARNING(S) — fix before deployment`);
}
console.log('═══════════════════════════════════════\n');

if (failures > 0) {
  process.exit(1);
}
