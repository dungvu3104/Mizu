// ---------- Rules ----------
// A cube of wooden blocks. Each block holds a kitten peeking out of its window, and has an arrow.
// Tap a block: if nothing is in the arrow's way it slides out, and its kitten drops into the glass jar
// above the cube, right above where the block was. Turn the cube to aim; the beads on the jar's rim show
// where each free kitten would land. Cats of one colour that touch snuggle into one bigger cat, and
// once 4 kittens' worth are together they become a big fluffy cat that floats home.
// Kittens piled past the pink ribbon = lose. Empty the cube = win.
const CATS = ['#f2a65e', '#a8a6a3', '#f6e5c8', '#f4a7b3', '#b07a55']; // orange, grey, cream, pink, brown
const BLOCK = ['#f3b884', '#c8ccc0', '#f1e8d6', '#efc4c3', '#b88a66']; // softer wooden tints of the same colours
const DIRS6 = [[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]];
const GEN_DIRS = DIRS6.filter(d => d[1] >= 0); // no "down" arrows: the camera can't see under the cube
const BLOCKS = 24, PER_CAT = 4; // 4 kittens of a colour make 1 big cat, so 6 big cats per cube
const MAX_LEVEL = 15; // after the last level, play starts again from level 1
const nextLevel = () => level >= MAX_LEVEL ? 1 : level + 1;
const key = (x, y, z) => x + ',' + y + ',' + z;

