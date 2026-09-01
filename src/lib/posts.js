// Carga los artículos del blog una sola vez y los deja ordenados del más
// reciente al más antiguo. Lo usan la portada, el listado y el RSS.

const modules = import.meta.glob('../pages/blog/*.md', { eager: true });

export const posts = Object.values(modules).sort(
  (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
);

export function fechaEs(date) {
  return new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function dateEn(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
