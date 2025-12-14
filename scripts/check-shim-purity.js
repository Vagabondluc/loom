#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
console.log('Checking demo runtime shim purity (JS) ...');

const glob = (dir) => {
  const res = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const p = path.join(dir, it.name);
    if (it.isDirectory()) res.push(...glob(p));
    else res.push(p);
  }
  return res;
};

const files = glob(path.join(root, 'demo')).filter(f => /registry[\\/]+runtime[\\/].*\.(ts|tsx)$/.test(f));
let failed = false;
for (const f of files) {
  const rel = path.relative(root, f);
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split(/\r?\n/);
  const violations = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    if (line.startsWith('//')) continue;
    if (line.startsWith('export')) continue;
    if (line.startsWith('/*')) continue;
    if (line.startsWith('declare')) continue;
    violations.push(`${i+1}: ${lines[i]}`);
  }
  if (violations.length) {
    console.error('Violation in shim:', rel);
    violations.forEach(v => console.error('  ' + v));
    failed = true;
  }
  // Check for class/function
  if (/\b(class|function)\b/.test(content)) {
    console.error('Found class/function in shim:', rel);
    const matches = content.split(/\r?\n/).map((ln, idx) => ({ln, idx})).filter(x => /\b(class|function)\b/.test(x.ln));
    matches.forEach(m => console.error('  ' + (m.idx+1) + ': ' + m.ln));
    failed = true;
  }
}

if (failed) {
  console.error('Demo runtime shim purity checks failed.');
  process.exit(1);
}

console.log('Demo runtime shim purity checks passed.');