function mulberry32(a){ return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function shuffle(a, rng){ for(let k = a.length - 1; k > 0; k--){ const j = (rng() * (k + 1)) | 0; [a[k], a[j]] = [a[j], a[k]]; } return a; }

// Walk from a block along its arrow. Returns the first block in the way (or null) and the gap to it.
function ray(occ, x, y, z, d){
  let gap = 0;
  for(;;){
    x += d[0]; y += d[1]; z += d[2];
    if(Math.abs(x) > 1 || Math.abs(y) > 1 || Math.abs(z) > 1) return {hit:null, gap};
    const h = occ.get(key(x, y, z));
    if(h) return {hit:h, gap};
    gap++;
  }
}

// More colours and a narrower jar as the levels go on.
function levelConfig(n){
  if(n === 1) return {colors:3, w:2.9, line:1.65};
  if(n <= 3) return {colors:4, w:3.0, line:1.7};
  if(n <= 6) return {colors:4, w:2.75, line:1.6};
  if(n <= 10) return {colors:5, w:2.85, line:1.65};
  return {colors:5, w:2.7, line:1.6};
}

// Build the cube (each new block gets an arrow with a clear way out past the blocks placed before it,
// so it can always be emptied), then give every colour kittens in fours, so each can become big cats.
function genLevel(n){
  const cfg = levelConfig(n), rng = mulberry32(n * 6007 + 11);
  const palette = shuffle([0, 1, 2, 3, 4], rng).slice(0, cfg.colors);
  const fams = palette.slice();
  while(fams.length < BLOCKS / PER_CAT) fams.push(palette[(rng() * palette.length) | 0]);
  const seq = shuffle(fams.flatMap(c => Array(PER_CAT).fill(c)), rng);
  const all = [];
  for(let x = -1; x <= 1; x++) for(let y = -1; y <= 1; y++) for(let z = -1; z <= 1; z++) all.push([x, y, z]);
  let blocks;
  do {
    const occ = new Map();
    blocks = [];
    for(const [x, y, z] of shuffle(all.slice(), rng).slice(0, BLOCKS)){
      const d = shuffle(GEN_DIRS.slice(), rng).find(d => !ray(occ, x, y, z, d).hit);
      if(!d) break;
      const b = {x, y, z, dir:d};
      occ.set(key(x, y, z), b); blocks.push(b);
    }
  } while(blocks.length < BLOCKS);
  blocks.forEach((b, i) => { b.color = seq[i]; });
  return {blocks, cfg, cats:fams.length};
}

// ---------- 3D scene ----------
const $ = id => document.getElementById(id);
const cv = $('cv');
const renderer = new THREE.WebGLRenderer({canvas:cv, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
scene.add(new THREE.HemisphereLight(0xfff1dc, 0x8a6a50, 0.85));
const sun = new THREE.DirectionalLight(0xffe2bc, 0.75); // warm lamp light
sun.position.set(3.5, 8, 5); sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024); Object.assign(sun.shadow.camera, {left:-5, right:5, top:6, bottom:-5, near:1, far:24}); sun.shadow.radius = 4;
scene.add(sun);
const cube = new THREE.Group();
scene.add(cube);
const mat = (c, o = {}) => new THREE.MeshStandardMaterial({color:c, roughness:0.8, ...o});

// soft painted wood: base colour, gentle grain, darker worn edges
function woodTexture(hex, grain = 0.07){
  const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d');
  g.fillStyle = hex; g.fillRect(0, 0, 256, 256);
  const rng = mulberry32(parseInt(hex.slice(1), 16) % 9973);
  for(let i = 0; i < 26; i++){
    g.strokeStyle = `rgba(90,60,40,${grain * (0.4 + rng() * 0.8)})`; g.lineWidth = 1 + rng() * 2.5;
    const y = rng() * 256; g.beginPath(); g.moveTo(0, y);
    for(let x = 0; x <= 256; x += 32) g.lineTo(x, y + Math.sin(x / 40 + i) * 4 + (rng() - 0.5) * 3);
    g.stroke();
  }
  const v = g.createRadialGradient(128, 128, 90, 128, 128, 190); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(90,55,35,.28)');
  g.fillStyle = v; g.fillRect(0, 0, 256, 256);
  g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = 5; g.strokeRect(6, 6, 244, 244);
  const t = new THREE.CanvasTexture(c); t.anisotropy = 4;
  return t;
}
// woven basket strands
function weaveTexture(a, b){
  const c = document.createElement('canvas'); c.width = 128; c.height = 64; const g = c.getContext('2d');
  g.fillStyle = a; g.fillRect(0, 0, 128, 64);
  for(let y = 0; y < 64; y += 8) for(let x = 0; x < 128; x += 16){ g.fillStyle = (x / 16 + y / 8) % 2 ? b : a; g.fillRect(x, y, 16, 8); g.fillStyle = 'rgba(80,50,30,.18)'; g.fillRect(x, y + 7, 16, 1); }
  const t = new THREE.CanvasTexture(c); t.wrapS = THREE.RepeatWrapping; t.repeat.set(3, 1);
  return t;
}

const boxGeo = new THREE.BoxGeometry(0.94, 0.94, 0.94);
const arrowShape = new THREE.Shape();
arrowShape.moveTo(-0.28, -0.07); arrowShape.lineTo(0.03, -0.07); arrowShape.lineTo(0.03, -0.18);
arrowShape.lineTo(0.3, 0); arrowShape.lineTo(0.03, 0.18); arrowShape.lineTo(0.03, 0.07); arrowShape.lineTo(-0.28, 0.07);
const arrowGeo = new THREE.ShapeGeometry(arrowShape);
const decalOpts = {polygonOffset:true, polygonOffsetFactor:-2};
const boxMat = BLOCK.map(c => new THREE.MeshStandardMaterial({map:woodTexture(c), roughness:0.85}));
const arrowMat = BLOCK.map(c => new THREE.MeshBasicMaterial({color:new THREE.Color(c).lerp(new THREE.Color(0x6b4a3a), 0.55), ...decalOpts}));

// The face a block will leave through has a round window, a stitched rim, and a kitten looking out.
const holeGeo = new THREE.CircleGeometry(0.33, 28), rimGeo = new THREE.RingGeometry(0.33, 0.39, 28);
const holeMat = new THREE.MeshBasicMaterial({color:0x3b2a22, ...decalOpts});
const rimMat = new THREE.MeshStandardMaterial({color:0xfaf0e0, roughness:0.8, ...decalOpts});
const stitchGeo = new THREE.BufferGeometry().setFromPoints(Array.from({length:49}, (_, i) => new THREE.Vector3(Math.cos(i / 48 * Math.PI * 2) * 0.43, Math.sin(i / 48 * Math.PI * 2) * 0.43, 0.004)));
const stitchMat = new THREE.LineDashedMaterial({color:0x8a6a55, dashSize:0.04, gapSize:0.035});
const furMat = CATS.map(c => new THREE.MeshStandardMaterial({color:c, roughness:0.9}));
const K = {
  head:new THREE.SphereGeometry(0.25, 24, 18), ear:new THREE.ConeGeometry(0.1, 0.19, 12), muzzle:new THREE.SphereGeometry(0.075, 14, 10),
  eye:new THREE.SphereGeometry(0.058, 14, 10), pupil:new THREE.SphereGeometry(0.03, 10, 8), glint:new THREE.SphereGeometry(0.014, 8, 6),
  nose:new THREE.SphereGeometry(0.028, 10, 8), paw:new THREE.SphereGeometry(0.055, 10, 8), whisker:new THREE.CylinderGeometry(0.004, 0.004, 0.17, 4),
  lid:new THREE.TorusGeometry(0.045, 0.012, 6, 12, Math.PI), blush:new THREE.CircleGeometry(0.04, 12),
  body:new THREE.SphereGeometry(0.27, 20, 16), tail:new THREE.TorusGeometry(0.2, 0.045, 8, 16, Math.PI * 1.1),
};
const KM = {
  white:new THREE.MeshStandardMaterial({color:0xfffaf3, roughness:0.85}), pink:new THREE.MeshStandardMaterial({color:0xffb3be, roughness:0.7}),
  green:new THREE.MeshStandardMaterial({color:0x9fcf8f, roughness:0.2}), amber:new THREE.MeshStandardMaterial({color:0xe8b65c, roughness:0.2}),
  pupil:new THREE.MeshStandardMaterial({color:0x2a1d16, roughness:0.1}), glint:new THREE.MeshBasicMaterial({color:0xffffff}),
  nose:new THREE.MeshStandardMaterial({color:0xe8838f, roughness:0.4}), whisker:new THREE.MeshBasicMaterial({color:0xfff6ea}),
  lid:new THREE.MeshBasicMaterial({color:0x4a3329}), blush:new THREE.MeshBasicMaterial({color:0xff9fa8, transparent:true, opacity:0.55}),
};
// A kitten's head with paws, looking along +z. Some are snoozing.
function makeKitty(color, sleepy){
  const g = new THREE.Group(), add = (geo, m, x, y, z, sx = 1, sy = 1, sz = 1) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); o.scale.set(sx, sy, sz); o.castShadow = true; g.add(o); return o; };
  add(K.head, furMat[color], 0, 0.02, 0, 1.06, 0.9, 0.95);
  const eyes = [];
  for(const sx of [-1, 1]){
    const ear = add(K.ear, furMat[color], sx * 0.15, 0.25, -0.02, 1, 1, 0.55); ear.rotation.z = sx * -0.38;
    add(K.ear, KM.pink, sx * 0.15, 0.24, 0.02, 0.55, 0.7, 0.3).rotation.z = sx * -0.38;
    add(K.muzzle, KM.white, sx * 0.055, -0.08, 0.19, 1, 0.8, 0.7);
    add(K.blush, KM.blush, sx * 0.15, -0.03, 0.215).rotation.y = sx * 0.5;
    if(sleepy){ const lid = add(K.lid, KM.lid, sx * 0.105, 0.04, 0.215); lid.rotation.z = Math.PI; }
    else {
      const eye = new THREE.Group(); eye.position.set(sx * 0.105, 0.05, 0.19); g.add(eye); eyes.push(eye);
      const iris = new THREE.Mesh(K.eye, color === 4 ? KM.amber : KM.green); iris.scale.set(1, 1.15, 0.6); eye.add(iris);
      const pupil = new THREE.Mesh(K.pupil, KM.pupil); pupil.position.z = 0.03; pupil.scale.set(0.55, 1.4, 0.5); eye.add(pupil);
      const gl = new THREE.Mesh(K.glint, KM.glint); gl.position.set(0.018, 0.022, 0.045); eye.add(gl);
    }
    add(K.paw, furMat[color], sx * 0.1, -0.22, 0.15, 1.2, 0.75, 1.1);
    for(const a of [-0.18, 0, 0.18]){ const w = add(K.whisker, KM.whisker, sx * 0.19, -0.075 + a * 0.12, 0.19); w.rotation.z = Math.PI / 2 + sx * a; }
  }
  add(K.nose, KM.nose, 0, -0.045, 0.245, 1.3, 0.9, 0.9);
  g.userData.eyes = eyes; g.userData.sleepy = sleepy;
  return g;
}
// A sitting kitten with a round body and a curled tail. Given several colours it's a mixed cat:
// body, head, tail and a patch on its back each take one of them.
function makeSitter(colors){
  if(!Array.isArray(colors)) colors = [colors];
  const u = [...new Set(colors)], body = u[0], head = u[1] ?? u[0], tail = u[2] ?? u[1] ?? u[0];
  const g = new THREE.Group();
  const b = new THREE.Mesh(K.body, furMat[body]); b.scale.set(1, 0.85, 0.95); b.position.set(0, 0.22, -0.05); b.castShadow = true; g.add(b);
  if(u.length > 1){ const patch = new THREE.Mesh(K.body, furMat[u[u.length - 1]]); patch.scale.set(0.55, 0.45, 0.5); patch.position.set(-0.12, 0.33, -0.1); g.add(patch); }
  const t = new THREE.Mesh(K.tail, furMat[tail]); t.position.set(0.18, 0.12, -0.2); t.rotation.set(Math.PI / 2, 0, 0.4); g.add(t);
  const h = makeKitty(head, false); h.position.set(0, 0.52, 0.05); h.scale.setScalar(0.95); g.add(h);
  g.userData.head = h;
  return g;
}
const peekers = []; // kittens in the cube's windows

