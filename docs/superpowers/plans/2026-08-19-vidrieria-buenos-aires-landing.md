# Vidriería Buenos Aires Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Construir una landing estática, moderna y orientada a consultas para Vidriería Buenos Aires, con hero de video, servicios, trabajos, reseñas, preguntas frecuentes y contacto por WhatsApp.

**Architecture:** La experiencia completa vive en `index.html`, con HTML semántico, CSS y JavaScript embebidos para que pueda publicarse sin compilación. Una suite con Node valida estructura, enlaces, datos temporales documentados y contratos básicos; la revisión final usa un servidor estático y navegador real.

**Tech Stack:** HTML5, CSS moderno, JavaScript sin dependencias, Node.js `node:test`, navegador real.

**Spec:** `docs/superpowers/specs/2026-08-19-vidrieria-buenos-aires-landing-design.md`

## Global Constraints

- La entrega principal es un único `index.html` sin framework ni proceso de compilación.
- El hero usa video silencioso en loop, imagen póster, capa de contraste y fallback estático.
- La acción principal consistente es pedir presupuesto por WhatsApp.
- Todos los datos de demostración deben estar enumerados en `PENDIENTES.md`.
- No presentar imágenes, reseñas, cifras ni promesas temporales como información verificada.
- Soportar teclado, foco visible, objetivos táctiles de 44 px y `prefers-reduced-motion`.
- El formulario abre WhatsApp; no debe sugerir que envía correo ni guardar datos.

---

### Task 1: Contrato estructural y documentación de datos temporales

**Files:**
- Create: `tests/landing.test.mjs`
- Create: `PENDIENTES.md`
- Create: `index.html`

**Interfaces:**
- Consumes: requisitos de la especificación aprobada.
- Produces: secciones con ids `inicio`, `servicios`, `proceso`, `trabajos`, `opiniones`, `preguntas` y `contacto`; documento de reemplazos reales.

- [x] **Step 1: Write the failing structural tests**

Crear pruebas con `node:test` que lean `index.html` y fallen si no existen `main`, un único `h1`, las siete secciones, un enlace para saltar al contenido, el video con `autoplay muted loop playsinline`, seis servicios, tres opiniones, seis trabajos y datos estructurados `LocalBusiness`.

```js
test('includes the complete conversion structure', () => {
  for (const id of ['inicio', 'servicios', 'proceso', 'trabajos', 'opiniones', 'preguntas', 'contacto']) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
});
```

- [x] **Step 2: Run the tests and verify RED**

Run: `node --test tests/landing.test.mjs`

Expected: FAIL because `index.html` and `PENDIENTES.md` do not exist.

- [x] **Step 3: Add the semantic content and pending-data checklist**

Crear el esqueleto completo en `index.html`, con navegación, textos finales de demostración, servicios, galería, reseñas, preguntas y contacto. Crear `PENDIENTES.md` con teléfono, WhatsApp, correo, dirección, horarios, zona, redes, reseñas, fotos, video, métricas, garantías, plazos, dominio, SEO, analítica y publicación.

- [x] **Step 4: Run the structural tests and verify GREEN**

Run: `node --test tests/landing.test.mjs`

Expected: PASS for the structural contract.

- [x] **Step 5: Commit the structural deliverable**

```bash
git add index.html PENDIENTES.md tests/landing.test.mjs
git commit -m "feat: add landing page content structure"
```

### Task 2: Sistema visual responsive y hero cinematográfico

**Files:**
- Modify: `tests/landing.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: ids y contenido de Task 1.
- Produces: variables CSS `--ink`, `--paper`, `--amber`, layout responsive, estados de foco y fallback de movimiento.

- [x] **Step 1: Write the failing visual-contract tests**

Agregar aserciones para variables de color, `@media (prefers-reduced-motion: reduce)`, breakpoints móvil, `min-height: 44px`, `:focus-visible`, `object-fit: cover`, póster del video, estados de carga diferida y barra de contacto móvil.

```js
test('contains accessibility and responsive visual safeguards', () => {
  assert.match(html, /prefers-reduced-motion:\s*reduce/);
  assert.match(html, /:focus-visible/);
  assert.match(html, /min-height:\s*44px/);
  assert.match(html, /object-fit:\s*cover/);
});
```

- [x] **Step 2: Run the tests and verify RED**

Run: `node --test tests/landing.test.mjs`

Expected: FAIL because the visual system is not implemented.

- [x] **Step 3: Implement the embedded CSS**

Agregar normalización, tipografía, paleta, hero full bleed, header superpuesto, listas editoriales, proceso numerado, galería asimétrica, reseñas, acordeón, cierre, footer, barra móvil y breakpoints. Incluir transiciones con desactivación total bajo movimiento reducido.

- [x] **Step 4: Run the tests and verify GREEN**

Run: `node --test tests/landing.test.mjs`

Expected: PASS for structure and visual safeguards.

- [x] **Step 5: Commit the visual system**

```bash
git add index.html tests/landing.test.mjs
git commit -m "feat: add responsive visual system and video hero"
```

### Task 3: Interacciones y conversión por WhatsApp

**Files:**
- Modify: `tests/landing.test.mjs`
- Modify: `index.html`

**Interfaces:**
- Consumes: formulario `#quote-form`, menú `#nav-toggle`, preguntas `.faq-item`, enlaces `[data-whatsapp-message]`.
- Produces: `buildWhatsAppUrl(message)`, `openWhatsApp(message)`, menú móvil, acordeones accesibles, observador de revelado y mensajes contextuales.

