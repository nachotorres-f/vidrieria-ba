# Diseño de la landing de Vidriería Buenos Aires

Fecha: 19 de agosto de 2026

## Objetivo

Crear una landing moderna para una vidriería familiar de Buenos Aires que convierta visitas, especialmente móviles, en consultas por WhatsApp o teléfono. La página debe comunicar oficio, confianza, respuesta rápida y calidad visual sin aparentar ser una gran constructora impersonal.

## Posicionamiento

La marca se presentará como una vidriería cercana y resolutiva con terminación premium. El mensaje principal será que cada trabajo se fabrica a medida y se instala con cuidado, tanto para una reparación cotidiana como para una mejora arquitectónica.

La propuesta evita dos extremos: no parecerá un catálogo técnico antiguo ni una agencia de arquitectura inaccesible. El visitante debe reconocer en segundos qué se ofrece, dónde se trabaja y cómo pedir presupuesto.

## Tesis visual

Luz, precisión y oficio porteño: grandes planos de vidrio y reflejos, azul petróleo profundo, blanco cálido y un acento ámbar que remite a la luz atravesando el material.

El nombre “Vidriería Buenos Aires” será el elemento de marca más visible. Se utilizarán como máximo dos familias tipográficas, composición editorial, espacios amplios y divisores sutiles. No se construirá una grilla genérica de tarjetas; los servicios y pruebas sociales se resolverán como franjas, listas numeradas y fotografías protagonistas.

## Tesis de interacción

1. El hero comenzará con una breve aparición del video y una entrada escalonada de marca, titular y acciones.
2. Las secciones aparecerán suavemente al entrar en el viewport, respetando `prefers-reduced-motion`.
3. La galería responderá al hover o foco con ampliación leve y leyendas; en dispositivos táctiles mantendrá siempre visible la información necesaria.

## Arquitectura

La entrega principal será un único `index.html` con HTML semántico, CSS y JavaScript embebidos. No habrá framework, proceso de compilación ni dependencias de ejecución. Las imágenes y el video inicial podrán comenzar como recursos remotos de demostración; el documento `PENDIENTES.md` identificará cada recurso que deberá reemplazarse por material real antes de publicar.

También se incluirán:

- `PENDIENTES.md`, con datos, recursos y decisiones comerciales por completar.
- metadatos SEO y Open Graph temporales claramente identificados.
- datos estructurados `LocalBusiness` con valores de demostración.

## Estructura de contenido

### 1. Navegación

Encabezado superpuesto al hero con marca, enlaces a Servicios, Trabajos, Opiniones y Contacto, teléfono clickeable y acción principal de WhatsApp. En móvil se reemplazará por un menú accesible y una barra inferior persistente con “Llamar” y “WhatsApp”.

### 2. Hero cinematográfico

Video de fondo a ancho completo, silencioso, en loop, con reproducción en línea y `object-fit: cover`, siguiendo el efecto observado en Glassanex. Tendrá imagen póster, capa de contraste y un recorte estable para que el texto permanezca legible.

Jerarquía:

- marca: Vidriería Buenos Aires;
- titular: “Vidrios a medida. Instalación que queda impecable.”;
- apoyo: atención para hogares, comercios y obras en CABA y GBA;
- acción primaria: “Pedir presupuesto por WhatsApp”;
- acción secundaria: “Ver trabajos”.

Se mostrarán tres señales de confianza breves: presupuesto sin cargo, fabricación a medida y respuesta rápida. Se expresarán como información de demostración hasta recibir confirmación real.

Si el navegador no reproduce video, si hay ahorro de datos o si el usuario prefiere movimiento reducido, se mostrará el póster sin pérdida de contenido ni funcionalidad.

### 3. Servicios

Lista editorial de servicios con descripción breve y fotografía contextual:

- mamparas de baño;
- espejos a medida;
- barandas y cerramientos;
- frentes y puertas de vidrio;
- vidrios de seguridad y DVH;
- reparaciones y reemplazos.