function makeBlockMesh(b){
  const mesh = new THREE.Mesh(boxGeo, boxMat[b.color]);
  mesh.castShadow = mesh.receiveShadow = true;
  const d = new THREE.Vector3(...b.dir);
  for(const nArr of DIRS6){
    const n = new THREE.Vector3(...nArr), dot = n.dot(d);
    if(dot < -0.5) continue;
    let m;
    if(dot > 0.5){
      const up = Math.abs(d.y) > 0.5 ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
      m = new THREE.Group();
      const stitch = new THREE.LineLoop(stitchGeo, stitchMat); stitch.computeLineDistances();
      m.add(new THREE.Mesh(holeGeo, holeMat), new THREE.Mesh(rimGeo, rimMat), stitch);
      const k = makeKitty(b.color, Math.random() < 0.3);
      k.position.z = 0.02; k.scale.setScalar(0.92);
      k.userData.phase = Math.random() * 6.28;
      if(d.y > 0.5) k.rotation.x = -0.55; // kittens in the roof lean forward so you can see their faces
      m.add(k); peekers.push(k); b.kitty = k;
      m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(new THREE.Vector3().crossVectors(up, n), up, n));
    } else {
      m = new THREE.Mesh(arrowGeo, arrowMat[b.color]);
      m.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(d, new THREE.Vector3().crossVectors(n, d), n));
    }
    m.position.copy(n).multiplyScalar(0.471);
    mesh.add(m);
  }
  mesh.position.set(b.x, b.y, b.z);
  mesh.userData.b = b;
  cube.add(mesh);
  return mesh;
}

