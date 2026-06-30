import { test, expect, describe } from 'bun:test';
import { FEATURES, PRIMARY_NAV, FOOTER_GROUPS, CONTACT } from './site';

describe('FEATURES pipeline data', () => {
  test('has exactly 5 stages', () => {
    expect(FEATURES).toHaveLength(5);
  });

  test('steps are 1..5, sequential and unique', () => {
    const steps = FEATURES.map((f) => f.step);
    expect(steps).toEqual([1, 2, 3, 4, 5]);
  });

  test('slugs are unique and url-safe', () => {
    const slugs = FEATURES.map((f) => f.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
  });

  test('every stage has content and at least one capability', () => {
    for (const f of FEATURES) {
      expect(f.name.length).toBeGreaterThan(0);
      expect(f.hero.length).toBeGreaterThan(0);
      expect(f.sub.length).toBeGreaterThan(0);
      expect(f.label.length).toBeGreaterThan(0);
      expect(f.capabilities.length).toBeGreaterThanOrEqual(1);
    }
  });

  test('every stage color is a hex value', () => {
    for (const f of FEATURES) expect(f.color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });
});

describe('navigation + footer', () => {
  test('primary nav links are non-empty and rooted', () => {
    expect(PRIMARY_NAV.length).toBeGreaterThan(0);
    for (const l of PRIMARY_NAV) {
      expect(l.label.length).toBeGreaterThan(0);
      expect(l.href.startsWith('/')).toBe(true);
    }
  });

  test('footer groups cover Product, Resources, Company', () => {
    const titles = FOOTER_GROUPS.map((g) => g.title);
    expect(titles).toEqual(expect.arrayContaining(['Product', 'Resources', 'Company']));
    for (const g of FOOTER_GROUPS) expect(g.links.length).toBeGreaterThan(0);
  });
});

describe('contact details', () => {
  test('email looks valid and phone link is a tel: uri', () => {
    expect(CONTACT.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(CONTACT.phoneHref.startsWith('tel:')).toBe(true);
    expect(CONTACT.address.length).toBeGreaterThan(0);
  });

  test('CONTACT has a Web3Forms access key (UUID)', () => {
    expect(CONTACT.web3formsAccessKey).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });
});
