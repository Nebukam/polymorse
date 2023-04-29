![preview](https://img.shields.io/badge/-alpha-3ec188.svg)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
  
![PolyMorse][logo]

## **PolyMorse**

PolyMorse is an small ecosystem that leverage openAI API to publish content in multiple languages.  

· · ·
## **Simply put, PolyMorse aims at enabling people to write content in any locale, and read in any locale.**
· · ·

## **INSTALL**

## **INFOS**

PolyMorse is **primarily oriented toward developing tools & self contained applications**. Once compiled, the app itself is constructed on the fly _inside the client_ (meaning no server-side rendering, no 'per-page' metadata etc).  
The application framework itself is plain javascript. When packaged for Electron, it isn't transformed (bundled); however for extensions & PWA, the code is bundled using [Browserify](http://browserify.org/), transpiled using [Babel](https://babeljs.io/) for broader compatibility & finally minified using [Terser](https://github.com/terser/terser) plus an additional bit of custom transforms. 


### · [@polymorse/core](https://github.com/Nebukam/polymorse/tree/main/packages/polymorse-core)
### · [@polymorse/client](https://github.com/Nebukam/polymorse/tree/main/packages/polymorse-client)  

· · ·


[logo]: https://github.com/Nebukam/polymorse/raw/main/bin/polymorse-monorepo-logo.png "polymorse-logo"