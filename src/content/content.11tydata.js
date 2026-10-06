// Associe chaque dossier de contenu à son gabarit et à son adresse sur le site.
// Vous n'avez normalement pas besoin de modifier ce fichier.

const slug = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const dossier = (data) => (data.page.inputPath.match(/content\/([^/]+)\//) || [])[1];

export default {
  eleventyComputed: {
    layout: (data) => ({
      promotions: "promo.njk",
      eleves: "eleve.njk",
      partenaires: "partenaire.njk",
      actualites: "article.njk",
    })[dossier(data)] || null,
    permalink: (data) => {
      switch (dossier(data)) {
        case "promotions": return `/promotions/${slug(data.annee)}/`;
        case "eleves": return `/etudiants/${slug(`${data.prenom} ${data.nom}`)}/`;
        case "partenaires": return `/partenaires/${slug(data.nom)}/`;
        case "actualites": return `/actualites/${slug(data.titre)}/`;
        default: return false; // vidéos et cours n'ont pas de page propre
      }
    },
  },
};