// the wooden table the cube sits on, and a ball of yarn beside it
(() => {
  const plank = woodTexture('#b98a5f', 0.16); plank.wrapS = plank.wrapT = THREE.RepeatWrapping; plank.repeat.set(3, 1);
  const table = new THREE.Mesh(new THREE.BoxGeometry(9, 0.35, 6), new THREE.MeshStandardMaterial({map:plank, roughness:0.85}));
  table.position.set(0, -1.68, 0); table.receiveShadow = true; scene.add(table);
  const yarn = new THREE.Group(); yarn.position.set(2.25, -1.22, 1.1); scene.add(yarn);
  const ym = mat(0x9fb38c);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.3, 20, 16), ym); ball.castShadow = true; yarn.add(ball);
  for(let i = 0; i < 6; i++){ const w = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.018, 6, 30), mat(0x8aa078)); w.rotation.set(i * 0.6, i * 0.9, 0); yarn.add(w); }
})();

// ---------- The glass jar above the cube ----------
// Kittens in the jar are circles in a little 2D physics world (x across, y up from the jar's floor).
const JAR_Y = 2.45, JAR_D = 0.9, WALL = 1.95, R = [0.23, 0.31, 0.37]; // a cat made of 1, 2 or 3 kittens
let jarW = 2.7, jarLine = 1.5;
const jar = new THREE.Group(); jar.position.y = JAR_Y; scene.add(jar);
const glassMat = new THREE.MeshStandardMaterial({color:0xe6f6ff, transparent:true, opacity:0.25, roughness:0.05, depthWrite:false, side:THREE.DoubleSide});
const frontMat = new THREE.MeshStandardMaterial({color:0xffffff, transparent:true, opacity:0.07, roughness:0.05, depthWrite:false});
const shineMat = new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.55, depthWrite:false});
const glintMat = new THREE.MeshBasicMaterial({color:0xffffff, transparent:true, opacity:0.22, depthWrite:false});
const jarWood = new THREE.MeshStandardMaterial({map:woodTexture('#c99a6b', 0.14), roughness:0.85});
const ribbonMat = new THREE.MeshBasicMaterial({color:0xf29bb0});
const RIBBON = new THREE.Color(0xf29bb0), DANGER = new THREE.Color(0xe0455e);
function buildJar(){
  jar.clear();
  const w = jarW, add = (geo, m, x, y, z) => { const o = new THREE.Mesh(geo, m); o.position.set(x, y, z); jar.add(o); return o; };
  const base = add(new THREE.BoxGeometry(w + 0.34, 0.18, JAR_D + 0.24), jarWood, 0, -0.09, 0); base.castShadow = base.receiveShadow = true;
  add(new THREE.PlaneGeometry(w, WALL), glassMat, 0, WALL / 2, -JAR_D / 2);
  for(const sx of [-1, 1]){
    add(new THREE.BoxGeometry(0.05, WALL, JAR_D), glassMat, sx * (w / 2 + 0.025), WALL / 2, 0);
    for(const sz of [-1, 1]) add(new THREE.BoxGeometry(0.035, WALL, 0.035), shineMat, sx * (w / 2 + 0.03), WALL / 2, sz * JAR_D / 2);
  }
  add(new THREE.BoxGeometry(w + 0.1, 0.035, 0.035), shineMat, 0, WALL, JAR_D / 2);
  add(new THREE.PlaneGeometry(w, WALL), frontMat, 0, WALL / 2, JAR_D / 2);
  add(new THREE.PlaneGeometry(0.09, WALL * 0.7), glintMat, -w / 2 + 0.22, WALL * 0.55, JAR_D / 2 + 0.01).rotation.z = 0.06;
  // the ribbon: don't let the kittens pile up past it
  for(let x = -w / 2 + 0.05; x < w / 2 - 0.1; x += 0.2) add(new THREE.BoxGeometry(0.12, 0.035, 0.01), ribbonMat, x + 0.06, jarLine, JAR_D / 2 + 0.02);
  for(const sx of [-1, 1]){ const bow = add(new THREE.SphereGeometry(0.07, 12, 8), ribbonMat, w / 2 - 0.12 + sx * 0.07, jarLine + 0.02, JAR_D / 2 + 0.04); bow.scale.set(1.2, 0.7, 0.5); bow.rotation.z = sx * 0.4; }
}

