const STORAGE_KEYS = {
  customProducts: "3ogleh.customProducts",
  customColors: "3ogleh.customColors",
  priceOverrides: "3ogleh.priceOverrides",
  builderState: "3ogleh.builderState",
  cart: "3ogleh.cart",
};

const BASE_COLORS = [
  { id: "black", name: "Black", value: "#050505" },
  { id: "white", name: "White", value: "#f4f4ef" },
  { id: "orange", name: "Orange", value: "#ff6b00" },
  { id: "yellow", name: "Yellow", value: "#f5c400" },
  { id: "blue", name: "Blue", value: "#1578ff" },
];

const BASE_PRODUCTS = [
  {
    id: "pull-up-rogue",
    name: "Pull Up Bar Rogue Style",
    category: "bars",
    price: 55,
    unit: "fixed",
    priceLabel: "55 JOD",
    description: "Heavy-duty wall training bar with a clean industrial look.",
    colorMode: "steel",
    shape: "pullup",
    defaults: { x: 49, y: 50, w: 230, h: 124, rotation: 0 },
  },
  {
    id: "ceiling-pull-up",
    name: "Ceiling Mounted Pull Up Bar",
    category: "bars",
    price: 75,
    unit: "fixed",
    priceLabel: "75 JOD",
    description: "Ceiling-mounted pull-up station for compact spaces.",
    colorMode: "steel",
    shape: "ceiling",
    defaults: { x: 50, y: 31, w: 250, h: 112, rotation: 0 },
  },
  {
    id: "zigzag-pull-up",
    name: "Zigzag Pull Up Bar",
    category: "bars",
    price: 80,
    unit: "fixed",
    priceLabel: "80 JOD",
    description: "Angled multi-grip pull-up bar for premium wall setups.",
    colorMode: "steel",
    shape: "zigzag",
    defaults: { x: 50, y: 42, w: 260, h: 120, rotation: 0 },
  },
  {
    id: "wall-dip-bar",
    name: "Wall Mounted Dip Bar",
    category: "bars",
    price: 60,
    unit: "fixed",
    priceLabel: "60 JOD",
    description: "Compact dip station built for strength work at home.",
    colorMode: "steel",
    shape: "dip",
    defaults: { x: 63, y: 55, w: 190, h: 125, rotation: 0 },
  },
  {
    id: "parallels",
    name: "Parallels",
    category: "accessories",
    price: 75,
    unit: "fixed",
    priceLabel: "75 JOD",
    description: "Stable steel parallels for handstands and control work.",
    colorMode: "steel",
    shape: "parallels",
    defaults: { x: 52, y: 73, w: 210, h: 88, rotation: 0 },
  },
  {
    id: "push-parallels",
    name: "Push Parallels",
    category: "accessories",
    price: 50,
    unit: "fixed",
    priceLabel: "50 JOD",
    description: "Portable low bars with custom color options.",
    colorMode: "steel",
    shape: "push",
    defaults: { x: 43, y: 77, w: 190, h: 78, rotation: 0 },
  },
  {
    id: "monkey-bars",
    name: "Monkey Bar (2m)",
    category: "bars",
    price: 140,
    unit: "fixed",
    priceLabel: "From 140 JOD",
    description: "Two-meter monkey bar section for skill and grip training.",
    colorMode: "steel",
    shape: "monkey",
    defaults: { x: 51, y: 34, w: 300, h: 120, rotation: 0 },
  },
  {
    id: "monkey-bars-3m",
    name: "Monkey Bar (3m)",
    category: "bars",
    price: 170,
    unit: "fixed",
    priceLabel: "170 JOD",
    description: "Longer monkey bar span for a full training lane.",
    colorMode: "steel",
    shape: "monkey",
    defaults: { x: 51, y: 34, w: 350, h: 130, rotation: 0 },
  },
  {
    id: "ceiling-monkey-bar",
    name: "Ceiling Mounted Monkey Bar",
    category: "bars",
    price: 35,
    unit: "fixed",
    priceLabel: "35 JOD per piece",
    description: "Ceiling-mounted modular monkey-bar segment.",
    colorMode: "steel",
    shape: "ceilingMonkey",
    defaults: { x: 50, y: 27, w: 280, h: 120, rotation: 0 },
  },
  {
    id: "squat-rack",
    name: "Squat Rack",
    category: "racks",
    price: 400,
    unit: "fixed",
    priceLabel: "400 JOD",
    description: "Premium rack system with live color configuration.",
    colorMode: "steel",
    shape: "rack",
    defaults: { x: 51, y: 55, w: 275, h: 225, rotation: 0 },
  },
  {
    id: "multi-rack",
    name: "Multi-Purpose Calisthenics Rack",
    category: "racks",
    price: 220,
    unit: "fixed",
    priceLabel: "220 JOD",
    description: "All-around rack for pull-ups, dips, rings, and accessories.",
    colorMode: "steel",
    shape: "multiRack",
    defaults: { x: 53, y: 55, w: 280, h: 220, rotation: 0 },
  },
  {
    id: "bar-holder",
    name: "Bar Holder",
    category: "racks",
    price: 35,
    unit: "fixed",
    priceLabel: "35 JOD",
    description: "Wall-mounted holder for bars and attachments.",
    colorMode: "steel",
    shape: "holder",
    defaults: { x: 71, y: 56, w: 120, h: 130, rotation: 0 },
  },
  {
    id: "chalk-plate-holder",
    name: "Chalk Plate Holder",
    category: "racks",
    price: 35,
    unit: "fixed",
    priceLabel: "35 JOD",
    description: "Compact wall storage for chalk bowl or plate accessories.",
    colorMode: "steel",
    shape: "chalkPlate",
    defaults: { x: 36, y: 58, w: 130, h: 115, rotation: 0 },
  },
  {
    id: "rings-holder",
    name: "Rings Holder",
    category: "racks",
    price: 40,
    unit: "fixed",
    priceLabel: "40 JOD",
    description: "Dedicated black or white mount for hanging wooden rings.",
    colorMode: "blackWhite",
    shape: "ringsHolder",
    defaults: { x: 53, y: 35, w: 190, h: 90, rotation: 0 },
  },
  {
    id: "rings",
    name: "Wooden Rings",
    category: "accessories",
    price: 40,
    unit: "fixed",
    priceLabel: "40 JOD",
    description: "Wooden rings with clean hanging straps.",
    colorMode: "blackWhite",
    shape: "rings",
    defaults: { x: 54, y: 45, w: 150, h: 185, rotation: 0 },
  },
  {
    id: "rubber-bands",
    name: "Rubber Bands",
    category: "accessories",
    price: 10,
    unit: "fixed",
    priceLabel: "10 JOD",
    description: "Resistance bands for warmups, assistance, and mobility.",
    colorMode: "steel",
    shape: "bands",
    defaults: { x: 73, y: 55, w: 145, h: 140, rotation: 0 },
  },
  {
    id: "chalk",
    name: "Chalk",
    category: "accessories",
    price: 5,
    unit: "fixed",
    priceLabel: "5 JOD",
    description: "Training chalk for grip-heavy sessions.",
    colorMode: "blackOnly",
    shape: "chalk",
    defaults: { x: 30, y: 80, w: 95, h: 70, rotation: 0 },
  },
  {
    id: "anti-slip-tape",
    name: "Anti-Slip Tape",
    category: "accessories",
    price: 2,
    unit: "fixed",
    priceLabel: "2 JOD per piece",
    description: "Grip tape for added confidence on key contact points.",
    colorMode: "blackOnly",
    shape: "tape",
    defaults: { x: 78, y: 82, w: 105, h: 75, rotation: 0 },
  },
  {
    id: "dumbbells",
    name: "Dumbbells",
    category: "weights",
    price: 3.25,
    unit: "kg",
    priceLabel: "3.25 JOD/kg",
    description: "Custom-weight dumbbells for home strength training.",
    colorMode: "blackOnly",
    shape: "dumbbells",
    defaults: { x: 35, y: 80, w: 170, h: 72, rotation: 0, weight: 10 },
  },
  {
    id: "kettlebells",
    name: "Kettlebells",
    category: "weights",
    price: 4,
    unit: "kg",
    priceLabel: "4 JOD/kg",
    description: "Powder-coated kettlebells with custom weight selection.",
    colorMode: "blackOnly",
    shape: "kettlebells",
    defaults: { x: 68, y: 80, w: 160, h: 92, rotation: 0, weight: 12 },
  },
  {
    id: "weight-plates",
    name: "CrossFit Plates",
    category: "weights",
    price: 4.25,
    unit: "kg",
    priceLabel: "4.25 JOD/kg",
    description: "CrossFit-style plates priced by kilogram.",
    colorMode: "blackOnly",
    shape: "plates",
    defaults: { x: 76, y: 70, w: 155, h: 150, rotation: 0, weight: 20 },
  },
  {
    id: "kettlebell-rack",
    name: "Kettlebell Rack",
    category: "weights",
    price: 220,
    unit: "fixed",
    priceLabel: "220 JOD",
    description: "Three-row rack for clean kettlebell organization.",
    colorMode: "blackOnly",
    shape: "weightRack",
    defaults: { x: 67, y: 73, w: 235, h: 120, rotation: 0 },
  },
  {
    id: "dumbbell-rack",
    name: "Dumbbell Rack",
    category: "weights",
    price: 200,
    unit: "fixed",
    priceLabel: "200 JOD",
    description: "Premium dumbbell rack for organized home gym storage.",
    colorMode: "blackOnly",
    shape: "dumbbellRack",
    defaults: { x: 35, y: 73, w: 235, h: 120, rotation: 0 },
  },
  {
    id: "rubber-tiles",
    name: "Rubber Tiles",
    category: "flooring",
    price: 25,
    unit: "m2",
    priceLabel: "25 JOD/m²",
    description: "Premium rubber flooring tiles with live area preview.",
    colorMode: "all",
    shape: "flooring",
    floorType: "rubber-tiles",
  },
  {
    id: "foam-interlock",
    name: "Foam Interlock",
    category: "flooring",
    price: 18,
    unit: "m2",
    priceLabel: "18 JOD/m²",
    description: "Lightweight interlocking foam with instant floor preview.",
    colorMode: "all",
    shape: "flooring",
    floorType: "foam-interlock",
  },
  {
    id: "floor-mats",
    name: "Floor Mats",
    category: "flooring",
    price: 50,
    unit: "fixed",
    priceLabel: "50 JOD",
    description: "Mat setup for compact training corners.",
    colorMode: "all",
    shape: "flooring",
    floorType: "floor-mats",
  },
];

