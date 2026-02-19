"use strict";

// ============================================
// STEP 1: Clear console dulu
// ============================================
const clearConsole = () => {
  process.stdout.write(
    process.platform === "win32"
      ? "\x1B[2J\x1B[0f"
      : "\x1B[2J\x1B[3J\x1B[H"
  );
};
clearConsole();

// ============================================
// STEP 2: Setup chalk biar aman
// ============================================
let chalk;
try {
  // Coba require chalk biasa
  chalk = require("chalk");
  // Kalo chalk versi 5+, dia punya .default
  if (chalk.default) chalk = chalk.default;
} catch (e) {
  // Fallback kalo chalk error
  chalk = { 
    hex: () => (str) => str,
    bold: (str) => str
  };
}

// ============================================
// STEP 3: Setup string-width biar aman
// ============================================
let stringWidth;
try {
  stringWidth = require("string-width").default || require("string-width");
} catch (e) {
  // Fallback kalo string-width error
  stringWidth = (str) => str.length;
}

// ============================================
// STEP 4: Fix global object buat ascii.js
// ============================================
// Ini triknya! Kita bikin global chalk dan stringWidth
// biar ascii.js bisa pake meskipun ada typo "chakalk"

// Simpan chalk asli
global.originalChalk = chalk;

// Bikin module chalk palsu tapi berfungsi
const mockChalk = new Proxy({}, {
  get: (target, prop) => {
    if (prop === 'default') return global.originalChalk;
    if (prop === 'hex') return global.originalChalk.hex || ((color) => (str) => str);
    return global.originalChalk[prop] || ((str) => str);
  }
});

// Simpan di global dengan nama "chakalk" (biar sesuai typo di ascii.js)
global.chakalk = mockChalk;

// Simpan string-width di global
global.stringWidth = stringWidth;

// Fallback buat require
const originalRequire = module.require;
module.require = function(id) {
  if (id === 'chakalk') return global.chakalk;
  if (id === 'string-width') return { default: global.stringWidth };
  return originalRequire.apply(this, arguments);
};

// ============================================
// STEP 5: Panggil ascii.js (TANPA ERROR)
// ============================================
try {
  // Cari lokasi ascii.js
  const fs = require('fs');
  const path = require('path');
  
  const possiblePaths = [
    './ascii.js',
    './lib/ascii.js',
    path.join(__dirname, 'ascii.js'),
    path.join(__dirname, '../ascii.js'),
    path.join(__dirname, '../lib/ascii.js')
  ];
  
  let asciiLoaded = false;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      require(p);
      asciiLoaded = true;
      break;
    }
  }
  
  if (!asciiLoaded) {
    // Fallback kalo file gak ketemu
    console.log(
      chalk.hex('#a78bfa').bold(`
 ____              _ _   _       _   ______                 _ 
 |  _ \\  __ _ ____ (_) \\ | | ___ | |_|  ____|___  _   _ _ __| |
 | | | |/ _\` |_  / | |  \\| |/ _ \\| __| |__  / _ \\| | | | '__| |
 | |_| | (_| |/ /| | | |\\  | (_) | |_|  __|| (_) | |_| | |  | |
 |____/ \\__,_/___|_|_|_| \\_|\\___/ \\__|_|    \\___/ \\__,_|_|  |_|

              𝒯 𝐻 𝒜 𝒩 𝒦 𝒮   𝐹 𝒪 𝑅   𝒰 𝒮 𝐼 𝒩 𝐺   𝑀 𝒴   𝐵 𝒜 𝐼 𝐿 𝐸 𝒴 𝒮  ꨄ︎

                           𝓛𝓪𝓼𝓽 𝓤𝓹𝓭𝓪𝓽𝓮 • 10 𝓙𝓪𝓷𝓾𝓪𝓻𝔂 2026
                               𝓣𝓮𝓵𝓮𝓰𝓻𝓪𝓶 : @𝓭𝓪𝔃𝓲𝓷𝓸𝓽𝓭𝓮𝓿

`)
    );
  }
} catch (e) {
  console.log('Gagal load ascii art:', e.message);
  // Fallback minimal
  console.log(chalk.hex('#a78bfa').bold('DaziNotFound - WhatsApp Baileys'));
  console.log('𝒯 𝐻 𝒜 𝒩 𝒦 𝒮   𝐹 𝒪 𝑅   𝒰 𝒮 𝐼 𝒩 𝐺   𝑀 𝒴   𝐵 𝒜 𝐼 𝐿 𝐸 𝒴 𝒮  ꨄ︎');
}

// ============================================
// STEP 6: Balikin require ke normal
// ============================================
module.require = originalRequire;

// ============================================
// STEP 7: Kode asli index.js lu (Gak Diubah!)
// ============================================
var createBinding =
  (this && this.createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);

        if (
          !desc ||
          (!("get" in desc) && (desc.writable || desc.configurable))
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }

        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });

var exportStar =
  (this && this.exportStar) ||
  function (m, exports) {
    for (var p in m)
      if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p))
        createBinding(exports, m, p);
  };

var importDefault =
  (this && this.importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

Object.defineProperty(exports, "__esModule", { value: true });

const Socket_1 = importDefault(require("./Socket"));

exports.makeWASocket = Socket_1.default;

exportStar(require("../WAProto"), exports);
exportStar(require("./Utils"), exports);
exportStar(require("./Types"), exports);
exportStar(require("./Store"), exports);
exportStar(require("./Defaults"), exports);
exportStar(require("./WABinary"), exports);
exportStar(require("./WAM"), exports);
exportStar(require("./WAUSync"), exports);

exports.default = Socket_1.default;
