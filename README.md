# Tres en Red — Landing Page

Sitio web oficial de **Tres en Red**, agencia de marketing digital.

---

## 📁 Estructura del proyecto

```
tres-en-red/
├── index.html      → Estructura y contenido
├── style.css       → Estilos, animaciones y responsive
├── script.js       → Interacciones, scroll reveal, formulario
└── README.md       → Este archivo
```

---

## 🚀 Cómo subir el sitio a GitHub Pages (paso a paso)

### Paso 1 — Crear una cuenta en GitHub

Si no tenés una, andá a [github.com](https://github.com) y registrarte gratis.

---

### Paso 2 — Crear un nuevo repositorio

1. En GitHub, hacé clic en el botón verde **"New"** (arriba a la izquierda).
2. En **Repository name** escribí exactamente: `tresenred` (o cualquier nombre, sin espacios).
3. Dejá el repositorio en **Public**.
4. **No** marques ninguna casilla extra.
5. Hacé clic en **"Create repository"**.

---

### Paso 3 — Subir los archivos

**Opción A — Sin instalar nada (desde el navegador):**

1. Dentro del repositorio recién creado, hacé clic en **"uploading an existing file"**.
2. Arrastrá los 3 archivos: `index.html`, `style.css`, `script.js`.
3. Abajo escribí un mensaje como `"Primer deploy del sitio"`.
4. Hacé clic en **"Commit changes"**.

**Opción B — Con Git (si ya lo tenés instalado):**

```bash
# 1. Clonar el repositorio vacío
git clone https://github.com/TU_USUARIO/tresenred.git
cd tresenred

# 2. Copiar los archivos adentro
# (arrastrá index.html, style.css, script.js a esa carpeta)

# 3. Subirlos
git add .
git commit -m "Primer deploy del sitio"
git push origin main
```

---

### Paso 4 — Activar GitHub Pages

1. En tu repositorio, andá a **Settings** (pestaña arriba).
2. En el menú izquierdo, hacé clic en **Pages**.
3. En **"Source"**, seleccioná **"Deploy from a branch"**.
4. En **"Branch"**, elegí `main` y la carpeta `/ (root)`.
5. Hacé clic en **Save**.

¡Listo! En 1-2 minutos el sitio estará en vivo en:

```
https://TU_USUARIO.github.io/tresenred/
```

---

## ✏️ Personalización antes de subir

Antes de publicar, actualizá estos datos en `index.html`:

| Elemento | Dónde buscarlo | Qué poner |
|----------|---------------|-----------|
| Número de WhatsApp | `+5491100000000` (3 veces) | Tu número real con código de país |
| Email | `hola@tresenred.com` (2 veces) | Tu email real |
| Instagram | `@tresenred` | Tu usuario real |
| TikTok | `@tresenred` | Tu usuario real |

---

## 🌐 Dominio personalizado (opcional)

Si querés usar `tresenred.com` en vez de `tu-usuario.github.io/tresenred`:

1. Comprá el dominio en Namecheap, NIC Argentina o similar.
2. En GitHub Pages → Settings → Pages → **Custom domain**, ingresá tu dominio.
3. En tu proveedor de dominio, creá estos registros DNS:
   - Tipo `A` → `185.199.108.153`
   - Tipo `A` → `185.199.109.153`
   - Tipo `A` → `185.199.110.153`
   - Tipo `A` → `185.199.111.153`
4. Esperá hasta 48 hs para que propague.

---

## 📬 Formulario de contacto (conectar con backend real)

El formulario ahora simula el envío. Para recibir los mensajes de verdad, podés usar:

- **Formspree** (gratis): Registrate en formspree.io → creá un form → reemplazá en `script.js` la simulación con `fetch("https://formspree.io/f/TU_ID", {...})`.
- **Netlify Forms**: Si migrás a Netlify, simplemente agregás `netlify` al `<form>` y lo detecta automático.

---

## 📄 Licencia

© 2025 Tres en Red. Todos los derechos reservados.
