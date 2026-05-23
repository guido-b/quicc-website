# Contribuir al sitio web de QuICC

Este sitio web está desarrollado con Astro y se publica automáticamente mediante GitHub Pages.

La mayor parte del contenido puede modificarse directamente desde la interfaz web de GitHub, sin necesidad de instalar nada localmente.

---

# Modificar noticias (News / Blog)

Las entradas del blog se encuentran en:

[`src/content/blog/`](https://github.com/guido-b/quicc-website/tree/main/src/content/blog)

Cada entrada suele estar contenida en su propia carpeta:

```text id="5y8j6m"
src/content/blog/nombre-del-post/
```

Ejemplo:

```text id="2kjv8n"
src/content/blog/cqf2025/
```

Dentro de cada carpeta normalmente habrá:

* `index.mdx` → texto principal de la entrada
* imágenes utilizadas en la publicación

Para editar una entrada:

1. Abrir el archivo `index.mdx`
2. Hacer click en ✏️ **Edit**
3. Modificar el contenido
4. Presionar **Commit changes**

El sitio se actualizará automáticamente luego de algunos minutos.

---

# Crear una nueva entrada

1. Crear una nueva carpeta dentro de:

[`src/content/blog/`](https://github.com/guido-b/quicc-website/tree/main/src/content/blog)

2. Crear un archivo llamado:

```text id="f61d8h"
index.mdx
```

3. Utilizar la siguiente plantilla:

```mdx id="dy59j0"
---
title: "Título del post"
description: "Descripción breve"
pubDate: 2026-05-20

tags:
  - quantum information
  - conferences

heroImage: "./imagen.png"
---

Contenido de la publicación.
```

4. Subir las imágenes directamente dentro de la misma carpeta.

---

# Modificar proyectos y líneas de investigación

La información sobre proyectos y líneas de investigación se encuentra en:

[`src/data/projects.json`](https://github.com/guido-b/quicc-website/blob/main/src/data/projects.json)

Allí se pueden modificar:

* líneas de investigación
* actividades principales
* descripciones
* títulos

Es importante conservar correctamente la estructura JSON.

---

# Modificar integrantes del grupo

La información de los integrantes se encuentra en:

[`src/data/authors.json`](https://github.com/guido-b/quicc-website/blob/main/src/data/authors.json)

Allí pueden modificarse:

* nombres
* biografías
* afiliaciones
* enlaces
* correos electrónicos

Las imágenes de los integrantes se encuentran en:

[`src/assets/team/`](https://github.com/guido-b/quicc-website/tree/main/src/assets/team)

Si se agrega una nueva imagen:

1. Subirla a `src/assets/team/`
2. Registrarla en:

[`src/data/teamImages.ts`](https://github.com/guido-b/quicc-website/blob/main/src/data/teamImages.ts)

---

# Publicaciones

La página de publicaciones se sincroniza automáticamente desde ORCID.

La información generada se almacena en:

[`src/data/publications.json`](https://github.com/guido-b/quicc-website/blob/main/src/data/publications.json)

Ese archivo se actualiza automáticamente mediante GitHub Actions, por lo que normalmente no debe editarse manualmente.

---

# Publicación automática del sitio

El sitio se publica automáticamente mediante GitHub Pages luego de cada commit realizado en la rama `main`.

El estado de compilación y publicación puede verse en:

[`Actions`](https://github.com/guido-b/quicc-website/actions)

---

# Editar directamente desde GitHub

Para cambios pequeños, el flujo más simple es:

1. Abrir el archivo en GitHub
2. Hacer click en ✏️ **Edit**
3. Modificar el contenido
4. Presionar **Commit changes**

No es necesario instalar nada localmente.

---

# Desarrollo local (opcional)

Para modificaciones más avanzadas:

```bash id="h56x1b"
npm install
npm run dev
```

Para compilar la versión final:

```bash id="gq0f7m"
npm run build
```

---

# Estructura general del repositorio

```text id="yb5k3x"
src/
 ├── content/
 │    └── blog/
 │
 ├── data/
 │    ├── authors.json
 │    ├── projects.json
 │    ├── publications.json
 │    └── teamImages.ts
 │
 ├── assets/
 │    └── team/
```

---

# Contacto

Ante dudas técnicas o problemas con el sitio, contactar a los administradores del repositorio.
