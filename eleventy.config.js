// Configuration Eleventy : transforme les fichiers de contenu (src/content) en pages HTML.
// Vous n'avez normalement pas besoin de modifier ce fichier.

const MOIS = ["janv.", "févr.", "mars", "avril", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function toDate(v) {
  if (!v) return null;
  const d = v instanceof Date ? v : new Date(v);
  return isNaN(d) ? null : d;
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/images": "images" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });

  // Collections construites à partir des dossiers de contenu
  const glob = (dir) => (api) => api.getFilteredByGlob(`src/content/${dir}/*.md`);
  eleventyConfig.addCollection("promotions", (api) =>
    glob("promotions")(api).sort((a, b) => String(b.data.annee).localeCompare(String(a.data.annee))));
  eleventyConfig.addCollection("eleves", (api) =>
    glob("eleves")(api).sort((a, b) => String(a.data.nom).localeCompare(String(b.data.nom), "fr")));
  eleventyConfig.addCollection("partenaires", (api) =>
    glob("partenaires")(api).sort((a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99)));
  eleventyConfig.addCollection("actualites", (api) =>
    glob("actualites")(api).sort((a, b) => (toDate(b.data.date_publication) - toDate(a.data.date_publication))));
  eleventyConfig.addCollection("videos", (api) =>
    glob("videos")(api).sort((a, b) => (toDate(b.data.date_publication) - toDate(a.data.date_publication))));
  eleventyConfig.addCollection("cours", (api) =>
    glob("cours")(api).sort((a, b) => (a.data.ordre ?? 99) - (b.data.ordre ?? 99)));

  eleventyConfig.addGlobalData("annee_courante", new Date().getFullYear());

  // Filtres utilisés dans les gabarits
  eleventyConfig.addFilter("paras", (t) => String(t || "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
    .map((p) => `<p>${p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\n/g, "<br>")}</p>`).join(""));
  eleventyConfig.addFilter("dateFr", (v) => {
    const d = toDate(v);
    return d ? `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}` : "";
  });
  eleventyConfig.addFilter("initiales", (p, n) => `${(p || " ")[0]}${(n || " ")[0]}`.toUpperCase());
  eleventyConfig.addFilter("slug", slugify);
  eleventyConfig.addFilter("where", (arr, key, val) =>
    (arr || []).filter((x) => String(x.data[key]) === String(val)));
  eleventyConfig.addFilter("whereNot", (arr, url) => (arr || []).filter((x) => x.url !== url));
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  eleventyConfig.addFilter("skip", (arr, n) => (arr || []).slice(n));
  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));
  eleventyConfig.addFilter("sumEcts", (arr) => (arr || []).reduce((s, c) => s + (Number(c.data.ects) || 0), 0));
  // Regroupe les cours par année (M1, M2) puis par semestre, quel que soit leur nombre.
  // Un cours sans année ou sans semestre s'affiche quand même, dans « Autres cours ».
  eleventyConfig.addFilter("groupCours", (cours) => {
    const groupes = new Map();
    for (const c of cours || []) {
      const annee = String(c.data.annee || "").trim();
      const semestre = String(c.data.semestre || "").trim() || "Autres cours";
      const cle = `${annee}|${semestre}`;
      if (!groupes.has(cle)) groupes.set(cle, { annee, semestre, cours: [] });
      groupes.get(cle).cours.push(c);
    }
    const num = (s) => { const m = String(s).match(/\d+/); return m ? Number(m[0]) : 999; };
    return [...groupes.values()].sort((x, y) =>
      num(x.annee) - num(y.annee) || num(x.semestre) - num(y.semestre) || x.semestre.localeCompare(y.semestre, "fr"));
  });
  eleventyConfig.addFilter("youtubeId", (url) => {
    if (!url) return "";
    const m = String(url).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([A-Za-z0-9_-]{11})/);
    return m ? m[1] : "";
  });
  eleventyConfig.addFilter("firstPart", (s, sep) => String(s || "").split(sep)[0]);
  eleventyConfig.addFilter("findBy", (arr, key, val) =>
    (arr || []).find((x) => String(x.data[key]) === String(val)));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
