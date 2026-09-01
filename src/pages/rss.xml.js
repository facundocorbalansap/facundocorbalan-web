import rss from '@astrojs/rss';
import { posts } from '../lib/posts.js';

export function GET(context) {
  return rss({
    title: 'Facundo Corbalan · Nómina SAP HCM y ECP',
    description:
      'Artículos sobre nómina SAP: esquemas y reglas, migración a Employee Central Payroll, integración PTP y cambios legales.',
    site: context.site,
    customData: '<language>es-es</language>',
    items: posts.map((p) => ({
      title: p.frontmatter.title,
      description: p.frontmatter.description,
      pubDate: new Date(p.frontmatter.date),
      link: p.url + '/',
    })),
  });
}