const SVG_SHAPES = {
  rack: `
    <svg viewBox="0 0 240 200" role="img" aria-label="Squat rack shape">
      <defs><linearGradient id="glossRack" x1="0" y1="0" x2="1" y2="1"><stop stop-color="rgba(255,255,255,.38)"/><stop offset=".35" stop-color="currentColor"/><stop offset="1" stop-color="rgba(0,0,0,.45)"/></linearGradient></defs>
      <g fill="none" stroke="url(#glossRack)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48 184V24M192 184V24M48 34h144M62 92h116M72 184h-42M168 184h42M43 58h18M179 58h18M43 132h18M179 132h18"/>
      </g>
      <g fill="rgba(0,0,0,.6)"><circle cx="48" cy="54" r="3"/><circle cx="48" cy="76" r="3"/><circle cx="48" cy="98" r="3"/><circle cx="48" cy="120" r="3"/><circle cx="192" cy="54" r="3"/><circle cx="192" cy="76" r="3"/><circle cx="192" cy="98" r="3"/><circle cx="192" cy="120" r="3"/></g>
    </svg>`,
  multiRack: `
    <svg viewBox="0 0 250 205" role="img" aria-label="Multi purpose rack shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M38 190V30M212 190V30M38 42h174M56 82h138M62 190h-38M188 190h38M70 42v88M180 42v88M80 130h90"/>
        <path d="M84 132c-16 6-27 17-30 36M166 132c16 6 27 17 30 36" opacity=".85"/>
      </g>
      <g stroke="rgba(255,255,255,.38)" stroke-width="2"><path d="M44 34h162M44 46h162"/></g>
    </svg>`,
  pullup: `
    <svg viewBox="0 0 230 120" role="img" aria-label="Pull up bar shape">
      <g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M28 98V32M202 98V32M28 36h174M66 36v34M164 36v34M56 72h118"/>
        <path d="M22 98h42M166 98h42"/>
      </g>
      <g fill="rgba(0,0,0,.48)"><circle cx="28" cy="52" r="3"/><circle cx="202" cy="52" r="3"/></g>
    </svg>`,
  ceiling: `
    <svg viewBox="0 0 250 120" role="img" aria-label="Ceiling pull up bar shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M38 20h174M54 20v50M196 20v50M54 70h142M84 70v28M166 70v28M78 98h96"/>
      </g>
      <g fill="currentColor" opacity=".9"><rect x="28" y="11" width="52" height="12" rx="3"/><rect x="170" y="11" width="52" height="12" rx="3"/></g>
    </svg>`,
  zigzag: `
    <svg viewBox="0 0 260 120" role="img" aria-label="Zigzag pull up bar shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M26 92V36M234 92V36M26 42h42l20 18 24-18 22 18 24-18 20 18 24-18h32"/>
        <path d="M18 92h42M200 92h42M54 42v30M206 42v30"/>
      </g>
    </svg>`,
  ceilingMonkey: `
    <svg viewBox="0 0 280 122" role="img" aria-label="Ceiling monkey bar shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M34 22h212M48 22v70M232 22v70M48 92h184M78 42v50M110 42v50M142 42v50M174 42v50M206 42v50"/>
      </g>
      <g fill="currentColor"><rect x="22" y="12" width="56" height="13" rx="3"/><rect x="202" y="12" width="56" height="13" rx="3"/></g>
    </svg>`,
  dip: `
    <svg viewBox="0 0 190 130" role="img" aria-label="Wall mounted dip bar shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M35 28v84M155 28v84M35 44h120M35 86h120M55 86l30 32M135 86l-30 32"/>
        <path d="M18 28h34M138 28h34"/>
      </g>
    </svg>`,
  parallels: `
    <svg viewBox="0 0 220 95" role="img" aria-label="Parallels shape">
      <g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M30 66h68M122 66h68M42 66v-34M86 66v-34M134 66v-34M178 66v-34M42 32h44M134 32h44"/>
        <path d="M20 80h88M112 80h88"/>
      </g>
    </svg>`,
  push: `
    <svg viewBox="0 0 210 90" role="img" aria-label="Push parallels shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M36 62v-26h50v26M124 62v-26h50v26M24 62h74M112 62h74"/>
        <path d="M42 36c4-10 36-10 40 0M130 36c4-10 36-10 40 0" opacity=".72"/>
      </g>
    </svg>`,
  monkey: `
    <svg viewBox="0 0 300 125" role="img" aria-label="Monkey bars shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 32h236M32 86h236M48 32v54M86 32v54M124 32v54M162 32v54M200 32v54M238 32v54"/>
        <path d="M32 32l-16 20M268 32l16 20M32 86l-16 20M268 86l16 20" opacity=".78"/>
      </g>
    </svg>`,
  rings: `
    <svg viewBox="0 0 150 190" role="img" aria-label="Rings shape">
      <g fill="none" stroke="rgba(0,0,0,.72)" stroke-width="5" stroke-linecap="round">
        <path d="M48 12v86M102 12v86"/>
      </g>
      <g fill="none" stroke="currentColor" stroke-width="10">
        <circle cx="48" cy="126" r="28"/>
        <circle cx="102" cy="126" r="28"/>
      </g>
      <path d="M38 12h74" stroke="currentColor" stroke-width="8" stroke-linecap="round"/>
    </svg>`,
  holder: `
    <svg viewBox="0 0 130 130" role="img" aria-label="Bar holder shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M38 20v90M92 20v90M38 38h54M38 70h54M38 102h54"/>
        <path d="M38 44l-24 14M92 44l24 14M38 76l-24 14M92 76l24 14"/>
      </g>
    </svg>`,
  chalkPlate: `
    <svg viewBox="0 0 140 120" role="img" aria-label="Chalk plate holder shape">
      <g fill="currentColor" stroke="rgba(255,255,255,.24)" stroke-width="3">
        <rect x="42" y="18" width="56" height="82" rx="7"/>
        <path d="M28 74h84v16H28z"/>
        <circle cx="70" cy="45" r="10" fill="rgba(0,0,0,.48)"/>
      </g>
    </svg>`,
  ringsHolder: `
    <svg viewBox="0 0 190 90" role="img" aria-label="Rings holder shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 22h142M44 22v44M146 22v44M44 66h102"/>
        <path d="M70 66c-10 8-16 14-18 22M120 66c10 8 16 14 18 22" opacity=".72"/>
      </g>
    </svg>`,
  bands: `
    <svg viewBox="0 0 145 145" role="img" aria-label="Rubber bands shape">
      <g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round">
        <path d="M38 22c-18 18-18 84 0 102c18-18 18-84 0-102z"/>
        <path d="M72 22c-18 18-18 84 0 102c18-18 18-84 0-102z" opacity=".85"/>
        <path d="M106 22c-18 18-18 84 0 102c18-18 18-84 0-102z" opacity=".7"/>
      </g>
    </svg>`,
  chalk: `
    <svg viewBox="0 0 100 75" role="img" aria-label="Chalk block shape">
      <g fill="currentColor" stroke="rgba(0,0,0,.25)" stroke-width="2">
        <path d="M18 52 28 18h54l-10 34z"/>
        <path d="M18 52h54l11 12H29z" opacity=".7"/>
        <path d="M72 52 82 18l11 12-10 34z" opacity=".55"/>
      </g>
    </svg>`,
  tape: `
    <svg viewBox="0 0 110 80" role="img" aria-label="Anti slip tape shape">
      <g fill="currentColor" stroke="rgba(255,255,255,.24)" stroke-width="3">
        <circle cx="55" cy="40" r="30"/>
        <circle cx="55" cy="40" r="14" fill="rgba(0,0,0,.5)"/>
        <path d="M72 25h24v18H72z" opacity=".85"/>
      </g>
    </svg>`,
  dumbbells: `
    <svg viewBox="0 0 180 78" role="img" aria-label="Dumbbells shape">
      <g fill="currentColor" stroke="rgba(255,255,255,.26)" stroke-width="2">
        <rect x="12" y="22" width="22" height="34" rx="5"/>
        <rect x="34" y="18" width="22" height="42" rx="5"/>
        <rect x="124" y="18" width="22" height="42" rx="5"/>
        <rect x="146" y="22" width="22" height="34" rx="5"/>
        <rect x="52" y="34" width="76" height="10" rx="5"/>
      </g>
    </svg>`,
  kettlebells: `
    <svg viewBox="0 0 170 110" role="img" aria-label="Kettlebells shape">
      <g fill="currentColor" stroke="rgba(255,255,255,.26)" stroke-width="2">
        <path d="M37 44c0-20 13-32 31-32s31 12 31 32h-16c0-10-5-17-15-17s-15 7-15 17z"/>
        <path d="M28 55c0-16 12-26 40-26s40 10 40 26v21c0 16-14 24-40 24s-40-8-40-24z"/>
        <path d="M105 55c0-18 12-28 28-28s28 10 28 28v20c0 17-11 26-28 26s-28-9-28-26z"/>
        <path d="M118 47c0-17 6-27 15-27s15 10 15 27h-10c0-9-1-15-5-15s-5 6-5 15z"/>
      </g>
    </svg>`,
  plates: `
    <svg viewBox="0 0 160 160" role="img" aria-label="Weight plates shape">
      <g fill="currentColor" stroke="rgba(255,255,255,.25)" stroke-width="3">
        <circle cx="80" cy="80" r="60"/>
        <circle cx="80" cy="80" r="23" fill="rgba(0,0,0,.55)"/>
        <circle cx="116" cy="94" r="35" opacity=".9"/>
        <circle cx="116" cy="94" r="13" fill="rgba(0,0,0,.55)"/>
      </g>
    </svg>`,
  weightRack: `
    <svg viewBox="0 0 240 125" role="img" aria-label="Kettlebell rack shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M26 96h188M40 56h160M54 96l-18 22M190 96l18 22M48 56l-12 40M192 56l12 40"/>
      </g>
      <g fill="currentColor" stroke="rgba(255,255,255,.22)" stroke-width="2">
        <path d="M56 50c0-14 8-24 20-24s20 10 20 24H84c0-7-2-11-8-11s-8 4-8 11z"/>
        <path d="M48 63c0-13 8-20 28-20s28 7 28 20v14c0 13-10 19-28 19s-28-6-28-19z"/>
        <path d="M126 50c0-14 8-24 20-24s20 10 20 24h-12c0-7-2-11-8-11s-8 4-8 11z"/>
        <path d="M118 63c0-13 8-20 28-20s28 7 28 20v14c0 13-10 19-28 19s-28-6-28-19z"/>
      </g>
    </svg>`,
  dumbbellRack: `
    <svg viewBox="0 0 240 125" role="img" aria-label="Dumbbell rack shape">
      <g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M28 90h184M44 54h152M56 90l-22 28M184 90l22 28M48 54l-16 36M192 54l16 36"/>
      </g>
      <g fill="currentColor" stroke="rgba(255,255,255,.24)" stroke-width="2">
        <rect x="54" y="36" width="26" height="22" rx="4"/><rect x="86" y="36" width="26" height="22" rx="4"/><rect x="118" y="36" width="26" height="22" rx="4"/><rect x="150" y="36" width="26" height="22" rx="4"/>
        <rect x="64" y="73" width="26" height="22" rx="4"/><rect x="96" y="73" width="26" height="22" rx="4"/><rect x="128" y="73" width="26" height="22" rx="4"/>
      </g>
    </svg>`,
  flooring: `
    <svg viewBox="0 0 210 120" role="img" aria-label="Flooring shape">
      <g fill="currentColor" stroke="rgba(255,255,255,.32)" stroke-width="3">
        <path d="M18 88 52 32h124l18 56z"/>
        <path d="M52 32v56M88 32v56M124 32v56M160 32v56M34 62h152"/>
      </g>
    </svg>`,
};

