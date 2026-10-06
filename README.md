# Site de l'Asso FusAc

Site de l'association des étudiants et diplômés du Master Fusions-Acquisitions de l'Université Jean Moulin Lyon 3.

## Modifier le contenu

Tout le contenu se modifie depuis l'administration Pages CMS (https://app.pagescms.org), sans toucher au code :

| Rubrique | Ce qu'elle contient |
| --- | --- |
| Promotions | Une fiche par promotion : titre, année, statut, parrain, photo |
| Élèves | Une fiche par étudiant, reliée à sa promotion |
| Partenaires | Une fiche par partenaire ; « Ordre d'affichage » décide des 4 visibles sur l'accueil |
| Actualités | Un article par actualité ; les 3 plus récentes vont sur l'accueil |
| Projet 1 · Vidéos | Une fiche par débat ; la plus récente s'affiche en grand |
| Cours | Les cours de la page Formation |
| Page d'accueil, Page Formation, Les Directeurs, Page Association | Les textes de ces pages |
| Réglages du site | Nom, e-mails, réseaux sociaux, couleurs, bandeau « Prototype » |

Après chaque enregistrement, Netlify reconstruit le site : les changements sont en ligne en une à deux minutes.

## Modifier le design

- **Couleurs principales** : dans « Réglages du site ».
- **Autres couleurs, polices, largeurs** : en haut du fichier `src/css/style.css`, partie « RÉGLAGES DU DESIGN ».
- **Mise en page** : les gabarits sont dans `src/*.njk` (pages) et `src/_includes/` (en-tête, pied de page, fiches).

## Organisation des fichiers

```
.pages.yml              configuration de l'administration
netlify.toml            configuration de l'hébergement
src/_data/*.json        textes des pages et réglages du site
src/content/<rubrique>  une fiche par élève, promo, partenaire, actualité, vidéo, cours
src/images/             images envoyées depuis l'administration
src/css/style.css       design
src/_includes/          gabarits communs
```

## Travailler sur son ordinateur (facultatif)

Avec Node.js installé : `npm install`, puis `npm start`, et ouvrir http://localhost:8080.