- [x] **Step 1: Write failing interaction-contract tests**

Agregar pruebas que exijan funciones nombradas, `encodeURIComponent`, validación de formulario, actualización de `aria-expanded`, cierre con Escape, `IntersectionObserver` y fallback cuando la API no existe.

```js
test('defines the interaction contracts', () => {
  assert.match(html, /function buildWhatsAppUrl\s*\(/);
  assert.match(html, /encodeURIComponent\s*\(/);
  assert.match(html, /aria-expanded/);
  assert.match(html, /IntersectionObserver/);
});
```

- [x] **Step 2: Run the tests and verify RED**

Run: `node --test tests/landing.test.mjs`

Expected: FAIL because JavaScript interactions are missing.

- [x] **Step 3: Implement minimal JavaScript interactions**

Implementar configuración centralizada del WhatsApp temporal, construcción segura de URLs, CTA por servicio, validación nativa del formulario, menú móvil, cierre con Escape y selección, acordeones con un panel abierto, revelado progresivo y año dinámico. No realizar solicitudes de red ni almacenar datos.

- [x] **Step 4: Run the tests and verify GREEN**

Run: `node --test tests/landing.test.mjs`

Expected: all interaction-contract tests PASS.

- [x] **Step 5: Commit the conversion behavior**

```bash
git add index.html tests/landing.test.mjs
git commit -m "feat: add accessible conversion interactions"
```

### Task 4: Verificación integral y correcciones visuales

**Files:**
- Modify: `index.html` only if a verified issue requires correction.
- Modify: `PENDIENTES.md` only if a temporary value was missed.
- Modify: `tests/landing.test.mjs` before fixing any discovered regression.

**Interfaces:**
- Consumes: landing completa de Tasks 1–3.
- Produces: evidencia de pruebas, revisión de escritorio/móvil, consola limpia y checklist final cubierto.

- [x] **Step 1: Run automated verification**

Run: `node --test tests/landing.test.mjs`

Expected: all tests PASS with zero failures.

- [x] **Step 2: Start a local static server**

Run: `python3 -m http.server 4173 --bind 127.0.0.1`

Expected: `http://127.0.0.1:4173/` responds with HTTP 200.

- [x] **Step 3: Verify desktop behavior in a real browser**

Comprobar a 1440 × 900: hero, video o póster, navegación, CTA, enlaces internos, menú, acordeones, formulario y consola sin errores.

- [x] **Step 4: Verify mobile behavior in a real browser**

Comprobar a 390 × 844: primera pantalla, menú, lectura sin desborde horizontal, galería, acordeones y barra de contacto persistente.

- [x] **Step 5: Verify reduced motion and keyboard flow**

Emular `prefers-reduced-motion: reduce`, recorrer controles con Tab y confirmar foco visible, orden lógico y ausencia de animación imprescindible.

- [x] **Step 6: Audit temporary data coverage**

Comparar cada teléfono, WhatsApp, correo, dirección, horario, zona, reseña, foto, video, cifra y promesa de `index.html` contra `PENDIENTES.md`; agregar cualquier omisión antes de finalizar.

- [x] **Step 7: Re-run verification after fixes**

Run: `node --test tests/landing.test.mjs && git diff --check`

Expected: all tests PASS and no whitespace errors.

- [x] **Step 8: Commit verified corrections**

```bash
git add index.html PENDIENTES.md tests/landing.test.mjs
git commit -m "fix: polish and verify landing experience"
```
