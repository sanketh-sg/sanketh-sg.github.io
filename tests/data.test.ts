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

test('experience is one Cognizant entry with two groups', () => {
  assert.equal(experience.company, 'Cognizant Technology Solutions');
  assert.equal(experience.period, '2017 – 2022');
  assert.equal(experience.groups.length, 2);
});

test('copy uses conservative numbers and has no placeholders', () => {
  const all = JSON.stringify(site);
  assert.ok(all.includes('85%'));
  assert.ok(all.includes('99.7%'));
  assert.doesNotMatch(all, /lorem|\[Your Name\]|TODO|90% coverage|sankethsg2021/i);
});

test('skill groups are in the agreed order', () => {
  assert.deepEqual(skills.map((s) => s.group), [
    'Backend', 'Frontend', 'Data & messaging', 'Cloud & DevOps', 'Testing & practice', 'AI',
  ]);
});

test('education lists the Bamberg master and the BSc', () => {
  assert.equal(education.length, 2);
  assert.equal(education[0].school, 'University of Bamberg');
});
