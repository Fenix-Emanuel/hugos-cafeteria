# HUGO'S Cafetería · versión cinematográfica

Web concepto de una cafetería argentina en Austin, TX, hecha por [Ignis Studio](https://theignisstudio.com).

- **En vivo:** https://fenix-emanuel.github.io/hugos-cafeteria/
- **Versión anterior (antes):** https://fenix-emanuel.github.io/hugos-cafeteria/v1/

## Cómo está hecha
- Escenas del scroll (GRANO → ESPRESSO → CORTADO → MERIENDA): imágenes y videos generados con Higgsfield, mejorados a 1080p y convertidos en láminas de frames (`atlas/`) que se dibujan en un `<canvas>` con GSAP + ScrollTrigger.
- Abanico de platos, arco que cambia de color y luz de ventana: solo código (GSAP), sin video.
- Scroll suave con Lenis. Tipografías Fraunces, DM Sans y Playball alojadas en `fonts/`.
- Bilingüe EN/ES (`main.js`) y versión estática para quien usa "reducir movimiento".

## Archivos
- `index.html`, `styles.css`, `main.js`: la web.
- `atlas/`: frames del scroll (desktop 1600 px, móvil 720 px) y `manifest.json`.
- `img/`: fotos de platos, imágenes clave y favicon.
- `vendor/`: GSAP 3.12.5 y Lenis 1.1.13.
- `v1/`: la web anterior, para comparar.

Número de WhatsApp de ejemplo: buscar `WHATSAPP` en `main.js`.
