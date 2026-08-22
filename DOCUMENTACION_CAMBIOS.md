# Documentación de cambios — Contra Corriente

## 1. Objetivo

Se reescribió la base visual del proyecto para que el sitio se parezca a un
medio editorial serio y contemporáneo, con una identidad fuerte basada en:

- fondo hueso `#F2F0EA`
- texto negro `#141414`
- azul eléctrico `#2451FF`
- líneas discretas `#D8D5CC`
- tipografías `Archivo Black` + `Inter`

La intención es mantener un estilo “diario serio” con un giro visual que se
“opone” a la corriente del resto de la página, usando un color de acento
minimalista y puntual.

---

## 2. Configuración general

### Tailwind y variables

Se configuró el diseño en `tailwind.config.js` con los colores custom:

- `cc-bg`
- `cc-ink`
- `cc-current`
- `cc-line`
- `cc-muted`

También quedaron configuradas las familias tipográficas:

- `display`: `Archivo Black`
- `sans`: `Inter`

Esto permite usar clases como:

- `bg-cc-bg`
- `text-cc-current`
- `font-display`
- `font-sans`

### Google Fonts

Se importaron las fuentes en `src/app.html` con enlaces directos a Google Fonts:

- `Archivo Black`
- `Inter`

Esto hace que los títulos y el texto editorial se vean con la identidad pedida
sin depender de librerías externas.

### CSS global

En `src/routes/layout.css` se definieron los estilos base del sitio:

- `html, body` con altura completa
- fondo general `var(--cc-bg)`
- texto general `var(--cc-ink)`
- tipografía global Inter
- clase `.font-display` para usar la tipografía grotesca de titulares

---

## 3. Navbar y shell de la app

### `src/lib/components/Navbar.svelte`

Se creó un navbar editorial con esta lógica de diseño:

- sólo una fila horizontal
- links a `/blog`, `/about` y `/suscribite`
- divisores finos entre cada link
- botón “Suscribite” en fondo oscuro con hover azul eléctrico
- megáfono emoji como marca mínima de la cabecera
- hover azul eléctrico en texto y marca

La estructura básica es:

- logo/brand a la izquierda
- navegación a la derecha
- sin redondeos ni sombras
- estilo limpio, de diario

### `src/routes/+layout.svelte`

Se reemplazó el layout raíz por un contenedor simple que incluye:

- fondo `bg-cc-bg`
- texto negro para el sitio completo
- `min-h-screen`
- `Navbar` arriba del contenido

Esto permite que todas las páginas compartan la misma identidad y no se rompa el
shell visual del proyecto.

---

## 4. Home / archive de notas

### `src/routes/blog/+page.svelte`

La home de notas fue reescrita para verse tipo editorial con una base más
cercana a The Pudding:

- sin título gigante en la vista de archive
- cards con imágenes grandes
- hover que hace pasar la imagen a color
- categoría con estilo utilitario (uppercase + tracking)
- título editorial grande con mucha presencia visual
- bajada larga con bastante aire y lectura cómoda
- uso de `max-w` y espacios generosos para lograr sensación de revista

También se dejó una sección destacada con fondo azul eléctrico y texto blanco
para emular el bloque de acento editorial.

---

## 5. Página “Sobre Nosotras”

### `src/routes/about/+page.svelte`

Se reescribió la página about para que se vea más como una editorial de larga
duración:

- cabecera con pequeños labels de sección
- título grande en display font
- foto de portada en blanco y negro
- bloque de cita con fondo rosa/azulado para romper la página
- texto largo con sensación de columna editorial

La idea es que la página se sienta como una historia de fondo del medio, no como
un simple landing informativo.

### `src/routes/about/+layout.svelte`

Se eliminó el layout de prueba anterior con paneles y bordes de ejemplo, dejando
la página limpia y unificada con el resto del sitio.

---

## 6. Nota individual con scrollytelling

### `src/lib/components/Scrolly.svelte`

