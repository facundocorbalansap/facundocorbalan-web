// Páginas que no deben aparecer en los resultados de búsqueda.
//
// La lista vive aquí y no en cada página para que el layout y el sitemap no
// puedan desincronizarse: una página con noindex anunciada en el sitemap es una
// señal contradictoria para los buscadores.
//
// Importante: no se añade Disallow en robots.txt. Bloquear el rastreo impediría
// que el buscador llegue a leer el noindex, y la página podría seguir apareciendo.
export const RUTAS_SIN_INDEXAR = ['/privacidad/', '/en/privacy/'];

export function sinIndexar(ruta) {
  return RUTAS_SIN_INDEXAR.includes(ruta);
}