Cada servicio tendrá una acción contextual que prepara un mensaje de WhatsApp con el servicio seleccionado.

### 4. Diferencial

Sección enfocada en la reducción de riesgo: asesoramiento, medición, fabricación e instalación coordinadas por un mismo equipo. El proceso se mostrará en tres pasos: contanos la idea, medimos y cotizamos, fabricamos e instalamos.

### 5. Galería de trabajos

Composición fotográfica asimétrica con seis trabajos de demostración, rotulados por tipo y zona. No se atribuirán trabajos ajenos a la empresa: las imágenes temporales se presentarán como ilustrativas hasta reemplazarlas por fotografías propias.

### 6. Opiniones

Tres reseñas ficticias marcadas en el código y en `PENDIENTES.md` como contenido de muestra. La presentación privilegiará el texto, nombre y zona, sin logotipos ni puntuaciones de plataformas que puedan sugerir una verificación inexistente.

### 7. Preguntas frecuentes

Acordeón accesible con respuestas sobre zonas de trabajo, presupuesto, medición, tiempos, tipos de vidrio y reparaciones. Los tiempos y alcances comerciales se marcarán como información a confirmar.

### 8. Contacto y cierre

Cierre de alto contraste con WhatsApp, teléfono, correo, dirección, horarios y un formulario corto. El formulario no tendrá backend: validará los campos en el navegador y abrirá WhatsApp con un mensaje prearmado que incluya nombre, zona, servicio y detalle. No se prometerá el envío de información por correo.

El pie incluirá navegación, datos de contacto y aviso de que los datos comerciales son temporales en esta versión de desarrollo.

## Estrategia de conversión

- Una acción principal consistente: pedir presupuesto por WhatsApp.
- Teléfono visible y clickeable en todos los tamaños.
- Ubicación geográfica explícita en la primera pantalla.
- Prueba visual antes de pedir una consulta.
- Proceso simple para reducir incertidumbre.
- Reseñas cerca del cierre para reforzar confianza.
- Preguntas frecuentes antes del último llamado a la acción.
- Mensajes prearmados por servicio para reducir esfuerzo.

No se usarán contadores regresivos, escasez falsa, reseñas presentadas como verificadas ni promesas comerciales no confirmadas.

## Accesibilidad y robustez

- HTML semántico con un único `h1`, jerarquía correcta y enlace para saltar al contenido.
- Navegación y acordeones utilizables con teclado.
- Indicadores de foco visibles y objetivos táctiles de al menos 44 px.
- Contraste suficiente sobre video e imágenes.
- Texto alternativo en todas las imágenes.
- Soporte para `prefers-reduced-motion`.
- Carga diferida de imágenes fuera del primer viewport.
- Fallback del video mediante póster y contenido independiente del medio.
- Enlaces externos seguros y datos de contacto con protocolos `tel:`, `mailto:` y `https:`.

## Responsive

La página se diseñará primero para móvil. El hero junto con su encabezado cabrá en el viewport inicial habitual; en pantallas pequeñas se reducirá la cantidad de texto y se mantendrá la acción primaria por encima del pliegue. La galería pasará de composición editorial a secuencia vertical y la navegación se convertirá en menú desplegable.

## Verificación

La implementación se verificará con:

- análisis estructural del HTML y ausencia de enlaces internos rotos;
- comprobación de consola sin errores;
- pruebas de menú, acordeones y construcción del mensaje de WhatsApp;
- revisión visual en escritorio y móvil;
- prueba de teclado y movimiento reducido;
- auditoría manual de cada requisito del encargo;
- validación de que todos los datos falsos estén enumerados en `PENDIENTES.md`.

## Fuera de alcance de esta primera entrega

- publicación en un hosting o conexión con un dominio;
- backend de correo o almacenamiento de consultas;
- panel de administración;
- analítica, píxeles publicitarios o cookies;
- catálogo con precios o comercio electrónico;
- fotografías y video definitivos de la empresa.

Estas funciones podrán agregarse posteriormente sin modificar el objetivo principal de la landing.