let customProducts = loadJSON(STORAGE_KEYS.customProducts, []);
let customColors = loadJSON(STORAGE_KEYS.customColors, []);
let priceOverrides = loadJSON(STORAGE_KEYS.priceOverrides, {});

const state = {
  items: [],
  activeId: null,
  floor: {
    enabled: false,
    type: "rubber-tiles",
    color: "black",
    area: 12,
  },
  camera: {
    rotate: 0,
    zoom: 100,
  },
};

const els = {};

document.addEventListener("DOMContentLoaded", () => {
  cacheElements();
  hydrateSharedSetup();
  setupNavigation();
  setupRevealAnimation();
  setupFilters();
  setupImageMode();
  setupBuilderActions();
  setupCameraControls();
  setupFloorControls();
  setupConfigLinks();
  renderAll();
});

function cacheElements() {
  els.header = document.querySelector("[data-header]");
  els.menuToggle = document.querySelector("[data-menu-toggle]");
  els.nav = document.querySelector("[data-nav]");
  els.productGrid = document.getElementById("productGrid");
  els.equipmentPalette = document.getElementById("equipmentPalette");
  els.placementLayer = document.getElementById("placementLayer");
  els.roomShell = document.getElementById("roomShell");
  els.emptyState = document.getElementById("emptyState");
  els.activeEditor = document.getElementById("activeEditor");
  els.floorOverlay = document.getElementById("floorOverlay");
  els.floorType = document.getElementById("floorType");
  els.floorArea = document.getElementById("floorArea");
  els.floorAreaLabel = document.getElementById("floorAreaLabel");
  els.floorColors = document.getElementById("floorColors");
  els.floorToggle = document.getElementById("floorToggle");
  els.cameraRotate = document.getElementById("cameraRotate");
  els.cameraZoom = document.getElementById("cameraZoom");
  els.summaryList = document.getElementById("summaryList");
  els.totalCost = document.getElementById("totalCost");
  els.toast = document.getElementById("toast");
  els.pricingProduct = document.getElementById("pricingProduct");
  els.pricingValue = document.getElementById("pricingValue");
  els.checkoutForm = document.getElementById("checkoutForm");
  els.checkoutSummary = document.getElementById("checkoutSummary");
  els.checkoutTotal = document.getElementById("checkoutTotal");
  els.confirmationPanel = document.getElementById("confirmationPanel");
  els.confirmationOrderNumber = document.getElementById("confirmationOrderNumber");
  els.ordersTable = document.getElementById("ordersTable");
}

