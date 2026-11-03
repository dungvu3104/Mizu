const LEVELS = [{"marbles":[{"x":53.4,"y":80.2,"c":"r"},{"x":64.8,"y":83,"c":"b"},{"x":43.6,"y":109.6,"c":"b"},{"x":34.8,"y":101.6,"c":"b"},{"x":55.8,"y":101.2,"c":"r"},{"x":52.7,"y":69.4,"c":"r"}],"queue":["r","b"],"cw":28,"ch":28},{"marbles":[{"x":59.1,"y":42.4,"c":"r"},{"x":69.3,"y":26.8,"c":"g"},{"x":66.3,"y":36.6,"c":"b"},{"x":42.2,"y":14.7,"c":"b"},{"x":42.9,"y":38.2,"c":"g"},{"x":75.6,"y":39.4,"c":"r"},{"x":55.7,"y":50.9,"c":"g"},{"x":31.1,"y":30.7,"c":"b"},{"x":49.3,"y":30.8,"c":"g"},{"x":46.9,"y":46.9,"c":"r"},{"x":60.4,"y":21.8,"c":"g"},{"x":77.1,"y":19.9,"c":"g"}],"queue":["g","r","b","g"],"cw":28,"ch":28},{"marbles":[{"x":70.5,"y":12.5,"c":"r"},{"x":30.9,"y":28.1,"c":"g"},{"x":42.6,"y":38.2,"c":"b"},{"x":65.7,"y":115,"c":"g"},{"x":72.7,"y":108.7,"c":"b"},{"x":64.8,"y":98.9,"c":"b"},{"x":81.4,"y":36.2,"c":"r"},{"x":68.5,"y":89.3,"c":"b"},{"x":63.8,"y":38.4,"c":"g"},{"x":34.3,"y":16.8,"c":"y"},{"x":51.9,"y":17.7,"c":"r"},{"x":74.3,"y":30.6,"c":"y"},{"x":61.6,"y":27.6,"c":"b"},{"x":56.4,"y":111.6,"c":"b"},{"x":49.7,"y":28.4,"c":"y"}],"queue":["g","y","r","b","b"],"cw":30,"ch":30},{"marbles":[{"x":84.5,"y":70.5,"c":"y"},{"x":28.9,"y":35.9,"c":"b"},{"x":63.8,"y":77,"c":"b"},{"x":26.9,"y":20.1,"c":"r"},{"x":50.8,"y":70.5,"c":"b"},{"x":62.9,"y":62.7,"c":"b"},{"x":68.5,"y":54.9,"c":"b"},{"x":9.6,"y":35.7,"c":"r"},{"x":12.5,"y":26.5,"c":"r"},{"x":59.6,"y":53.9,"c":"b"},{"x":20.7,"y":40.8,"c":"r"},{"x":52.2,"y":59.1,"c":"r"},{"x":72.2,"y":72.8,"c":"y"},{"x":54.4,"y":81.5,"c":"g"},{"x":74.7,"y":62.8,"c":"r"},{"x":79.6,"y":82.5,"c":"g"},{"x":89.6,"y":62.9,"c":"y"},{"x":15,"y":16,"c":"g"}],"queue":["y","r","r","g","b","b"],"cw":30,"ch":30},{"marbles":[{"x":12.3,"y":29.5,"c":"y"},{"x":43.6,"y":62.6,"c":"r"},{"x":61.8,"y":53.7,"c":"b"},{"x":59.2,"y":27.4,"c":"r"},{"x":62.3,"y":63.9,"c":"y"},{"x":52.5,"y":66.8,"c":"p"},{"x":12.1,"y":10.1,"c":"y"},{"x":54.4,"y":46.5,"c":"y"},{"x":24,"y":13.6,"c":"r"},{"x":68,"y":31.5,"c":"r"},{"x":28.8,"y":26.2,"c":"p"},{"x":88,"y":30.9,"c":"g"},{"x":74.5,"y":42.7,"c":"p"},{"x":71.6,"y":57.2,"c":"y"},{"x":53.6,"y":57.6,"c":"b"},{"x":80.6,"y":24.8,"c":"r"},{"x":33.7,"y":17.2,"c":"g"},{"x":83.5,"y":41.2,"c":"r"},{"x":76,"y":17,"c":"y"},{"x":41.7,"y":50.9,"c":"b"},{"x":66.4,"y":18.1,"c":"g"}],"queue":["p","y","g","y","r","b","r"],"cw":34,"ch":28},{"marbles":[{"x":76.8,"y":113.4,"c":"g"},{"x":78.1,"y":83.7,"c":"r"},{"x":68.2,"y":23.9,"c":"b"},{"x":65.5,"y":64.3,"c":"b"},{"x":49.4,"y":74.3,"c":"b"},{"x":90.4,"y":86.4,"c":"g"},{"x":56.3,"y":101.7,"c":"g"},{"x":90.5,"y":101.6,"c":"y"},{"x":55.8,"y":30,"c":"b"},{"x":62,"y":16.1,"c":"g"},{"x":69.6,"y":37.7,"c":"g"},{"x":68.5,"y":93.6,"c":"b"},{"x":51.3,"y":38.7,"c":"r"},{"x":45.6,"y":19.8,"c":"b"},{"x":60.8,"y":85.2,"c":"y"},{"x":74.3,"y":103.7,"c":"p"},{"x":46.7,"y":82.9,"c":"y"},{"x":45.9,"y":29.2,"c":"p"},{"x":65.7,"y":109.6,"c":"r"},{"x":89.5,"y":110.7,"c":"r"},{"x":60.5,"y":43.5,"c":"g"},{"x":55.7,"y":111.7,"c":"r"},{"x":82.4,"y":93.6,"c":"r"},{"x":52.9,"y":62.2,"c":"p"}],"queue":["r","g","r","g","y","p","b","b"],"cw":34,"ch":34},{"marbles":[{"x":44.4,"y":88.7,"c":"p"},{"x":52.8,"y":68.5,"c":"o"},{"x":67.1,"y":109,"c":"g"},{"x":48,"y":79.5,"c":"b"},{"x":64.3,"y":88.8,"c":"r"},{"x":86.5,"y":50.8,"c":"b"},{"x":55.9,"y":21.3,"c":"g"},{"x":40.6,"y":19.6,"c":"b"},{"x":53.8,"y":102.2,"c":"o"},{"x":62.8,"y":38.5,"c":"b"},{"x":63.1,"y":76.7,"c":"o"},{"x":53.3,"y":91.2,"c":"p"},{"x":61.8,"y":67.2,"c":"g"},{"x":74.6,"y":38,"c":"p"},{"x":49.7,"y":35.7,"c":"r"},{"x":64.5,"y":98.7,"c":"y"},{"x":94.6,"y":42.1,"c":"b"},{"x":83.7,"y":99.1,"c":"r"},{"x":75,"y":87.5,"c":"r"},{"x":59.8,"y":29.7,"c":"p"},{"x":36.5,"y":38.8,"c":"r"},{"x":82,"y":29.7,"c":"p"},{"x":84.6,"y":39.7,"c":"r"},{"x":71.8,"y":53.6,"c":"p"},{"x":44.1,"y":43.8,"c":"b"},{"x":55.1,"y":43.3,"c":"y"},{"x":36.2,"y":28.4,"c":"y"}],"queue":["b","p","y","p","r","o","g","r","b"],"cw":36,"ch":36},{"marbles":[{"x":68.8,"y":40.9,"c":"r"},{"x":76.2,"y":34.4,"c":"y"},{"x":64.5,"y":62.2,"c":"o"},{"x":78,"y":83.7,"c":"r"},{"x":72.3,"y":50.5,"c":"p"},{"x":88,"y":34.4,"c":"r"},{"x":71.7,"y":92.5,"c":"y"},{"x":77.6,"y":14.4,"c":"r"},{"x":63,"y":14.1,"c":"r"},{"x":87.6,"y":91.5,"c":"g"},{"x":86.5,"y":73.1,"c":"g"},{"x":55.5,"y":24.1,"c":"b"},{"x":93.5,"y":23.6,"c":"p"},{"x":67.6,"y":23.2,"c":"b"},{"x":91.4,"y":50.6,"c":"b"},{"x":82.6,"y":53.3,"c":"p"},{"x":77.8,"y":24.7,"c":"b"},{"x":84.3,"y":8,"c":"g"},{"x":70.7,"y":5.9,"c":"y"},{"x":86.3,"y":61.7,"c":"y"},{"x":64,"y":72.1,"c":"y"},{"x":76.9,"y":66.3,"c":"y"},{"x":56.3,"y":8.1,"c":"g"},{"x":60.7,"y":45.2,"c":"g"},{"x":82.5,"y":41.9,"c":"g"},{"x":60.6,"y":89.9,"c":"r"},{"x":89,"y":82,"c":"o"},{"x":57.1,"y":80.1,"c":"b"},{"x":94.6,"y":41.1,"c":"b"},{"x":62.7,"y":32.4,"c":"o"}],"queue":["r","y","r","y","p","o","g","b","b","g"],"cw":38,"ch":38},{"marbles":[{"x":20.3,"y":65.2,"c":"g"},{"x":51.5,"y":90.2,"c":"y"},{"x":66.9,"y":86.8,"c":"g"},{"x":18,"y":35.7,"c":"g"},{"x":27.8,"y":89.6,"c":"o"},{"x":72.9,"y":75,"c":"b"},{"x":58.9,"y":31.6,"c":"p"},{"x":33.6,"y":98.6,"c":"r"},{"x":43.5,"y":34.7,"c":"o"},{"x":33.4,"y":81.3,"c":"r"},{"x":36.9,"y":65.3,"c":"y"},{"x":50.1,"y":99.2,"c":"r"},{"x":21.1,"y":75.3,"c":"r"},{"x":60.5,"y":80.2,"c":"p"},{"x":6,"y":28.5,"c":"p"},{"x":28.7,"y":24.8,"c":"g"},{"x":53.5,"y":17.1,"c":"g"},{"x":29.4,"y":33.8,"c":"o"},{"x":78.1,"y":84.8,"c":"p"},{"x":34.4,"y":16.6,"c":"o"},{"x":43.7,"y":77.7,"c":"b"},{"x":43.4,"y":13.8,"c":"b"},{"x":46.3,"y":23.5,"c":"r"},{"x":12.4,"y":20.3,"c":"o"},{"x":64.9,"y":69.2,"c":"b"},{"x":61.4,"y":94.6,"c":"o"},{"x":11.3,"y":11.1,"c":"p"},{"x":52.4,"y":69.9,"c":"b"},{"x":40.9,"y":90.7,"c":"y"},{"x":30,"y":71.5,"c":"y"},{"x":12.2,"y":78.5,"c":"r"},{"x":19,"y":85.6,"c":"p"},{"x":39.5,"y":106.7,"c":"g"},{"x":20.5,"y":9.8,"c":"y"},{"x":49.9,"y":41.3,"c":"y"},{"x":37.8,"y":26.9,"c":"b"}],"queue":["b","p","r","o","o","r","p","b","g","y","y","g"],"cw":40,"ch":40},{"marbles":[{"x":81.9,"y":98.4,"c":"b"},{"x":63.2,"y":93.1,"c":"y"},{"x":43.3,"y":80,"c":"b"},{"x":83.3,"y":48.3,"c":"o"},{"x":57.1,"y":20.7,"c":"y"},{"x":50.3,"y":31.9,"c":"r"},{"x":77.4,"y":84.6,"c":"y"},{"x":49.2,"y":43.5,"c":"b"},{"x":10.1,"y":74.8,"c":"o"},{"x":40.2,"y":18.2,"c":"b"},{"x":71.9,"y":104,"c":"g"},{"x":62.8,"y":103,"c":"g"},{"x":26.9,"y":17.1,"c":"r"},{"x":14.8,"y":14,"c":"o"},{"x":65.3,"y":43.4,"c":"o"},{"x":69.3,"y":64.7,"c":"y"},{"x":67.5,"y":81.2,"c":"p"},{"x":86.6,"y":77.1,"c":"r"},{"x":37,"y":50.6,"c":"y"},{"x":25.7,"y":68.3,"c":"y"},{"x":80.3,"y":112.2,"c":"p"},{"x":50.5,"y":74.5,"c":"o"},{"x":55.3,"y":87.7,"c":"b"},{"x":19.3,"y":26.3,"c":"b"},{"x":45.2,"y":59.6,"c":"p"},{"x":40,"y":30.7,"c":"y"},{"x":84,"y":60.1,"c":"b"},{"x":11.3,"y":57.1,"c":"b"},{"x":28.8,"y":36.1,"c":"r"},{"x":48.7,"y":95.7,"c":"r"},{"x":71.4,"y":33,"c":"y"},{"x":74.6,"y":74.8,"c":"r"},{"x":94.8,"y":57.9,"c":"g"},{"x":73.6,"y":92.8,"c":"g"},{"x":22.6,"y":58.9,"c":"g"},{"x":19.2,"y":47,"c":"o"},{"x":72.7,"y":54.7,"c":"g"},{"x":39.4,"y":91.4,"c":"r"},{"x":91.7,"y":67.6,"c":"p"},{"x":69,"y":112.8,"c":"p"},{"x":32.7,"y":25.1,"c":"p"},{"x":54.5,"y":58.9,"c":"b"},{"x":33.3,"y":9.3,"c":"g"},{"x":60.6,"y":34.3,"c":"o"},{"x":49.5,"y":104.7,"c":"b"},{"x":56.9,"y":48.8,"c":"g"},{"x":22.6,"y":8.2,"c":"r"},{"x":7.3,"y":65.7,"c":"p"},{"x":31.9,"y":58.1,"c":"o"},{"x":39.3,"y":102.4,"c":"r"},{"x":39.8,"y":41.9,"c":"g"},{"x":86.4,"y":90.1,"c":"p"},{"x":28.3,"y":47.4,"c":"b"},{"x":20.8,"y":76.1,"c":"r"},{"x":66.6,"y":23.6,"c":"b"},{"x":34.8,"y":83.2,"c":"r"},{"x":10.5,"y":22.2,"c":"p"},{"x":47.9,"y":23,"c":"r"},{"x":58.4,"y":79.1,"c":"o"},{"x":9.3,"y":48.3,"c":"y"}],"queue":["o","p","y","p","b","b","y","p","r","r","o","b","g","r","b","y","o","r","g","g"],"cw":30,"ch":30}];
const TIPS = [
  'Press and drag to aim, lift your finger to SNAP. Drag onto the X to cancel.',
  'Marbles that fit an open basket go there. The rest wait in the tray.',
  'Big snaps are fast but risky. Check the preview before you shoot!',
  'Tray full = lose. Watch the next baskets.',
  '', '', '', '',
  'SUPER HARD: the obvious big snap always loses. Plan every shot.',
  'SUPER LARGE: 60 marbles. Greedy snaps will flood the tray.'
];
const ACTIVE = 3, CAP = 3, TRAY = 5, BW = 100, BH = 120;
// camera frame size relative to each level's cw/ch
const CAM_SCALE = 0.75;
const COL = {r:'#e5484d', b:'#3b82f6', g:'#3fb950', y:'#f5c518', p:'#a855f7', o:'#f97316'};
const NS = 'http://www.w3.org/2000/svg';
const $ = id => document.getElementById(id);
const board = $('board');

