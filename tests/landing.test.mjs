import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const projectFile = async (name) => {
  try {
    return await readFile(new URL(`../${name}`, import.meta.url), 'utf8');
  } catch {
    return '';
  }
};

const html = await projectFile('index.html');
const pending = await projectFile('PENDIENTES.md');

test('includes the complete conversion structure', () => {
  assert.ok(html, 'index.html must exist');

  for (const id of [
    'inicio',
    'servicios',
    'proceso',
    'trabajos',
    'opiniones',
    'preguntas',
    'contacto',
  ]) {
    assert.match(html, new RegExp(`id=["']${id}["']`), `missing #${id}`);
  }

  assert.match(html, /<main\b/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /href=["']#contenido["']/);
});

test('uses a resilient cinematic hero', () => {
  const videoTag = html.match(/<video\b[^>]*>/)?.[0] ?? '';

  for (const attribute of ['autoplay', 'muted', 'loop', 'playsinline']) {
    assert.match(videoTag, new RegExp(`\\b${attribute}\\b`), `video missing ${attribute}`);
  }

  assert.match(videoTag, /poster=["'][^"']+["']/);
  assert.match(html, /<source\b[^>]*type=["']video\/mp4["']/);
});

test('presents the requested service and trust content', () => {
  assert.equal((html.match(/class=["'][^"']*service-item\b[^"']*["']/g) || []).length, 6);
  assert.equal((html.match(/class=["'][^"']*work-item\b[^"']*["']/g) || []).length, 6);
  assert.equal((html.match(/class=["']testimonial(?:\s[^"']*)?["']/g) || []).length, 3);
  assert.ok((html.match(/<details\b/g) || []).length >= 5, 'at least five FAQs are required');
});

test('exposes direct contact paths and local business metadata', () => {
  assert.match(html, /href=["']https:\/\/wa\.me\/[^"']+["']/);
  assert.match(html, /href=["']tel:[^"']+["']/);
  assert.match(html, /href=["']mailto:[^"']+["']/);
  assert.match(html, /<form\b[^>]*id=["']quote-form["']/);
  assert.match(html, /"@type"\s*:\s*"LocalBusiness"/);
});

test('documents every category of temporary business data', () => {
  assert.ok(pending, 'PENDIENTES.md must exist');

  for (const category of [
    'WhatsApp',
    'teléfono',
    'correo',
    'dirección',
    'horarios',
    'zona',
    'fotos',
    'video',
    'reseñas',
    'plazos',
    'garantía',
    'dominio',
    'SEO',
    'analítica',
  ]) {
    assert.match(pending, new RegExp(category, 'i'), `missing pending category: ${category}`);
  }
});

test('all internal navigation targets exist', () => {
  const targets = [...html.matchAll(/href=["']#([^"']+)["']/g)].map((match) => match[1]);

  for (const target of new Set(targets)) {
    assert.match(html, new RegExp(`id=["']${target}["']`), `broken internal target: #${target}`);
  }
});

test('contains the responsive visual system and accessibility safeguards', () => {
  for (const token of ['--ink', '--deep', '--paper', '--amber', '--mist']) {
    assert.match(html, new RegExp(`${token}\\s*:`), `missing design token ${token}`);
  }

  assert.match(html, /@media\s*\([^)]*max-width:\s*760px/);
  assert.match(html, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(html, /:focus-visible/);
  assert.match(html, /min-height:\s*44px/);
  assert.match(html, /object-fit:\s*cover/);
  assert.match(html, /\.mobile-contact-bar\s*\{/);
  assert.match(html, /\.work-grid\s*\{/);
});

test('optimizes below-the-fold media and identifies illustrative assets', () => {
  const imageTags = [...html.matchAll(/<img\b[^>]*>/g)].map((match) => match[0]);

  assert.equal(imageTags.length, 7);
  assert.ok(imageTags.every((tag) => /loading=["']lazy["']/.test(tag)), 'all content images should be lazy loaded');
  assert.ok(imageTags.every((tag) => /alt=["'][^"']+["']/.test(tag)), 'all images need useful alt text');
  assert.match(html, /Video ilustrativo/);
  assert.ok((html.match(/Imagen ilustrativa/g) || []).length >= 6);
});

test('defines safe WhatsApp conversion behavior', () => {
  assert.match(html, /function buildWhatsAppUrl\s*\(message\)/);
  assert.match(html, /encodeURIComponent\s*\(message\.trim\(\)\)/);
  assert.match(html, /function openWhatsApp\s*\(message\)/);
  assert.match(html, /window\.open\s*\([^;]*['"]noopener,noreferrer['"]/);
  assert.match(html, /\[data-whatsapp-message\]/);
});

test('validates the quote form before preparing its message', () => {
  assert.match(html, /quoteForm\.addEventListener\s*\(['"]submit['"]/);
  assert.match(html, /quoteForm\.checkValidity\s*\(\)/);
  assert.match(html, /quoteForm\.reportValidity\s*\(\)/);
  assert.match(html, /formData\.get\s*\(['"]name['"]\)/);
  assert.match(html, /formData\.get\s*\(['"]zone['"]\)/);
  assert.match(html, /formData\.get\s*\(['"]service['"]\)/);
});

test('implements accessible navigation and progressive reveals', () => {
  assert.match(html, /navToggle\.setAttribute\s*\(['"]aria-expanded['"]/);
  assert.match(html, /event\.key\s*===\s*['"]Escape['"]/);
  assert.match(html, /IntersectionObserver/);
  assert.match(html, /revealElements\.forEach/);
  assert.match(html, /document\.documentElement\.classList\.add\s*\(['"]js['"]\)/);
});

test('coordinates FAQ state and dynamic footer year', () => {
  assert.match(html, /querySelectorAll\s*\(['"]\.faq-item['"]\)/);
  assert.match(html, /item\.removeAttribute\s*\(['"]open['"]\)/);
  assert.match(html, /new Date\s*\(\)\.getFullYear\s*\(\)/);
});
