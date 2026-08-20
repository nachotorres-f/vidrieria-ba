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