let li = 0, L, S, cam, busy = false;
try { li = Math.min(+localStorage.getItem('cam_lvl') || 0, LEVELS.length - 1); } catch (e) {}

function el(tag, attrs, parent) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent && parent.appendChild(e); return e; }
function grad(c) { return `radial-gradient(circle at 35% 30%, #fff 0 12%, ${COL[c]} 40%, color-mix(in srgb, ${COL[c]} 70%, #000) 100%)`; }

var load = function(i) {
  li = i; L = { ...LEVELS[i], cw: LEVELS[i].cw * CAM_SCALE, ch: LEVELS[i].ch * CAM_SCALE };
  try { localStorage.setItem('cam_lvl', i); } catch (e) {}
  S = { left: L.marbles.map(() => true), baskets: [], q: 0, tray: [], over: false };
  while (S.baskets.length < ACTIVE) S.baskets.push(S.q < L.queue.length ? { c: L.queue[S.q++], n: 0, shown: 0 } : null);
  cam = { x: (BW - L.cw) / 2, y: (BH - L.ch) / 2 };
  $('lvl').textContent = `Lv ${i + 1}/${LEVELS.length}`;
  $('tip').textContent = TIPS[i] || '';
  $('over').classList.remove('show');
  busy = false;
  buildBoard(); renderBaskets(); renderTray(); updateCam();
}