// beads on the jar's rim: where each kitten you could free right now would drop
const guideGeo = new THREE.SphereGeometry(0.085, 12, 8), guides = [];
function dropX(b){ b.mesh.getWorldPosition(tmp); const lim = jarW / 2 - R[0] - 0.02; return Math.max(-lim, Math.min(lim, tmp.x * 0.8)); }
function updateGuides(){
  const free = over ? [] : blocks.filter(b => !ray(occ, b.x, b.y, b.z, b.dir).hit);
  while(guides.length < free.length){ const m = new THREE.Mesh(guideGeo, furMat[0]); m.castShadow = true; scene.add(m); guides.push(m); }
  guides.forEach((g, i) => { const b = free[i]; g.visible = !!b; if(b){ g.material = furMat[b.color]; g.position.set(dropX(b), JAR_Y + WALL + 0.1, JAR_D / 2); } });
}

// ---------- Game state ----------
let level = 1, lv, occ, blocks, over = false, flying = [], outcome = null;
let balls = [], movers = [], pops = [], effects = [], made = 0, danger = 0, settle = 0;

function store(k, v){ try { if(v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch(e){ return null; } }
function buzz(ms){ try { navigator.vibrate && navigator.vibrate(ms); } catch(e){} }
let actx = null;
function chime(f, d = 0.18, v = 0.08){
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime;
    o.type = 'sine'; o.frequency.setValueAtTime(f, t); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t + d); } catch(e){}
}

// ---------- First-time tutorial: 1) swipe to turn the cube, 2) tap a block to free its kitten ----------
let tutStep = 0, tutTurned = 0;
function setTut(step){
  tutStep = step;
  $('tut').className = step ? 'on ' + (step === 1 ? 'swipe' : 'tap') : '';
  if(step === 1) $('tutMsg').textContent = '⟵ Swipe to turn the cube ⟶';
  if(step === 2) $('tutMsg').textContent = 'Tap a block to free its kitten!';
  if(!step) store('catjar_tut', '1');
}
function updateTut(){
  if(!tutStep) return;
  const r = cv.getBoundingClientRect(), at = new THREE.Vector3(0, 0.5, 1.5);
  if(tutStep === 2){ // point at a free block facing us
    const free = blocks.filter(b => !ray(occ, b.x, b.y, b.z, b.dir).hit);
    if(!free.length) return;
    let best = free[0], bz = -1e9;
    for(const b of free){ b.mesh.getWorldPosition(tmp); if(tmp.z + tmp.y * 0.3 > bz){ bz = tmp.z + tmp.y * 0.3; best = b; } }
    best.mesh.getWorldPosition(at);
  }
  at.project(camera);
  $('hand').style.left = (at.x + 1) / 2 * r.width + 'px';
  $('hand').style.top = (1 - at.y) / 2 * r.height + 'px';
}

function loadLevel(n){
  level = n;
  lv = genLevel(n);
  $('lvl').textContent = n;
  $('tip').textContent = n === 1 ? 'Same colours that touch snuggle into one cat 🐾' : n === 2 ? 'The beads on the jar show where each kitten drops. Turn the cube to aim!' : n === 3 ? 'Don\'t let them pile past the pink ribbon' : '';
  restart();
  setTut(n === 1 && !store('catjar_tut') ? 1 : 0);
}
function restart(){
  for(const b of blocks || []) cube.remove(b.mesh);
  for(const f of flying) cube.remove(f.mesh);
  for(const m of movers) scene.remove(m.g);
  for(const e of effects) scene.remove(e.o);
  flying = []; peekers.length = 0; balls = []; movers = []; pops = []; effects = [];
  jarW = lv.cfg.w; jarLine = lv.cfg.line; buildJar();
  occ = new Map();
  blocks = lv.blocks.map(src => {
    const b = {...src, off:0, bump:-1, shake:0};
    b.mesh = makeBlockMesh(b);
    occ.set(key(b.x, b.y, b.z), b);
    return b;
  });
  cube.rotation.y = Math.PI / 4;
  over = false; outcome = null; made = 0; danger = 0; settle = 0;
  $('overlay').classList.remove('on');
  updateHud();
  resize();
}
function updateHud(){ $('doneN').textContent = `${made}/${lv.cats}`; }

