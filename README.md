# MizuWeb

Duv's personal site with small browser games. Live at https://dungvu3104.github.io/MizuWeb/

```
index.html          homepage
style.css           homepage styles
games/
  cozy-cat-cafe/    index.html, style.css, script.js
  kitty-jar/        index.html, style.css, script.js
  camera-snap/      index.html, style.css, script.js
  crumble/          index.html
```

Plain HTML, CSS and JavaScript, no build step. The two cat games load three.js from cdnjs.

Run locally: `python -m http.server` in this folder, then open http://localhost:8000.
Publish: push to `main`; GitHub Pages serves the repo root.