function setupNavigation() {
  window.addEventListener("scroll", () => {
    els.header.classList.toggle("is-scrolled", window.scrollY > 12);
  });

  els.menuToggle.addEventListener("click", () => {
    els.menuToggle.classList.toggle("is-open");
    els.nav.classList.toggle("is-open");
  });

  els.nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      els.menuToggle.classList.remove("is-open");
      els.nav.classList.remove("is-open");
    }
  });
}

function setupRevealAnimation() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupFilters() {
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      renderProducts(button.dataset.filter);
    });
  });
}

function setupImageMode() {
  document.body.dataset.imageMode = "studio";
  document.querySelectorAll(".image-mode-toggle [data-image-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".image-mode-toggle [data-image-mode]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      document.body.dataset.imageMode = button.dataset.imageMode;
    });
  });
}

function setupBuilderActions() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;

    if (action === "reset") resetRoom();
    if (action === "save") saveSetup();
    if (action === "share") copyShareLink();
    if (action === "whatsapp") sendWhatsApp();
    if (action === "quote") requestQuote();
    if (action === "toggle-floor") toggleFloor();
    if (action === "duplicate-active") duplicateActiveItem();
    if (action === "open-checkout") openCheckout();
    if (action === "view-cart") window.location.href = "/cart";
  });

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      els.roomShell.dataset.view = button.dataset.view;
    });
  });
}

