import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as site from '../src/data/site.ts';

const { profile, featured, projects, moreProjects, experience, skills, education } = site;
const gh = (name: string) => `https://github.com/sanketh-sg/${name}`;

test('profile has the confirmed contact facts and no résumé yet', () => {
  assert.equal(profile.email, 'sankethsg2944@gmail.com');
  assert.equal(profile.location, 'Bamberg, Germany');
  assert.equal(profile.resumeUrl, undefined);
});

test('prost-go is featured, then the three main projects in order', () => {
  assert.ok(featured.name.startsWith('prost-go'));
  assert.deepEqual(
    projects.map((p) => p.repo),
    ['prost', 'buy-or-wait-financial-decision-agent', 'deutsch-lehrer'].map(gh),
  );
  assert.equal(projects[2].live, 'https://deutsch-lehrer-kqw3.vercel.app');
});

test('every defined link is absolute and non-empty', () => {
  const hrefs = [
    ...profile.links.map((l) => l.href),
    ...[featured, ...projects].flatMap((p) => [p.repo, p.live]),
    ...moreProjects.map((p) => p.repo),
  ].filter((h) => h !== undefined);
  for (const h of hrefs) assert.match(h, /^(https:\/\/|mailto:)\S+$/, h);
});

test('message router has no repo link', () => {
  const router = moreProjects.find((p) => /router/i.test(p.name));
  assert.ok(router);
  assert.equal(router.repo, undefined);
});

test('experience is one Cognizant entry with three groups, platforms included', () => {
  assert.equal(experience.company, 'Cognizant Technology Solutions');
  assert.equal(experience.period, '2017 – 2022');
  assert.deepEqual(experience.groups.map((g) => g.title), [
    'Backend & integration', 'Contact center & UC platforms', 'Full-stack & delivery',
  ]);
});

test('about tells the story from Cognizant to Bamberg to today', () => {
  const text = site.about.join(' ');
  assert.ok(site.about.length >= 3);
  assert.doesNotMatch(text, /memory safety/i);
  for (const s of ['Cognizant', 'Genesys Cloud CX', 'enabling capabilities in Unix-like operating systems', 'observability', 'German (B1']) {
    assert.ok(text.includes(s), s);
  }
});

test('contact line names every kind of role he is open to', () => {
  for (const s of ['full-stack', 'backend', 'platform', 'contact center', 'UC', 'CCaaS']) {
    assert.ok(profile.contactLine.includes(s), s);
  }
});

test('copy uses conservative numbers and has no placeholders', () => {
  const all = JSON.stringify(site);
  assert.ok(all.includes('85%'));
  assert.ok(all.includes('99.7%'));
  assert.doesNotMatch(all, /lorem|\[Your Name\]|TODO|90% coverage|sankethsg2021/i);
});

test('every card has a glow colour from its core language', () => {
  const glows = [featured, ...projects].map((p) => p.glow);
  for (const g of glows) assert.match(g, /^#[0-9a-f]{6}$/i);
  assert.deepEqual(glows, ['#00ADD8', '#F89820', '#FFD43B', '#3178C6']); // Go, Java, Python, TypeScript
});

test('skills glow in their brand colour, unknown ones in neutral stone', () => {
  assert.equal(site.glowFor('Go'), '#00ADD8');
  assert.equal(site.glowFor('PostgreSQL'), '#4169E1');
  assert.equal(site.glowFor('RabbitMQ'), '#FF6600');
  assert.equal(site.glowFor('Something new'), '#A8A29E');
});

test('every skill and tag has a valid glow colour', () => {
  const names = [...skills.flatMap((s) => s.items), ...[featured, ...projects].flatMap((p) => p.tags)];
  for (const n of names) assert.match(site.glowFor(n), /^#[0-9A-F]{6}$/, n);
});

test('skill groups are in the agreed order', () => {
  assert.deepEqual(skills.map((s) => s.group), [
    'Backend', 'Frontend', 'Data & messaging', 'Cloud & DevOps', 'Contact center & UC', 'Testing & practice', 'AI',
  ]);
  const all = skills.flatMap((s) => s.items);
  for (const s of ['Observability (LGTM)', 'SIP/VoIP', 'Genesys Cloud CX', 'Cisco UCCE/CUCM', 'LLM/AI agents']) {
    assert.ok(all.includes(s), s);
  }
});

test('education lists the Bamberg master with its thesis, and the BSc', () => {
  assert.equal(education.length, 2);
  assert.equal(education[0].school, 'Otto-Friedrich-Universität Bamberg');
  assert.equal(education[0].note, 'Thesis: Enabling capabilities in Unix-like operating systems.');
});
