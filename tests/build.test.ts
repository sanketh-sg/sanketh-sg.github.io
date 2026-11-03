// Checks the built page. Run `npm run build` first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const count = (re: RegExp) => (html.match(re) ?? []).length;

test('page has header, nav, footer landmarks and a single h1', () => {
  assert.ok(html.includes('<header'));
  assert.ok(html.includes('<nav'));
  assert.ok(html.includes('<footer'));
  assert.equal(count(/<h1[\s>]/g), 1);
});

test('theme script guards localStorage with try', () => {
  const scripts = html.match(/<script[^>]*>[\s\S]*?<\/script>/g) ?? [];
  const theme = scripts.find((s) => s.includes('data-theme') || s.includes('dataset.theme'));
  assert.ok(theme, 'no theme script');
  assert.ok(theme.includes('try'));
  assert.ok(theme.includes('localStorage'));
});

test('theme toggle button is labelled', () => {
  assert.match(html, /<button[^>]*aria-label="[^"]*theme[^"]*"/i);
});

test('footer shows the copyright line', () => {
  assert.match(html, /© \d{4} Sanketh S G/);
});

test('links opening a new tab carry noopener noreferrer', () => {
  for (const a of html.match(/<a\s[^>]*target="_blank"[^>]*>/g) ?? []) {
    assert.match(a, /rel="noopener noreferrer"/, a);
  }
});