Se creó un componente reusable para lograr la sección sticky de la nota
individual, inspirada en el patrón de scrollytelling de The Pudding.

#### Qué hace:

- inicializa `scrollama` dentro de `onMount`
- detecta cada `.step`
- dispara cambios al entrar cada bloque con `onStepEnter`
- actualiza el paso activo con una variable reactiva `currentIndex`
- muestra una imagen sticky o bloque visual a la izquierda
- cambia el contenido según el paso actual
- deja el layout responsive: en desktop sticky, en mobile se vuelve estático

#### Estilo final

Se dejó el panel con un esquema en azul eléctrico puro y texto blanco, y las
imágenes en color para que el contraste sea fuerte y editorial.

### `src/routes/blog/[id]/+page.svelte`

Se reemplazó el placeholder por un artículo editorial completo con:

- header de nota
- categoría, autor, fecha y tiempo de lectura
- imagen de portada full width
- introducción editorial
- sección scrollytelling con pasos de prueba
- cierre del artículo con texto largo

---

## 7. Cómo conectar esto a Google Docs como backend

La forma más simple de conectar el sitio a Google Docs es usar Google Apps
Script + una API pública o un endpoint de Google Sheets/Docs exportado como
JSON.

### Opción recomendada: Google Apps Script + JSON

1. Crear un Google Script:
   - abrir `script.google.com`
   - crear un proyecto nuevo
   - pegar un script que lea un documento o hoja de cálculo

2. Exponer un endpoint:
   - usar `doGet()` en Apps Script para devolver JSON
   - ejemplo conceptual:

```js
function doGet() {
   const data = {
      title: "Cuando la historia se escribe a pie",
      category: "Política",
      author: "Marina López",
      date: "2026-07-18",
      dek: "Texto de apertura...",
   };

   return ContentService
      .createTextOutput(JSON.stringify({ items: [data] }))
      .setMimeType(ContentService.MimeType.JSON);
}
```

3. Publicar el script como web app:
   - `Publicar > Implementar como aplicación web`
   - elegir acceso `Cualquiera`
   - guardar la URL

4. En Svelte, consumir la data:

```ts
const res = await fetch("https://script.google.com/macros/s/.../exec");
const json = await res.json();
```

5. Mapear los campos a la estructura del artículo:

```ts
const article = {
   title: json.items[0].title,
   category: json.items[0].category,
   dek: json.items[0].dek,
   author: json.items[0].author,
   date: json.items[0].date,
   cover: json.items[0].cover,
};
```

### Opción alternativa: Google Sheets

Si se quiere más simple para pruebas, usar Google Sheets como base de contenido:

- una hoja `articles`
- columnas: `id`, `title`, `category`, `author`, `date`, `readTime`, `dek`,
  `cover`, `body`
- exportar a CSV/JSON con Apps Script o con el endpoint de Sheets API

Esto es útil para editar contenido sin tocar código.

### Recomendación de arquitectura

Para un proyecto serio, conviene separar:

- `content` → Google Docs / Sheets / Apps Script
- `frontend` → SvelteKit
- `render` → páginas generadas con fetch a la API

Así no hay que tocar Svelte cada vez que cambia un texto.

---

## 8. Estado actual del proyecto

El proyecto quedó con:

- navbar de marca editorial
- home/listado de notas con estilo magazine
- about con narrativa editorial
- nota individual con scrollytelling sticky
- palette azul eléctrico + blanco + hueso
- imágenes en color
- componente `Scrolly` reutilizable

---

## 9. Próximo paso recomendado

El siguiente paso útil es:

1. mover el contenido de la home y las notas a una API de Google Docs o Sheets,
2. crear una función `getArticleById()` para sacar la nota por slug o ID,
3. dejar `src/routes/blog/[id]/+page.svelte` completamente data-driven,
4. mantener `Scrolly.svelte` reutilizable para cualquier story con 3-5 pasos.

Con eso, el proyecto pasa de ser un mockup visual a una base real para publicar
contenido editorial sin tocar el código cada vez.
