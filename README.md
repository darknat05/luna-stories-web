# Luna Stories — site web

Site web statique en français, pensé pour ordinateur, tablette et téléphone.

## Ouvrir en local
Ouvre le fichier `index.html` dans un navigateur récent.

## Fonctions présentes
- Découverte, recherche et filtres de personnages
- Catégories : fantaisie, amitié, mystère, aventure, science-fiction et quotidien
- Création, modification et favoris de personnages
- Bibliothèque locale et discussions enregistrées
- Histoires interactives avec choix
- Profil local et export des données JSON
- Interface responsive

## Publication GitHub Pages
Le workflow `.github/workflows/pages.yml` prépare le déploiement depuis la branche `main`.

Dans GitHub :
1. Ouvre **Settings → Pages**.
2. Dans **Build and deployment**, sélectionne **GitHub Actions** comme source.
3. Consulte l'onglet **Actions** pour suivre le déploiement.
4. Après réussite, le site sera accessible ici :
   https://darknat05.github.io/luna-stories-web/

## Limites de cette première version
- Personnages, favoris et conversations sont enregistrés dans le navigateur.
- Ils ne sont pas synchronisés entre appareils et aucun compte partagé n'est configuré.
- Les réponses de discussion sont des réponses locales de démonstration, pas un modèle d'IA.
- Le site ne collecte ni n'envoie les conversations vers un serveur.
