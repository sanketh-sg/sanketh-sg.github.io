// Checks the built page. Run `npm run build` first.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

const html = readFileSync('dist/index.html', 'utf8');
const css = readdirSync('dist/_astro')
  .filter((f) => f.endsWith('.css'))
  .map((f) => readFileSync(`dist/_astro/${f}`, 'utf8'))
  .join('\n');

test('without JS, dark styles follow the system theme', () => {
  assert.match(css, /prefers-color-scheme:\s*dark/);
  assert.match(css, /:not\(\[data-theme\]\)/);
});

test('without JS, the theme toggle is hidden', () => {
  assert.match(html, /<noscript>\s*<style>[^<]*\[data-theme-toggle\][^<]*display:\s*none/);
});

test('tapping a link in the phone menu closes it', () => {
  const scripts = (html.match(/<script[^>]*>[\s\S]*?<\/script>/g) ?? []).join('\n');
  assert.match(scripts, /details/);
  assert.match(scripts, /removeAttribute\(['"]open['"]\)|\.open\s*=\s*false/);
});
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

test('every content section exists and every in-page anchor resolves', () => {
  for (const id of ['work', 'experience', 'skills', 'education', 'contact']) {
    assert.ok(html.includes(`id="${id}"`), id);
  }
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) {
    assert.ok(html.includes(`id="${id}"`), `#${id} has no target`);
  }
});

test('page carries the confirmed contact and profile facts', () => {
  for (const s of [
    'mailto:sankethsg2944@gmail.com',
    'https://www.linkedin.com/in/sanketh-gopalli/',
    'https://deutsch-lehrer-kqw3.vercel.app',
    'Cognizant Technology Solutions',
    'Bamberg, Germany',
    'University of Bamberg',
  ]) assert.ok(html.includes(s), s);
});

test('the h1 is the headline', () => {
  assert.match(html, /<h1[^>]*>[^<]*I build backends that hold up/);
});

test('no broken optional links and no résumé button while resumeUrl is unset', () => {
  assert.doesNotMatch(html, /href=""|href="undefined"|>undefined<|Résumé|Resume/);
});

test('every image has alt text', () => {
  for (const img of html.match(/<img\s[^>]*>/g) ?? []) {
    assert.match(img, /alt="[^"]+"/, img);
  }
});

test('links opening a new tab carry noopener noreferrer', () => {
  for (const a of html.match(/<a\s[^>]*target="_blank"[^>]*>/g) ?? []) {
    assert.match(a, /rel="noopener noreferrer"/, a);
  }
});
