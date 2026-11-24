# Luna Stories — site web

**Adresse publique :** https://luna-stories-web.onrender.com

Luna Stories est une petite application web créative en français, adaptée aux ordinateurs, tablettes et téléphones. Le site est hébergé en statique sur Render et suit automatiquement la branche `main` de ce dépôt.

## Fonctions

- Découverte de personnages, recherche, catégories et filtres
- Favoris, bibliothèque et discussions sauvegardées
- Création, modification et suppression de personnages
- Import d'images de personnages, avec compression dans le navigateur
- Notes personnelles par personnage
- Trois histoires interactives à choix et embranchements
- Profil local, thème clair/sombre
- Export et import d'une sauvegarde JSON
- Mise en cache hors ligne (service worker / PWA)
- Interface responsive et navigation clavier

## Développement local

Ouvre simplement `index.html` dans un navigateur récent. Certaines fonctions PWA/hors ligne nécessitent un site servi en HTTPS ou depuis localhost.

## Publication

Render déploie automatiquement le contenu statique depuis la branche `main`. Les fichiers publiés sont à la racine du dépôt (`index.html`, `styles.css`, `app.js`, etc.).

Les contrôles automatiques GitHub Actions vérifient la syntaxe JavaScript et la présence des principaux écrans/fichiers.

## Limites honnêtes

- Les personnages, images, notes, favoris et conversations sont enregistrés dans le navigateur utilisé. Ils ne sont pas synchronisés entre appareils.
- Les conversations utilisent des réponses de démonstration locales : aucun vrai modèle d'IA ni API conversationnelle n'est connecté.
- Il n'y a pas encore de comptes en ligne, d'annuaire public partagé, de modération communautaire ni de publication publique de personnages.
- Les images ajoutées restent dans le stockage local du navigateur et peuvent atteindre sa limite de stockage. Exporte régulièrement une sauvegarde.
- Le site est public et son code est visible. N'y saisis pas de mot de passe ni d'information personnelle sensible.
- L'hébergement d'un site statique Render est gratuit selon les conditions de leur offre, avec une limite de bande passante incluse ; consulte le tableau de bord Render pour l'usage du compte.