// A kitten or bigger cat in the jar. Chubby: wider than tall, so the pile looks like a heap of round cats.
function addBall(color, n, x, y){
  const r = R[n - 1], g = makeSitter(color);
  g.rotation.y = (Math.random() - 0.5) * 0.6;
  jar.add(g);
  const b = {color, n, r, x, y, vx:0, vy:0, g, age:0, pop:0};
  balls.push(b);
  return b;
}
function placeBall(b){
  const s = 1 + Math.sin(b.pop * Math.PI) * 0.25;
  b.g.scale.set(b.r * 3.3 * s, b.r * 2.6 * s, b.r * 2.6 * s);
  b.g.position.set(b.x, b.y - b.r * 1.02, 0);
  b.g.rotation.z = Math.max(-0.35, Math.min(0.35, -b.vx * 0.12));
}
// Two of a colour touched: they snuggle into one bigger cat. 4 kittens' worth make a big cat, who floats home.
function merge(a, c){
  a.dead = c.dead = true; jar.remove(a.g); jar.remove(c.g);
  const x = (a.x + c.x) / 2, y = (a.y + c.y) / 2;
  const n = a.n + c.n;
  if(n >= PER_CAT){
    const g = makeSitter(a.color); g.position.set(x, y - 0.3, 0.2); g.scale.setScalar(0.01); jar.add(g);
    pops.push({g, t:0, x, y});
    made++; updateHud();
    hearts(new THREE.Vector3(x, y + JAR_Y, 0.4));
    [784, 988, 1319].forEach((f, i) => setTimeout(() => chime(f, 0.25, 0.08), i * 90)); buzz([12, 30, 12]);
  } else {
    const b = addBall(a.color, n, x, Math.max(y, R[n - 1]));
    b.vy = 1.4; b.pop = 1; b.age = 0.5;
    chime(700 + Math.random() * 60, 0.15, 0.07); buzz(10);
  }
}
function physics(dt){
  const n = 8, h = dt / n, half = jarW / 2;
  for(let s = 0; s < n; s++){
    for(const b of balls){
      b.vy -= 10 * h; b.x += b.vx * h; b.y += b.vy * h;
      if(b.x < -half + b.r){ b.x = -half + b.r; if(b.vx < 0) b.vx *= -0.2; }
      if(b.x > half - b.r){ b.x = half - b.r; if(b.vx > 0) b.vx *= -0.2; }
      if(b.y < b.r){ b.y = b.r; if(b.vy < 0) b.vy *= -0.15; b.vx *= Math.pow(0.05, h); }
    }
    for(let i = 0; i < balls.length; i++) for(let j = i + 1; j < balls.length; j++){
      const a = balls[i], c = balls[j], dx = c.x - a.x, dy = c.y - a.y, min = a.r + c.r, d2 = dx * dx + dy * dy;
      if(d2 >= min * min || d2 < 1e-9) continue;
      const d = Math.sqrt(d2), nx = dx / d, ny = dy / d, ma = a.r * a.r, mc = c.r * c.r, k = (min - d) / (ma + mc);
      a.x -= nx * k * mc; a.y -= ny * k * mc; c.x += nx * k * ma; c.y += ny * k * ma;
      const rv = (c.vx - a.vx) * nx + (c.vy - a.vy) * ny;
      if(rv < 0){ const imp = -1.1 * rv / (1 / ma + 1 / mc); a.vx -= imp * nx / ma; a.vy -= imp * ny / ma; c.vx += imp * nx / mc; c.vy += imp * ny / mc; }
      a.vx *= 0.997; c.vx *= 0.997;
    }
  }
  for(let i = 0; i < balls.length; i++) for(let j = i + 1; j < balls.length; j++){
    const a = balls[i], c = balls[j];
    if(a.dead || c.dead || a.color !== c.color) continue;
    if(Math.hypot(c.x - a.x, c.y - a.y) < a.r + c.r + 0.03) merge(a, c);
  }
  if(balls.some(b => b.dead)) balls = balls.filter(b => !b.dead);
}

// ---------- Tapping a block ----------
const tmp = new THREE.Vector3();
function tapBlock(b){
  if(over) return;
  const r = ray(occ, b.x, b.y, b.z, b.dir);
  if(r.hit){
    if(b.bump < 0){ b.bump = 0; b.gap = r.gap; b.blocker = r.hit; }
    buzz(30);
    return;
  }
  const x = dropX(b);
  occ.delete(key(b.x, b.y, b.z));
  blocks.splice(blocks.indexOf(b), 1);
  b.t = 0; flying.push(b);
  chime(660 + Math.random() * 80, 0.12, 0.05);
  // the kitten climbs out of its window and hops up over the jar
  const k = {g:makeSitter(b.color), color:b.color, x, t:0};
  b.kitty.getWorldPosition(tmp); k.from = tmp.clone(); k.g.position.copy(tmp); k.g.scale.setScalar(0.5); scene.add(k.g);
  b.kitty.visible = false; peekers.splice(peekers.indexOf(b.kitty), 1);
  movers.push(k);
  settle = 0;
  if(tutStep) setTut(0);
}

function winScreen(){
  store('catjar_level', String(nextLevel()));
  [784, 988, 1175, 1568].forEach((f, i) => setTimeout(() => chime(f, 0.3, 0.08), i * 120));
  showOverlay('Cube cleared!', `${made} big cat${made === 1 ? '' : 's'} made 🐾`, 'Next', () => loadLevel(nextLevel()));
}
function showOverlay(title, sub, btn, action){
  $('ovT').textContent = title; $('ovS').textContent = sub; $('ovB').textContent = btn;
  $('overlay').onclick = () => { $('overlay').classList.remove('on'); action(); };
  $('overlay').classList.add('on');
}

