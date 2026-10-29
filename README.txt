Jaming Ring — Senior Shopify Developer
https://prof-coder.github.io/

Static site for GitHub Pages. The repository name serves the site from the domain root, so asset paths are root-relative (/css, /js, /assets).

Preview locally from this folder:

    python -m http.server 4173

There is no build step and no package manifest. Styles live in css/styles.css. Mobile navigation lives in js/site.js. Motion uses Anime.js 4.5 (https://animejs.com/), stored at js/anime.umd.min.js and started from js/motion.js. It stays off when the visitor prefers reduced motion.

Project notes used for the case studies are in assets/readable.txt. Optimized screenshots are in assets/opt/. The original PNGs remain in assets/.

Pages:

    index.html
    work/fellow-products.html
    work/kassatex.html
    work/chubbies-shorts.html
    work/cariuma.html