function buildBoard() {
  board.innerHTML = '';
  const defs = el('defs', {}, board);
  for (const c in COL) {
    const g = el('radialGradient', { id: 'g' + c, cx: '35%', cy: '30%', r: '75%' }, defs);
    el('stop', { offset: '0%', 'stop-color': '#fff' }, g);
    el('stop', { offset: '25%', 'stop-color': COL[c] }, g);
    el('stop', { offset: '100%', 'stop-color': `color-mix(in srgb, ${COL[c]} 65%, #000)` }, g);
  }
  el('rect', { x: -2, y: -2, width: 104, height: 124, rx: 6, fill: '#dfeccd', stroke: '#4a2e1a', 'stroke-width': 0.9 }, board);
  for (let k = 0; k < 14; k++) el('path', { d: `M${(k * 37) % 100} ${(k * 53) % 118 + 2} q1.5 -3 3 0 q1.5 -3 3 0`, fill: 'none', stroke: '#9cc27a', 'stroke-width': 0.7 }, board);
  const mg = el('g', { id: 'marbles' }, board);
  L.marbles.forEach((m, i) => {
    const g = el('g', { id: 'm' + i }, mg);
    el('circle', { class: 'ring', cx: m.x, cy: m.y, r: 4.8, fill: 'none', stroke: '#fff', 'stroke-width': 1.2, opacity: 0 }, g);
    el('circle', { cx: m.x, cy: m.y, r: 3.5, fill: `url(#g${m.c})`, stroke: '#4a2e1a', 'stroke-width': 0.5 }, g);
  });
  const cg = el('g', { id: 'cam' }, board);
  el('rect', { id: 'camShade', x: 0, y: 0, width: L.cw, height: L.ch, fill: '#fff', 'fill-opacity': 0.14, stroke: '#fff', 'stroke-width': 0.5, 'stroke-dasharray': '2 1.5' }, cg);
  const b = 6, sw = 1.6;
  const corners = `M0 ${b} V0 H${b} M${L.cw - b} 0 H${L.cw} V${b} M${L.cw} ${L.ch - b} V${L.ch} H${L.cw - b} M${b} ${L.ch} H0 V${L.ch - b}`;
  el('path', { d: corners, fill: 'none', stroke: '#4a2e1a', 'stroke-width': sw + 1.2, 'stroke-linecap': 'round' }, cg);
  el('path', { d: corners, fill: 'none', stroke: '#fff', 'stroke-width': sw, 'stroke-linecap': 'round' }, cg);
  el('circle', { cx: L.cw / 2, cy: L.ch / 2, r: 1.2, fill: 'none', stroke: '#fff', 'stroke-width': 0.6 }, cg);
  el('rect', { id: 'flashR', x: 0, y: 0, width: L.cw, height: L.ch, fill: '#fff', opacity: 0, 'pointer-events': 'none' }, cg);
}