// little hearts that float up when a big cat is made
const heartTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 64; const g = c.getContext('2d');
  g.fillStyle = '#ff8fa8'; g.beginPath(); g.moveTo(32, 56); g.bezierCurveTo(4, 36, 4, 10, 22, 10); g.bezierCurveTo(28, 10, 32, 15, 32, 20);
  g.bezierCurveTo(32, 15, 36, 10, 42, 10); g.bezierCurveTo(60, 10, 60, 36, 32, 56); g.fill(); return new THREE.CanvasTexture(c); })();
function hearts(at){
  for(let i = 0; i < 6; i++){
    const s = new THREE.Sprite(new THREE.SpriteMaterial({map:heartTex, transparent:true, depthWrite:false}));
    s.position.copy(at).add(new THREE.Vector3((Math.random() - 0.5) * 0.8, 0.3, 0.3)); s.scale.setScalar(0.18 + Math.random() * 0.1); scene.add(s);
    effects.push({o:s, v:new THREE.Vector3((Math.random() - 0.5) * 0.6, 1 + Math.random(), 0), life:1});
  }
}

// ---------- Input: drag sideways to turn, tap a block ----------
const ray3 = new THREE.Raycaster(), ndc = new THREE.Vector2();
let dragging = false, downX = 0, downY = 0, lastX = 0, moved = 0, spin = 0;
cv.addEventListener('pointerdown', e => { dragging = true; downX = lastX = e.clientX; downY = e.clientY; moved = 0; spin = 0; });
window.addEventListener('pointermove', e => {
  if(!dragging) return;
  const dx = e.clientX - lastX; lastX = e.clientX;
  moved = Math.max(moved, Math.hypot(e.clientX - downX, e.clientY - downY));
  if(moved > 10){ cube.rotation.y += dx * 0.012; spin = dx * 0.012 * 60; tutTurned += Math.abs(dx); if(tutStep === 1 && tutTurned > 120) setTut(2); }
});
window.addEventListener('pointerup', e => {
  if(!dragging) return;
  dragging = false;
  if(moved > 10) return;
  spin = 0; // a tap stops the cube, so what you tapped is what you get
  const r = cv.getBoundingClientRect();
  ndc.set((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  cube.updateMatrixWorld();
  ray3.setFromCamera(ndc, camera);
  // only the wooden blocks count, not the kittens sticking out of a neighbour's window
  const hit = ray3.intersectObjects(blocks.map(b => b.mesh), false)[0];
  if(hit) tapBlock(hit.object.userData.b);
});
$('nextLvl').onclick = () => { $('overlay').classList.remove('on'); loadLevel(nextLevel()); store('catjar_level', String(level)); };

// ---------- Rendering ----------
function resize(){
  const r = cv.parentElement.getBoundingClientRect();
  renderer.setSize(r.width, r.height, false);
  camera.aspect = r.width / r.height;
  camera.updateProjectionMatrix();
  const t = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  const d = Math.max(3.75 / t, 2.15 / (t * camera.aspect)); // fits the table, cube and jar
  const look = new THREE.Vector3(0, 1.55, 0);
  camera.position.copy(new THREE.Vector3(0, 0.2, 1).normalize().multiplyScalar(d)).add(look);
  camera.lookAt(look);
}
window.addEventListener('resize', resize);

// fairy lights along the top and a few drifting sparkles
(() => {
  const svg = $('lights'); let s = '<path d="M-10 14 Q100 62 200 26 T410 22" fill="none" stroke="#7a5a45" stroke-width="1.2"/>';
  for(let i = 0; i < 14; i++){
    const x = i * 30 + 6, t = x / 400, y = t < 0.5 ? 14 + Math.sin(t * Math.PI * 2) * 30 : 26 + Math.sin((t - 0.5) * Math.PI * 2) * 18;
    s += `<g class="bulb" style="animation-delay:${(i * 0.37) % 3}s"><circle cx="${x}" cy="${y + 6}" r="8" fill="rgba(255,214,140,.35)"/><circle cx="${x}" cy="${y + 6}" r="3.2" fill="#ffe7a8"/></g>`;
  }
  svg.innerHTML = s;
  for(let i = 0; i < 10; i++){
    const d = document.createElement('div'); d.className = 'spark';
    d.style.left = (5 + Math.random() * 90) + '%'; d.style.top = (25 + Math.random() * 65) + '%'; d.style.animationDelay = (Math.random() * 9) + 's';
    $('room').appendChild(d);
  }
})();

const ease = t => t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
let last = 0;
function frame(now){
  const time = now / 1000, dt = Math.max(0, Math.min(0.05, time - last || 0)); last = Math.max(last, time); // never step backwards
  if(!dragging && Math.abs(spin) > 0.001){ cube.rotation.y += spin * dt; spin *= Math.pow(0.04, dt); }
  for(const b of blocks){
    if(b.bump >= 0){ // slide up to the blocker, then spring back
      b.bump += dt;
      const reach = b.gap + 0.08, p = b.bump / 0.3;
      if(p < 0.35) b.off = reach * (1 - (1 - p / 0.35) ** 2);
      else if(p < 1){ b.off = reach * (1 - ((p - 0.35) / 0.65) ** 2); if(!b.blocker.shake) b.blocker.shake = 0.2; }
      else { b.off = 0; b.bump = -1; }
    }
    if(b.shake > 0) b.shake = Math.max(0, b.shake - dt);
    const s = b.shake > 0 ? Math.sin(b.shake * 80) * 0.04 : 0;
    b.mesh.position.set(b.x + b.dir[0] * b.off + s, b.y + b.dir[1] * b.off, b.z + b.dir[2] * b.off);
  }
  for(const k of peekers){ // awake ones peek and look around; sleepy ones breathe slowly
    const ph = k.userData.phase;
    if(k.userData.sleepy){ k.position.z = 0.01 + Math.sin(time * 1.1 + ph) * 0.012; k.rotation.z = 0.18; continue; }
    k.position.z = 0.02 + Math.sin(time * 1.6 + ph) * 0.025;
    k.rotation.y = Math.sin(time * 0.7 + ph * 2) * 0.28;
    k.rotation.z = Math.sin(time * 0.5 + ph) * 0.12;
    const blink = ((time + ph) % 3.7) < 0.12 ? 0.15 : 1;
    for(const e of k.userData.eyes) e.scale.y = blink;
  }
  for(let k = flying.length - 1; k >= 0; k--){
    const b = flying[k];
    b.t += dt;
    const off = 5 * b.t + 40 * b.t * b.t;
    b.mesh.position.set(b.x + b.dir[0] * off, b.y + b.dir[1] * off, b.z + b.dir[2] * off);
    b.mesh.scale.setScalar(Math.max(0, 1 - Math.max(0, off - 1.5) / 3));
    if(off > 4.5){ cube.remove(b.mesh); flying.splice(k, 1); }
  }
  // kittens hop from their window up over the jar, then drop in
  for(const k of movers.slice()){
    k.t += dt / 0.45;
    const p = Math.min(1, k.t), to = new THREE.Vector3(k.x, JAR_Y + WALL + 0.3, 0);
    const mid = k.from.clone().lerp(to, 0.5); mid.y += 0.8;
    const a = k.from.clone().lerp(mid, p), b2 = mid.clone().lerp(to, p);
    k.g.position.copy(a.lerp(b2, p));
    k.g.rotation.set(0, Math.sin(p * Math.PI) * 0.6, Math.sin(p * Math.PI * 2) * 0.2);
    if(p >= 1){
      scene.remove(k.g); movers.splice(movers.indexOf(k), 1);
      const b = addBall(k.color, 1, k.x + (Math.random() - 0.5) * 0.04, WALL + 0.3); b.vy = -1;
    }
  }
  physics(dt);
  for(const b of balls){ b.age += dt; b.pop = Math.max(0, b.pop - dt * 3); placeBall(b); }
  // big cats grow, wiggle happily, then float up and away
  for(let i = pops.length - 1; i >= 0; i--){
    const p = pops[i]; p.t += dt;
    const g = Math.min(1, p.t / 0.3);
    p.g.scale.setScalar(1.05 * (g < 1 ? Math.sin(g * Math.PI / 2) * 1.2 : 1.2 - Math.min(1, (p.t - 0.3) / 0.15) * 0.2));
    p.g.rotation.z = Math.sin(p.t * 14) * 0.08;
    if(p.t > 0.7){ const q = p.t - 0.7; p.g.position.y = p.y - 0.3 + q * q * 9; p.g.scale.multiplyScalar(Math.max(0.01, 1 - q * 1.2)); }
    if(p.t > 1.5){ jar.remove(p.g); pops.splice(i, 1); }
  }
  // too full? kittens resting above the ribbon for a moment = lose
  const top = balls.reduce((m, b) => b.age > 1 ? Math.max(m, b.y + b.r * 0.85) : m, 0);
  if(!over && top > jarLine){ danger += dt; if(danger > 1.6){ over = true; buzz([40, 60, 40]); setTimeout(() => showOverlay('Too full!', 'The kittens piled past the ribbon.', 'Try again', restart), 700); } }
  else if(!over) danger = Math.max(0, danger - dt * 2);
  ribbonMat.color.copy(RIBBON).lerp(DANGER, danger > 0 ? 0.5 + Math.sin(time * 16) * 0.5 : 0);
  // the cube is empty and everyone has settled down = win
  if(!over && !blocks.length && !movers.length && !pops.length && danger === 0){ settle += dt; if(settle > 1.2){ over = true; outcome = 'win'; winScreen(); } }
  updateGuides(); updateTut();
  for(let i = effects.length - 1; i >= 0; i--){
    const e = effects[i]; e.life -= dt; e.o.position.addScaledVector(e.v, dt); e.o.material.opacity = Math.max(0, e.life);
    if(e.life <= 0){ scene.remove(e.o); effects.splice(i, 1); }
  }
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

const saved = parseInt(store('catjar_level')) || 1;
loadLevel(saved >= 1 && saved <= MAX_LEVEL ? saved : 1);
requestAnimationFrame(frame);
