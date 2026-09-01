# facundocorbalan.com

Web personal de Facundo Corbalan, consultor SAP HCM y SuccessFactors ECP. Construida con Astro y publicada como sitio estático.

## Requisitos

Node 20 o superior.

## Comandos

```bash
npm install      # instalar dependencias (solo la primera vez)
npm run dev      # servidor local en http://localhost:4321
npm run build    # genera el sitio en dist/
npm run preview  # sirve dist/ para revisarlo antes de publicar
```

## Estructura

```
src/
  layouts/Base.astro     Plantilla general (head, SEO, hreflang, cabecera y pie)
  layouts/Post.astro     Plantilla de artículo del blog
  components/            Cabecera y pie, bilingües desde una sola plantilla
  lib/posts.js           Carga y ordena los artículos; lo usan portada, blog y RSS
  styles/global.css      Todo el diseño: colores, tipografía y componentes
  pages/
    index.astro          Inicio
    servicios.astro      Servicios
    sobre-mi.astro       Trayectoria y certificaciones
    contacto.astro       Formulario y datos de contacto
    gracias.astro        Página de confirmación tras enviar el formulario
    privacidad.astro     Política de privacidad (pendiente de revisión legal)
    rss.xml.js           Feed RSS
    blog/index.astro     Listado del blog
    blog/*.md            Un archivo por artículo
    en/                  Las mismas páginas en inglés, salvo los artículos
public/                  Imágenes, robots.txt, _redirects y _headers
```

## Publicar un artículo

Crea un archivo `.md` en `src/pages/blog/`. El nombre del archivo es la URL. Cabecera obligatoria:

```markdown
---
layout: ../../layouts/Post.astro
title: "Título del artículo"
description: "Una o dos frases que aparecen en el listado y en Google."
date: 2026-09-15
tags: ["ECP", "Payroll"]
---

El cuerpo del artículo, en Markdown.
```

Nada más. El listado del blog, la portada, el RSS y el sitemap se actualizan solos al hacer `npm run build`.

## Despliegue

El sitio es estático, así que sirve cualquier hosting gratuito. La configuración incluida (`netlify.toml`) está preparada para Netlify:

1. Sube el proyecto a un repositorio de GitHub.
2. En Netlify, "Add new site" y conecta el repositorio. Detectará el comando `npm run build` y la carpeta `dist`.
3. En "Domain management", añade `facundocorbalan.com` y Netlify te dará los registros DNS.
4. En DonDominio, en la zona DNS del dominio, apunta esos registros. Habitualmente:
   - Registro `A` de `@` a la IP que indique Netlify.
   - Registro `CNAME` de `www` al subdominio `*.netlify.app` del sitio.
5. El certificado HTTPS se emite solo en unos minutos.
6. Para `facundocorbalan.es`: añádelo en Netlify como *domain alias* (hacen falta las dos entradas, con y sin `www`) y apunta su DNS en DonDominio al subdominio `*.netlify.app` del sitio. `public/_redirects` lo redirige con un 301 al `.com` conservando la ruta.

### Redirecciones y cabeceras

Viven en `public/_redirects` y `public/_headers`, no en `netlify.toml`. Es a propósito: `netlify.toml` solo se aplica cuando Netlify construye el sitio desde el repositorio, mientras que lo que está en `public/` acaba dentro de `dist/` y se aplica también si el sitio se publica arrastrando la carpeta a Netlify Drop.

## Formulario de contacto

Está preparado para Netlify Forms (atributo `data-netlify="true"`), que no requiere configuración adicional: los envíos aparecen en el panel de Netlify y se pueden reenviar por email o conectar con Zapier hacia la base de Notion.

Si el hosting acaba siendo otro, hay que sustituir el `action` del formulario por el endpoint del servicio elegido (Formspree, por ejemplo).

## Pendiente antes de publicar

- Revisar la política de privacidad con los datos fiscales reales. Hasta que se haga, `/privacidad/` y `/en/privacy/` muestran un aviso visible de "pendiente de revisión".

Ya resuelto: la imagen `public/og.png` (1200x630) está creada y el enlace de Calendly de la página de contacto está confirmado.