function inside(m) { return m.x >= cam.x && m.x <= cam.x + L.cw && m.y >= cam.y && m.y <= cam.y + L.ch; }
function captured() { return L.marbles.map((m, i) => i).filter(i => S.left[i] && inside(L.marbles[i])); }

function updateCam() {
  $('cam').setAttribute('transform', `translate(${cam.x} ${cam.y})`);
  const ids = captured();
  L.marbles.forEach((m, i) => { const r = $('m' + i).querySelector('.ring'); if (r) r.setAttribute('opacity', ids.includes(i) ? 1 : 0); });
  // preview: simulate where the shot would go
  const sim = { baskets: S.baskets.map(b => b && { c: b.c, n: b.n }), q: S.q, tray: S.tray.map(t => t.c) };
  const res = route(sim, ids.map(i => L.marbles[i].c));
  const p = $('preview');
  if (!ids.length) p.innerHTML = 'Aim at some marbles';
  else p.innerHTML = `${ids.length} in shot<br>${res.toBasket} &rarr; baskets<br><span class="${res.toTray ? 'bad' : ''}">${res.toTray} &rarr; tray${res.lost ? ' (FULL!)' : ''}</span>`;
}

// pure routing used for the preview (mirrors the animated version below)
function route(s, pend) {
  let toBasket = 0, toTray = 0, lost = false;
  const complete = bi => {
    s.baskets[bi] = s.q < L.queue.length ? { c: L.queue[s.q++], n: 0 } : null;
    const nb = s.baskets[bi]; if (!nb) return;
    for (let k = 0; k < s.tray.length && nb.n < CAP;) { if (s.tray[k] === nb.c) { s.tray.splice(k, 1); nb.n++; } else k++; }
    if (nb.n === CAP) complete(bi);
  };
  pend = pend.slice();
  for (;;) {
    let moved = false;
    for (let k = 0; k < pend.length; k++) {
      const bi = s.baskets.findIndex(b => b && b.c === pend[k] && b.n < CAP);
      if (bi >= 0) { s.baskets[bi].n++; pend.splice(k, 1); toBasket++; if (s.baskets[bi].n === CAP) complete(bi); moved = true; break; }
    }
    if (!moved) break;
  }
  for (const c of pend) { if (s.tray.length >= TRAY) { lost = true; break; } s.tray.push(c); toTray++; }
  return { toBasket, toTray, lost };
}

