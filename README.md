Baaanner
====================

**Baaanner** est un starter-kit qui aide à l'intégration de bannière publicitaire en HTML5.

Il utilise **[Gulp 4](http://gulpjs.com/)**, **[Babel](https://babeljs.io/)**, **ES6** et **[Sass](http://sass-lang.com/)**.



## Installation

```
git clone git@github.com:hellodeloo/baanner.git
```

```
cd baaanner
yarn install
```



## Utilisation

**Renommez** le répertoire "baaanner-300x250" et adaptez les variables présentes dans le `gulpfile.babel.js`

**Développez** dans le dossier "src" et lancer la commande `yarn dev` qui se chargera de :

- Lancer le BrowserSync
- Compiler le scss
- Minifier le js
- Optmiser les images
- Placer le tout dans le répertoire "dist"


**Créez** votre livrable zippé avec `yarn build`