function setupCameraControls() {
  els.cameraRotate.addEventListener("input", () => {
    state.camera.rotate = Number(els.cameraRotate.value);
    applyCamera();
    persistBuilder();
  });

  els.cameraZoom.addEventListener("input", () => {
    state.camera.zoom = Number(els.cameraZoom.value);
    applyCamera();
    persistBuilder();
  });
}

function setupFloorControls() {
  els.floorType.addEventListener("change", () => {
    state.floor.enabled = true;
    state.floor.type = els.floorType.value;
    renderFloor();
    renderSummary();
    persistBuilder();
  });

  els.floorArea.addEventListener("input", () => {
    state.floor.enabled = true;
    state.floor.area = Number(els.floorArea.value);
    renderFloor();
    renderSummary();
    persistBuilder();
  });
}

function setupConfigLinks() {
  const config = window.THREEOGLEH_CONFIG || {};
  const whatsapp = config.whatsappNumber || "962798125254";
  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = `https://wa.me/${whatsapp}`;
  });
}


function renderAll() {
  renderProducts(getActiveFilter());
  renderPalette();
  renderFloorColors();
  renderFloor();
  applyCamera();
  renderRoom();
  renderActiveEditor();
  renderSummary();
}

function renderProducts(filter = "all") {
  const products = catalog().filter((product) => filter === "all" || product.category === filter);

  els.productGrid.innerHTML = products
    .map((product) => {
      const colors = allowedColors(product);
      const activeColor = colors[0] || "black";
      const isFloor = product.category === "flooring";

      return `
        <article class="product-card reveal is-visible" data-product-card="${escapeAttr(product.id)}" style="--live-color:${colorValue(activeColor)}">
          <div class="product-art" data-product-category="${escapeAttr(product.category)}">
            <div class="studio-surface" aria-hidden="true"></div>
            <img class="product-photo product-photo-studio" src="${productImage(product, "studio")}" alt="${escapeAttr(product.name)} studio product photo" loading="lazy" />
            <img class="product-photo product-photo-lifestyle" src="${productImage(product, "lifestyle")}" alt="${escapeAttr(product.name)} lifestyle gym photo" loading="lazy" />
          </div>
          <div class="product-body">
            <div>
              <div class="product-meta">
                <span>${labelForCategory(product.category)}</span>
                <span class="product-price">${formatPriceLabel(product)}</span>
              </div>
              <h3>${escapeHTML(product.name)}</h3>
              <p>${escapeHTML(product.description)}</p>
            </div>
            <div class="color-row" aria-label="${escapeAttr(product.name)} colors">
              ${colors
                .map(
                  (colorId) => `
                    <button
                      type="button"
                      class="color-dot ${colorId === activeColor ? "is-active" : ""}"
                      title="${escapeAttr(colorName(colorId))}"
                      aria-label="${escapeAttr(colorName(colorId))}"
                      data-product-color="${escapeAttr(product.id)}"
                      data-color="${escapeAttr(colorId)}"
                      style="--swatch-color:${colorValue(colorId)}"
                    ></button>
                  `,
                )
                .join("")}
            </div>
            <div class="product-actions">
              <button class="button ${isFloor ? "button-light" : "button-dark"}" type="button" data-add-product="${escapeAttr(product.id)}">
                ${isFloor ? "Configure floor" : "Add to Builder"}
              </button>
              <button class="button button-primary" type="button" data-cart-product="${escapeAttr(product.id)}">
                Add to cart
              </button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");

  els.productGrid.querySelectorAll("[data-product-color]").forEach((button) => {
    button.addEventListener("click", () => {
      syncProductCardColor(button.dataset.productColor, button.dataset.color);
    });
  });

  els.productGrid.querySelectorAll("[data-add-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = findProduct(button.dataset.addProduct);
      if (!product) return;

      if (product.category === "flooring") {
        state.floor.enabled = true;
        state.floor.type = product.floorType || product.id;
        els.floorType.value = state.floor.type;
        syncProductCardColor(product.id, state.floor.color);
        renderFloor();
        renderSummary();
        persistBuilder();
        scrollToBuilder();
        showToast(`${product.name} added to the room floor.`);
        return;
      }

      const card = document.querySelector(`[data-product-card="${CSS.escape(product.id)}"]`);
      const color = card?.dataset.selectedColor || allowedColors(product)[0] || "black";
      addProduct(product.id, color);
      scrollToBuilder();
    });
  });

  els.productGrid.querySelectorAll("[data-cart-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const product = findProduct(button.dataset.cartProduct);
      if (!product) return;

      const card = document.querySelector(`[data-product-card="${CSS.escape(product.id)}"]`);
      const activeColor = card?.querySelector(".color-dot.is-active")?.dataset.color || allowedColors(product)[0] || "black";
      addProductToCart(product, activeColor);
      showToast(`${product.name} added to cart.`);
    });
  });
}

function renderPalette() {
  const products = catalog().filter((product) => product.category !== "flooring");

  els.equipmentPalette.innerHTML = products
    .map(
      (product) => `
        <div class="palette-item">
          <div>
            <strong>${escapeHTML(product.name)}</strong>
            <span>${formatPriceLabel(product)}</span>
          </div>
          <button class="icon-button" type="button" aria-label="Add ${escapeAttr(product.name)}" data-palette-add="${escapeAttr(product.id)}">+</button>
        </div>
      `,
    )
    .join("");

  els.equipmentPalette.querySelectorAll("[data-palette-add]").forEach((button) => {
    button.addEventListener("click", () => addProduct(button.dataset.paletteAdd));
  });
}

function renderFloorColors() {
  els.floorColors.innerHTML = allColors()
    .map(
      (color) => `
        <button
          type="button"
          class="swatch ${state.floor.color === color.id ? "is-active" : ""}"
          title="${escapeAttr(color.name)}"
          aria-label="${escapeAttr(color.name)}"
          data-floor-color="${escapeAttr(color.id)}"
          style="--swatch-color:${color.value}"
        ></button>
      `,
    )
    .join("");

  els.floorColors.querySelectorAll("[data-floor-color]").forEach((button) => {
    button.addEventListener("click", () => {
      state.floor.enabled = true;
      state.floor.color = button.dataset.floorColor;
      renderFloorColors();
      renderFloor();
      renderSummary();
      persistBuilder();
    });
  });
}

function renderFloor() {
  els.floorType.value = state.floor.type;
  els.floorArea.value = state.floor.area;
  els.floorAreaLabel.textContent = `${state.floor.area} m²`;
  els.floorOverlay.dataset.type = state.floor.type;
  els.floorOverlay.style.setProperty("--floor-color", state.floor.enabled ? colorValue(state.floor.color) : "rgba(0,0,0,0)");
  els.floorOverlay.style.setProperty("--floor-depth", state.floor.enabled ? `${Math.min(48, 18 + state.floor.area * 1.15)}%` : "0%");
  els.floorOverlay.style.opacity = state.floor.enabled ? "0.88" : "0";
  els.floorToggle.textContent = state.floor.enabled ? "Remove flooring" : "Add flooring to room";
}

function applyCamera() {
  els.cameraRotate.value = state.camera.rotate;
  els.cameraZoom.value = state.camera.zoom;
  els.roomShell.style.setProperty("--camera-rotate", `${state.camera.rotate}deg`);
  els.roomShell.style.setProperty("--camera-zoom", state.camera.zoom / 100);
}

function renderRoom() {
  els.placementLayer.innerHTML = state.items
    .map((item) => {
      const product = findProduct(item.productId);
      if (!product) return "";

      return `
        <div
          class="visual-item ${state.activeId === item.id ? "is-active" : ""}"
          data-item-id="${escapeAttr(item.id)}"
          style="--x:${item.x};--y:${item.y};--rotation:${item.rotation};--w:${item.w}px;--h:${item.h}px;--item-color:${colorValue(item.color)};--depth:${item.y}"
          aria-label="${escapeAttr(product.name)} placed in room"
          role="button"
          tabindex="0"
        >${shapeMarkup(product.shape)}</div>
      `;
    })
    .join("");

  els.emptyState.classList.toggle("is-hidden", state.items.length > 0 || state.floor.enabled);

  els.placementLayer.querySelectorAll(".visual-item").forEach((node) => {
    node.addEventListener("pointerdown", startDrag);
    node.addEventListener("click", () => selectItem(node.dataset.itemId));
    node.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectItem(node.dataset.itemId);
      }
    });
  });
}

function renderActiveEditor() {
  const item = activeItem();
  if (!item) {
    els.activeEditor.innerHTML = `
      <span class="panel-kicker">Selected Item</span>
      <div class="editor-empty">Select or add equipment to edit position, rotation, quantity, and color.</div>
    `;
    return;
  }

  const product = findProduct(item.productId);
  const colors = allowedColors(product);
  const weightField =
    product.unit === "kg"
      ? `
        <label>
          Kilograms
          <input id="itemWeight" type="number" min="1" step="1" value="${item.weight || product.defaults.weight || 10}" />
        </label>
      `
      : "";

  els.activeEditor.innerHTML = `
    <span class="panel-kicker">Selected Item</span>
    <div class="editor-title">
      <div>
        <strong>${escapeHTML(product.name)}</strong>
        <span>${formatPriceLabel(product)}</span>
      </div>
      <div class="editor-actions">
        <button class="remove-link" type="button" data-action="duplicate-active">Duplicate</button>
        <button class="remove-link" type="button" data-remove-active>Remove</button>
      </div>
    </div>
    <div class="field-grid">
      <label>
        Quantity
        <input id="itemQty" type="number" min="1" value="${item.qty}" />
      </label>
      ${weightField}
      <label>
        Position X
        <input id="itemX" type="range" min="8" max="92" value="${item.x}" />
      </label>
      <label>
        Position Y
        <input id="itemY" type="range" min="20" max="88" value="${item.y}" />
      </label>
      <label>
        Rotate
        <input id="itemRotation" type="range" min="-45" max="45" value="${item.rotation}" />
      </label>
    </div>
    <div class="swatch-row" aria-label="${escapeAttr(product.name)} color choices">
      ${colors
        .map(
          (colorId) => `
            <button
              type="button"
              class="swatch ${item.color === colorId ? "is-active" : ""}"
              title="${escapeAttr(colorName(colorId))}"
              aria-label="${escapeAttr(colorName(colorId))}"
              data-item-color="${escapeAttr(colorId)}"
              style="--swatch-color:${colorValue(colorId)}"
            ></button>
          `,
        )
        .join("")}
    </div>
  `;

  bindEditorControls(item, product);
}

function bindEditorControls(item, product) {
  const updateNumber = (id, key, mapper = Number) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("input", () => {
      item[key] = mapper(input.value);
      updateItemNode(item);
      renderSummary();
      persistBuilder();
    });
  };

  updateNumber("itemQty", "qty", (value) => Math.max(1, Number(value)));
  updateNumber("itemWeight", "weight", (value) => Math.max(1, Number(value)));
  updateNumber("itemX", "x");
  updateNumber("itemY", "y");
  updateNumber("itemRotation", "rotation");

  els.activeEditor.querySelector("[data-remove-active]").addEventListener("click", () => removeActiveItem());

  els.activeEditor.querySelectorAll("[data-item-color]").forEach((button) => {
    button.addEventListener("click", () => {
      item.color = button.dataset.itemColor;
      syncProductCardColor(product.id, item.color);
      renderActiveEditor();
      updateItemNode(item);
      renderSummary();
      persistBuilder();
    });
  });
}

function renderSummary() {
  const rows = [];

  state.items.forEach((item) => {
    const product = findProduct(item.productId);
    if (!product) return;
    const line = lineTotal(item, product);
    const unit = product.unit === "kg" ? `${formatMoney(productPrice(product))}/kg × ${item.weight || product.defaults.weight || 10}kg` : formatMoney(productPrice(product));

    rows.push(`
      <div class="summary-row">
        <div class="summary-detail">
          <strong>${escapeHTML(product.name)}</strong>
          <span>Qty ${item.qty} · ${colorName(item.color)} · ${unit}</span>
        </div>
        <strong>${formatMoney(line)}</strong>
      </div>
    `);
  });

  if (state.floor.enabled) {
    const floorProduct = findProduct(state.floor.type);
    const line = floorTotal();
    const detail = floorProduct.unit === "m2" ? `${state.floor.area} m² · ${colorName(state.floor.color)}` : `${colorName(state.floor.color)} · area preview ${state.floor.area} m²`;

    rows.push(`
      <div class="summary-row">
        <div class="summary-detail">
          <strong>${escapeHTML(floorProduct.name)}</strong>
          <span>${detail}</span>
        </div>
        <strong>${formatMoney(line)}</strong>
      </div>
    `);
  }

  els.summaryList.innerHTML = rows.length ? rows.join("") : `<div class="summary-empty">No products selected yet. Add equipment to see instant pricing.</div>`;
  els.totalCost.textContent = formatMoney(totalCost());
}




function addProduct(productId, preferredColor) {
  const product = findProduct(productId);
  if (!product || product.category === "flooring") return;

  const defaults = product.defaults || { x: 50, y: 55, w: 210, h: 140, rotation: 0 };
  const colors = allowedColors(product);
  const color = colors.includes(preferredColor) ? preferredColor : colors[0] || "black";
  const item = {
    id: `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    productId,
    qty: 1,
    color,
    x: defaults.x,
    y: defaults.y,
    w: defaults.w,
    h: defaults.h,
    rotation: defaults.rotation || 0,
    weight: defaults.weight || 0,
  };

  state.items.push(item);
  state.activeId = item.id;
  syncProductCardColor(product.id, color);
  renderRoom();
  renderActiveEditor();
  renderSummary();
  persistBuilder();
  showToast(`${product.name} added to the room.`);
}

function selectItem(itemId) {
  state.activeId = itemId;
  renderRoom();
  renderActiveEditor();
  const item = activeItem();
  if (item) {
    syncProductCardColor(item.productId, item.color);
  }
}

function removeActiveItem() {
  if (!state.activeId) return;
  state.items = state.items.filter((item) => item.id !== state.activeId);
  state.activeId = state.items[0]?.id || null;
  renderRoom();
  renderActiveEditor();
  renderSummary();
  persistBuilder();
  showToast("Equipment removed from the room.");
}

function duplicateActiveItem() {
  const item = activeItem();
  if (!item) return;

  const copy = {
    ...item,
    id: `item-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    x: clamp(item.x + 7, 8, 92),
    y: clamp(item.y + 3, 20, 88),
    rotation: clamp(item.rotation + 4, -45, 45),
  };

  state.items.push(copy);
  state.activeId = copy.id;
  renderRoom();
  renderActiveEditor();
  renderSummary();
  persistBuilder();
  showToast("Equipment duplicated in the room.");
}

function resetRoom() {
  state.items = [];
  state.activeId = null;
  state.floor.enabled = false;
  state.floor.type = "rubber-tiles";
  state.floor.color = "black";
  state.floor.area = 12;
  state.camera.rotate = 0;
  state.camera.zoom = 100;
  renderAll();
  persistBuilder();
  showToast("Room reset to an empty scene.");
}

function toggleFloor() {
  state.floor.enabled = !state.floor.enabled;
  renderFloor();
  renderSummary();
  persistBuilder();
  showToast(state.floor.enabled ? "Flooring added to the room." : "Flooring removed.");
}

let dragState = null;

function startDrag(event) {
  const node = event.currentTarget;
  const item = state.items.find((entry) => entry.id === node.dataset.itemId);
  if (!item) return;

  selectItem(item.id);
  node.setPointerCapture(event.pointerId);
  dragState = {
    item,
    node,
    rect: els.placementLayer.getBoundingClientRect(),
  };
  node.style.cursor = "grabbing";

  window.addEventListener("pointermove", onDragMove);
  window.addEventListener("pointerup", onDragEnd, { once: true });
}

function onDragMove(event) {
  if (!dragState) return;
  const { rect, item } = dragState;
  const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 8, 92);
  const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 20, 88);

  item.x = Math.round(x);
  item.y = Math.round(y);
  updateItemNode(item);
  updateEditorRanges(item);
}

function onDragEnd() {
  if (!dragState) return;
  dragState.node.style.cursor = "";
  dragState = null;
  window.removeEventListener("pointermove", onDragMove);
  renderSummary();
  persistBuilder();
}

function updateItemNode(item) {
  const node = els.placementLayer.querySelector(`[data-item-id="${CSS.escape(item.id)}"]`);
  if (!node) return;
  node.style.setProperty("--x", item.x);
  node.style.setProperty("--y", item.y);
  node.style.setProperty("--rotation", item.rotation);
  node.style.setProperty("--item-color", colorValue(item.color));
  node.style.setProperty("--depth", item.y);
}

function updateEditorRanges(item) {
  const x = document.getElementById("itemX");
  const y = document.getElementById("itemY");
  if (x) x.value = item.x;
  if (y) y.value = item.y;
}

function saveSetup() {
  localStorage.setItem(STORAGE_KEYS.builderState, JSON.stringify(state));
  showToast("Setup saved in this browser.");
}

async function copyShareLink() {
  const link = shareLink();

  try {
    await navigator.clipboard.writeText(link);
    showToast("Unique share link copied.");
  } catch {
    window.prompt("Copy this setup link:", link);
  }
}

function sendWhatsApp() {
  const message = encodeURIComponent("Hello 3ogleh, I have a support question about building my home gym.");
  const whatsapp = window.THREEOGLEH_CONFIG?.whatsappNumber || "962798125254";
  window.open(`https://wa.me/${whatsapp}?text=${message}`, "_blank", "noopener,noreferrer");
}

function addProductToCart(product, color) {
  const items = cartItems();
  const weight = product.unit === "kg" ? product.defaults.weight || 10 : null;
  const area = product.unit === "m2" ? state.floor.area || 12 : null;
  const match = items.find((item) => (
    item.productId === product.id &&
    item.color === color &&
    Number(item.weight || 0) === Number(weight || 0) &&
    Number(item.area || 0) === Number(area || 0)
  ));

  if (match) {
    match.quantity += 1;
  } else {
    items.push({
      key: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId: product.id,
      color,
      quantity: 1,
      weight,
      area,
    });
  }

  saveCart(items);
  window.updateCartBadge?.();
}

function addBuilderToCart() {
  state.items.forEach((item) => {
    const product = findProduct(item.productId);
    if (!product) return;
    const items = cartItems();
    items.push({
      key: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      productId: product.id,
      color: item.color,
      quantity: item.qty,
      weight: product.unit === "kg" ? item.weight || product.defaults.weight || 10 : null,
      area: null,
    });
    saveCart(items);
  });

  if (state.floor.enabled) {
    const product = findProduct(state.floor.type);
    if (product) {
      const items = cartItems();
      items.push({
        key: `${product.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        productId: product.id,
        color: state.floor.color,
        quantity: 1,
        weight: null,
        area: product.unit === "m2" ? state.floor.area : null,
      });
      saveCart(items);
    }
  }
  window.updateCartBadge?.();
}

function cartItems() {
  return loadJSON(STORAGE_KEYS.cart, []);
}

function saveCart(items) {
  saveJSON(STORAGE_KEYS.cart, items);
}

function requestQuote() {
  openCheckout();
}

function openCheckout() {
  if (!orderLines().length) {
    showToast("Add equipment or flooring before checkout.");
    return;
  }
  addBuilderToCart();
  window.location.href = "/checkout";
}

function shareLink() {
  const encoded = encodeState({
    items: state.items,
    floor: state.floor,
    camera: state.camera,
  });
  return `${window.location.origin}${window.location.pathname}#setup=${encoded}`;
}

function plainSummary() {
  const lines = [];

  state.items.forEach((item) => {
    const product = findProduct(item.productId);
    if (!product) return;
    lines.push(`${product.name} - Qty ${item.qty} - ${colorName(item.color)} - ${formatMoney(lineTotal(item, product))}`);
  });

  if (state.floor.enabled) {
    const floorProduct = findProduct(state.floor.type);
    lines.push(`${floorProduct.name} - ${state.floor.area} m² - ${colorName(state.floor.color)} - ${formatMoney(floorTotal())}`);
  }

  lines.push(`Total: ${formatMoney(totalCost())}`);
  return lines.join("\n");
}

function orderLines() {
  const lines = [];

  state.items.forEach((item) => {
    const product = findProduct(item.productId);
    if (!product) return;
    const weight = product.unit === "kg" ? item.weight || product.defaults.weight || 1 : null;
    lines.push({
      id: product.id,
      name: product.name,
      qty: item.qty,
      color: colorName(item.color),
      unitPrice: productPrice(product),
      weight,
      detail: `Qty ${item.qty} · ${colorName(item.color)}${weight ? ` · ${weight}kg` : ""}`,
      total: lineTotal(item, product),
    });
  });

  if (state.floor.enabled) {
    const product = findProduct(state.floor.type);
    lines.push({
      id: product.id,
      name: product.name,
      qty: product.unit === "m2" ? state.floor.area : 1,
      color: colorName(state.floor.color),
      unitPrice: productPrice(product),
      area: state.floor.area,
      detail: product.unit === "m2" ? `${state.floor.area} m² · ${colorName(state.floor.color)}` : `${colorName(state.floor.color)} · ${state.floor.area} m² preview`,
      total: floorTotal(),
    });
  }

  return lines;
}



function hydrateSharedSetup() {
  const shared = window.location.hash.match(/setup=([^&]+)/);
  const saved = localStorage.getItem(STORAGE_KEYS.builderState);
  const source = shared ? decodeState(shared[1]) : safeParse(saved);

  if (!source) return;

  state.items = Array.isArray(source.items)
    ? source.items.filter((item) => findProduct(item.productId)).map((item) => ({ ...item }))
    : [];
  state.activeId = state.items[0]?.id || null;
  state.floor = {
    enabled: Boolean(source.floor?.enabled),
    type: source.floor?.type || "rubber-tiles",
    color: source.floor?.color || "black",
    area: Number(source.floor?.area || 12),
  };
  state.camera = {
    rotate: Number(source.camera?.rotate || 0),
    zoom: Number(source.camera?.zoom || 100),
  };
}

function persistBuilder() {
  localStorage.setItem(STORAGE_KEYS.builderState, JSON.stringify(state));
}

function syncProductCardColor(productId, colorId) {
  const card = document.querySelector(`[data-product-card="${CSS.escape(productId)}"]`);
  if (!card) return;

  card.dataset.selectedColor = colorId;
  card.style.setProperty("--live-color", colorValue(colorId));
  card.querySelectorAll("[data-color]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.color === colorId);
  });
}

function scrollToBuilder() {
  document.getElementById("builder").scrollIntoView({ behavior: "smooth", block: "start" });
}

function activeItem() {
  return state.items.find((item) => item.id === state.activeId);
}

function totalCost() {
  return state.items.reduce((sum, item) => {
    const product = findProduct(item.productId);
    return product ? sum + lineTotal(item, product) : sum;
  }, 0) + floorTotal();
}

function floorTotal() {
  if (!state.floor.enabled) return 0;
  const product = findProduct(state.floor.type);
  if (!product) return 0;
  return product.unit === "m2" ? productPrice(product) * state.floor.area : productPrice(product);
}

function lineTotal(item, product) {
  const price = productPrice(product);
  if (product.unit === "kg") {
    return price * (item.weight || product.defaults.weight || 1) * item.qty;
  }

  return price * item.qty;
}

function catalog() {
  return [...BASE_PRODUCTS, ...customProducts].map((product) => ({
    ...product,
    price: productPrice(product),
  }));
}

function findProduct(id) {
  return catalog().find((product) => product.id === id);
}

function productPrice(product) {
  return Number(priceOverrides[product.id] ?? product.price);
}

function allColors() {
  return [...BASE_COLORS, ...customColors];
}

function allowedColors(product) {
  if (!product) return ["black"];
  if (product.colorMode === "blackOnly") return ["black"];
  if (product.colorMode === "blackWhite") return ["black", "white"];
  return allColors().map((color) => color.id);
}

function colorValue(id) {
  return allColors().find((color) => color.id === id)?.value || "#050505";
}

function colorName(id) {
  return allColors().find((color) => color.id === id)?.name || "Black";
}

function labelForCategory(category) {
  return {
    bars: "Pull Up Bars",
    racks: "Racks",
    flooring: "Flooring",
    accessories: "Accessories",
    weights: "Weights",
  }[category] || "Equipment";
}

function formatPriceLabel(product) {
  const price = productPrice(product);
  if (product.unit === "kg") return `${formatMoney(price)}/kg`;
  if (product.unit === "m2") return `${formatMoney(price)}/m²`;
  if (product.priceLabel?.startsWith("From")) return `From ${formatMoney(price)}`;
  if (product.priceLabel?.includes("per piece")) return `${formatMoney(price)} per piece`;
  return formatMoney(price);
}

function formatMoney(value) {
  const number = Number(value);
  return `${Number.isInteger(number) ? number : number.toFixed(2)} JOD`;
}

function productImage(product, mode) {
  if (product.custom) return "assets/product-lineup.png";
  return `assets/products/${mode}/${product.id}.png`;
}

function shapeMarkup(shape) {
  return SVG_SHAPES[shape] || SVG_SHAPES.push;
}

function getActiveFilter() {
  return document.querySelector("[data-filter].is-active")?.dataset.filter || "all";
}

function uniqueProductId(name) {
  const base = slug(name) || "custom-equipment";
  let id = base;
  let index = 2;
  while (findProduct(id)) {
    id = `${base}-${index}`;
    index += 1;
  }
  return id;
}

function slug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function encodeState(value) {
  return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

function decodeState(value) {
  try {
    return JSON.parse(decodeURIComponent(escape(atob(value))));
  } catch {
    return null;
  }
}

function safeParse(value) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function loadJSON(key, fallback) {
  return safeParse(localStorage.getItem(key)) || fallback;
}

function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHTML(value);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    els.toast.classList.remove("is-visible");
  }, 2800);
}