function renderBaskets() {
  const box = $('baskets'); box.innerHTML = '';
  S.baskets.forEach((b, bi) => {
    const d = document.createElement('div'); d.className = 'basket' + (b ? '' : ' empty'); d.id = 'b' + bi;
    if (b) {
      const band = document.createElement('div'); band.className = 'band'; band.style.background = COL[b.c]; d.appendChild(band);
      for (let k = 0; k < CAP; k++) {
        const h = document.createElement('div'); h.className = 'hole'; h.id = `b${bi}h${k}`;
        if (k < b.shown) { const m = document.createElement('div'); m.className = 'm'; m.style.background = grad(b.c); h.appendChild(m); }
        d.appendChild(h);
      }
    }
    box.appendChild(d);
  });
  const q = $('queue'); q.innerHTML = '';
  const next = L.queue.slice(S.q);
  if (next.length) q.append('Next:');
  next.slice(0, 4).forEach(c => { const d = document.createElement('span'); d.className = 'qd'; d.style.background = COL[c]; q.appendChild(d); });
  if (next.length > 4) q.append(`+${next.length - 4}`);
}
function renderTray() {
  const t = $('tray'); t.innerHTML = '';
  for (let k = 0; k < TRAY; k++) {
    const s = document.createElement('div'); s.className = 'slot' + (S.tray.length >= TRAY - 1 && k >= S.tray.length ? ' danger' : ''); s.id = 't' + k;
    const it = S.tray[k];
    if (it && it.shown) { const m = document.createElement('div'); m.className = 'm'; m.style.background = grad(it.c); s.appendChild(m); }
    t.appendChild(s);
  }
}

