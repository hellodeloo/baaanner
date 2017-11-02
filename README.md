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
npm install
```



## Utilisation

**Renommez** le répertoire "baaanner-300x250" et adaptez les variables présentes dans le `gulpfile.babel.js`

**Développez** dans le dossier "dev" et lancer la commande `gulp serve` qui se chargera de :

- Lancer le BrowserSync
- Compilera le style.scss
- Minifiera le script.js
- Optmisera les images
- Placera le tout dans le répertoire "app"


**Créez** votre livrable zippé avec `gulp deliver`
