// Datos estructurados (JSON-LD) del sitio.
//
// Regla de la casa: aquí solo se afirma lo que ya está publicado en la web y se
// puede verificar desde fuera. Nada de valoraciones, reseñas, precios ni cifras
// inventadas: un marcado que promete lo que la página no enseña es, además de
// deshonesto, motivo de penalización.
//
// Nota deliberada: la dirección incluye solo localidad y país. El domicilio
// completo está en el aviso legal porque la ley lo exige, pero no se repite
// aquí en formato legible por máquinas.

const SITIO = 'https://facundocorbalan.com';
export const ID_PERSONA = `${SITIO}/#facundo`;
const ID_SITIO = `${SITIO}/#website`;

const CERTIFICACIONES = [
  { nombre: 'SuccessFactors Employee Central Payroll', url: 'https://www.credly.com/badges/5224e2bf-46e8-48c7-b627-222aea46774c' },
  { nombre: 'SAP HCM Payroll for SAP S/4HANA', url: 'https://www.credly.com/badges/16b94225-cf76-441a-8fd5-293418a3e0c2' },
  { nombre: 'SAP Activate Project Manager', url: 'https://www.credly.com/badges/7ef64642-18f3-4617-b702-03118e6f4cbc' },
];

const PERFILES = [
  'https://www.linkedin.com/in/facundocorbalan/',
  'https://www.malt.es/profile/facundocorbalan',
  'https://www.credly.com/users/facundo-corbalan',
];

const MATERIAS = [
  'SAP HCM Payroll',
  'SAP SuccessFactors Employee Central Payroll',
  'Nómina España',
  'Payroll Control Center',
  'Integración Employee Central a Employee Central Payroll',
  'Migración de SAP HCM on-premise a ECP',
];

function persona(lang) {
  return {
    '@type': 'Person',
    '@id': ID_PERSONA,
    name: 'Facundo Corbalán',
    alternateName: 'Facundo Corbalan',
    url: lang === 'es' ? `${SITIO}/` : `${SITIO}/en/`,
    email: 'mailto:facundo@facundocorbalan.com',
    jobTitle:
      lang === 'es'
        ? 'Consultor SAP HCM Payroll y SuccessFactors Employee Central Payroll'
        : 'SAP HCM Payroll and SuccessFactors Employee Central Payroll consultant',
    address: { '@type': 'PostalAddress', addressLocality: 'Madrid', addressCountry: 'ES' },
    knowsLanguage: ['es', 'en'],
    knowsAbout: MATERIAS,
    sameAs: PERFILES,
    hasCredential: CERTIFICACIONES.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.nombre,
      credentialCategory: 'certification',
      url: c.url,
      recognizedBy: { '@type': 'Organization', name: 'SAP' },
    })),
  };
}

function sitioWeb(lang) {
  return {
    '@type': 'WebSite',
    '@id': ID_SITIO,
    url: `${SITIO}/`,
    name: 'Facundo Corbalán',
    inLanguage: lang,
    publisher: { '@id': ID_PERSONA },
  };
}

function servicioProfesional(lang, servicios) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITIO}/#servicios`,
    name:
      lang === 'es'
        ? 'Consultoría de nómina SAP y Employee Central Payroll'
        : 'SAP payroll and Employee Central Payroll consulting',
    url: lang === 'es' ? `${SITIO}/servicios/` : `${SITIO}/en/services/`,
    provider: { '@id': ID_PERSONA },
    areaServed: { '@type': 'Country', name: 'España' },
    availableLanguage: ['es', 'en'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: lang === 'es' ? 'Servicios' : 'Services',
      itemListElement: servicios.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s },
      })),
    },
  };
}

// Un grafo por tipo de página. El nodo Person es siempre el mismo @id, para que
// los buscadores entiendan que todas las páginas hablan de la misma entidad.
export function grafo(tipo, lang, extra = {}) {
  if (tipo === 'home') {
    return { '@context': 'https://schema.org', '@graph': [persona(lang), sitioWeb(lang)] };
  }
  if (tipo === 'servicios') {
    return {
      '@context': 'https://schema.org',
      '@graph': [persona(lang), servicioProfesional(lang, extra.servicios ?? [])],
    };
  }
  if (tipo === 'perfil') {
    return {
      '@context': 'https://schema.org',
      '@graph': [
        persona(lang),
        {
          '@type': 'ProfilePage',
          url: lang === 'es' ? `${SITIO}/sobre-mi/` : `${SITIO}/en/about/`,
          mainEntity: { '@id': ID_PERSONA },
        },
      ],
    };
  }
  return null;
}