const wait = ms => new Promise(r => setTimeout(r, ms));
function center(e) { const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
function fly(from, toEl, c, dur = 320) {
  const to = center(toEl);
  const m = document.createElement('div'); m.className = 'm'; m.style.background = grad(c);
  $('fly').appendChild(m);
  const mid = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 50 };
  return m.animate([
    { transform: `translate(${from.x - 11}px,${from.y - 11}px) scale(.8)` },
    { transform: `translate(${mid.x - 11}px,${mid.y - 11}px) scale(1.25)` },
    { transform: `translate(${to.x - 11}px,${to.y - 11}px) scale(1)` }
  ], { duration: dur, easing: 'cubic-bezier(.4,0,.3,1)' }).finished.then(() => m.remove());
}

async function complete(bi) {
  $('b' + bi).classList.add('done');
  await wait(420);
  S.baskets[bi] = S.q < L.queue.length ? { c: L.queue[S.q++], n: 0, shown: 0 } : null;
  renderBaskets();
  if (S.baskets[bi]) $('b' + bi).classList.add('new');
  await wait(230);
  const nb = S.baskets[bi]; if (!nb) return;
  for (let k = 0; k < S.tray.length && nb.n < CAP;) {
    if (S.tray[k].c === nb.c) {
      const from = center($('t' + k));
      S.tray.splice(k, 1); renderTray();
      const h = nb.n++;
      await fly(from, $(`b${bi}h${h}`), nb.c, 240);
      nb.shown++; renderBaskets();
    } else k++;
  }
  if (nb.shown === CAP) await complete(bi);
}

