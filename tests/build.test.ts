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
  for (const id of ['about', 'work', 'experience', 'skills', 'education', 'contact']) {
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
    'Otto-Friedrich-Universität Bamberg',
    'German (B1',
    'Oct 2022 – Mar 2026',
    'Acharya Institute of Technology',
    '2012 – 2016',
    'href="#about"',
  ]) assert.ok(html.includes(s), s);
});

test('the h1 is his name, and the old headline is gone', () => {
  assert.match(html, /<h1[^>]*>\s*Sanketh S G\s*<\/h1>/);
  assert.doesNotMatch(html, /I build backends/);
});

test('no broken optional links and no résumé button while resumeUrl is unset', () => {
  assert.doesNotMatch(html, /href=""|href="undefined"|>undefined<|Résumé|Resume/);
});

test('"More projects on GitHub" links to the repositories page', () => {
  assert.match(html, /<a[^>]*href="https:\/\/github\.com\/sanketh-sg\?tab=repositories"[^>]*>\s*More projects on GitHub/);
});

test('every image has alt text', () => {
  for (const img of html.match(/<img\s[^>]*>/g) ?? []) {
    assert.match(img, /alt="[^"]+"/, img);
  }
});

test('project cards carry their glow colour and an eclipse hover style', () => {
  assert.equal(count(/<article[^>]*class="[^"]*glow-card[^>]*style="--glow:\s*#[0-9A-Fa-f]{6}/g), 4);
  assert.match(css, /\.glow-card:(hover|focus-within)[^{]*\{[^}]*box-shadow[^}]*var\(--glow\)/);
});

test('every chip carries a glow colour and glows on hover', () => {
  const chips = count(/<li[^>]*class="[^"]*\bchip\b/g);
  assert.ok(chips > 40, `only ${chips} chips`);
  assert.equal(count(/<li[^>]*class="[^"]*\bchip\b[^>]*style="--glow:\s*#[0-9A-F]{6}"/g), chips);
  assert.match(css, /\.chip:hover[^{]*\{[^}]*box-shadow[^}]*var\(--glow\)/);
});

test('header marks the section in view with aria-current and underlines it', () => {
  const spy = (html.match(/<script[^>]*>[\s\S]*?<\/script>/g) ?? []).find((s) => s.includes('aria-current'));
  assert.ok(spy, 'no section-tracking script');
  assert.match(spy, /scroll/);
  // It sits in the header, above the sections, so it must wait for the DOM.
  assert.match(spy, /DOMContentLoaded/);
  assert.match(css, /\[aria-current[^\]]*\][^{]*\{[^}]*text-decoration-line:\s*underline/);
});

test('links opening a new tab carry noopener noreferrer', () => {
  for (const a of html.match(/<a\s[^>]*target="_blank"[^>]*>/g) ?? []) {
    assert.match(a, /rel="noopener noreferrer"/, a);
  }
});