async function snap() {
  if (busy || S.over) return;
  const ids = captured();
  if (!ids.length) { buzz(20); return; }
  busy = true; buzz(25);
  const f = $('flashR'); f.classList.remove('flash'); void f.getBBox(); f.setAttribute('opacity', 1); f.classList.add('flash');
  setTimeout(() => f.setAttribute('opacity', 0), 340);
  const pend = ids.map(i => { S.left[i] = false; const g = $('m' + i), from = center(g); g.style.display = 'none'; return { c: L.marbles[i].c, from }; });
  updateCam();
  await wait(120);
  for (;;) {
    if (S.over) break;
    let k = -1, bi = -1;
    for (let j = 0; j < pend.length; j++) { bi = S.baskets.findIndex(b => b && b.c === pend[j].c && b.n < CAP); if (bi >= 0) { k = j; break; } }
    if (k < 0) break;
    const it = pend.splice(k, 1)[0], b = S.baskets[bi], h = b.n++;
    await fly(it.from, $(`b${bi}h${h}`), it.c);
    b.shown++; renderBaskets();
    if (b.shown === CAP) await complete(bi);
  }
  for (const it of pend) {
    if (S.tray.length >= TRAY) { lose(); break; }
    const t = { c: it.c, shown: false }; S.tray.push(t);
    await fly(it.from, $('t' + (S.tray.length - 1)), it.c);
    t.shown = true; renderTray();
  }
  if (!S.over && S.tray.length >= TRAY - 1) { $('tray').classList.remove('warn'); void $('tray').offsetWidth; $('tray').classList.add('warn'); }
  busy = false; updateCam(); checkWin();
}

function checkWin() {
  if (S.over) return;
  if (S.left.every(x => !x) && S.baskets.every(b => !b)) {
    S.over = true;
    show('All sorted!', 'Every marble is in a basket.', li + 1 < LEVELS.length ? 'Next level' : 'Play again', () => load((li + 1) % LEVELS.length));
  }
}
function lose() {
  if (S.over) return;
  S.over = true; buzz([40, 40, 80]);
  show('Tray full!', 'Try smaller snaps, or wait for the right basket.', 'Retry', () => load(li));
}
function show(t, p, b, fn) { $('ovT').textContent = t; $('ovP').textContent = p; $('ovB').textContent = b; $('ovB').onclick = fn; setTimeout(() => $('over').classList.add('show'), 300); }
function buzz(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }

// one action, like a MOBA skill: press and drag to aim, lift to snap, lift on the X to cancel
// camera drag is relative, so the finger never hides what's inside the frame
let press = null;
function toBoard(e) { const pt = board.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(board.getScreenCTM().inverse()); }
function overCancel(e) { const r = $('cancel').getBoundingClientRect(), pad = 14; return e.clientX >= r.left - pad && e.clientX <= r.right + pad && e.clientY >= r.top - pad && e.clientY <= r.bottom + pad; }
board.addEventListener('pointerdown', e => {
  if (S.over || busy || press) return; e.preventDefault();
  board.setPointerCapture && board.setPointerCapture(e.pointerId);
  press = { last: toBoard(e), hot: false };
  board.classList.add('moving'); $('cancel').classList.add('active');
});
board.addEventListener('pointermove', e => {
  if (!press) return;
  const p = toBoard(e), hot = overCancel(e), changed = hot !== press.hot;
  if (changed) { press.hot = hot; $('cancel').classList.toggle('hot', hot); board.classList.toggle('cancel', hot); if (hot) buzz(10); }
  // the camera holds still while the finger is on the X, and resumes from there without a jump
  if (!hot && !changed) {
    cam.x = Math.max(0, Math.min(BW - L.cw, cam.x + p.x - press.last.x));
    cam.y = Math.max(0, Math.min(BH - L.ch, cam.y + p.y - press.last.y));
    updateCam();
  }
  press.last = p;
});
function endPress(e) {
  if (!press) return;
  const fire = e.type === 'pointerup' && !overCancel(e);
  press = null;
  board.classList.remove('moving', 'cancel'); $('cancel').classList.remove('active', 'hot');
  if (fire) snap();
}
addEventListener('pointerup', endPress);
addEventListener('pointercancel', endPress);
// ---------- First-time tutorial (level 1): drag to aim, lift to snap, marbles fill the baskets ----------
let tut = 0, tutDone = false;
try { tutDone = !!localStorage.getItem('cam_tut'); } catch (e) {}
function toScreen(x, y) { const pt = board.createSVGPoint(); pt.x = x; pt.y = y; return pt.matrixTransform(board.getScreenCTM()); }
function setTut(step) {
  tut = step;
  const t = $('tut'), hand = $('hand'), msg = $('tutMsg');
  t.className = step ? 'on ' + ['', 'drag', 'wait', 'point'][step] : '';
  if (step === 1) { // the hand drags the camera from its centre to the first basket's colour
    const c = S.baskets[0].c, ms = L.marbles.filter((m, i) => S.left[i] && m.c === c);
    const tx = ms.reduce((a, m) => a + m.x, 0) / ms.length, ty = ms.reduce((a, m) => a + m.y, 0) / ms.length;
    const a = toScreen(cam.x + L.cw / 2, cam.y + L.ch / 2), b = toScreen(tx, ty);
    hand.style.left = a.x + 'px'; hand.style.top = a.y + 'px';
    hand.style.setProperty('--dx', (b.x - a.x) + 'px'); hand.style.setProperty('--dy', (b.y - a.y) + 'px');
    msg.textContent = 'Press & drag to aim the camera'; msg.style.top = (board.getBoundingClientRect().bottom - 50) + 'px';
  }
  if (step === 2) { msg.textContent = 'Lift your finger to SNAP! 📸'; }
  if (step === 3) { // point at the baskets
    const r = $('baskets').getBoundingClientRect();
    hand.style.left = (r.left + r.width / 2) + 'px'; hand.style.top = (r.bottom + 6) + 'px';
    msg.textContent = 'Marbles fill the basket of their colour'; msg.style.top = (r.bottom + 60) + 'px';
    setTimeout(() => { if (tut === 3) setTut(0); }, 3500);
  }
  if (!step && !tutDone) { tutDone = true; try { localStorage.setItem('cam_tut', '1'); } catch (e) {} }
}
board.addEventListener('pointerdown', () => { if (tut === 1 && press) setTut(2); });
addEventListener('pointerup', () => { if (tut === 2) setTimeout(() => setTut(S.left.some(x => !x) ? 3 : 1), 50); });
addEventListener('pointerdown', () => { if (tut === 3) setTut(0); });
addEventListener('resize', () => { if (tut === 1) setTut(1); });
const load0 = load;
load = i => { load0(i); setTut(i === 0 && !tutDone ? 1 : 0); };

$('restart').onclick = () => load(li);
$('skip').onclick = () => load((li + 1) % LEVELS.length);
load(li);
