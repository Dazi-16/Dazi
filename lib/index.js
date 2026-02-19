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
// STEP 2: Panggil ascii.js (LANGSUNG!)
// ============================================
try {
  // Coba require file ascii.js
  require("./ascii.js");
  console.log(""); // kasih enter biar rapi
} catch (err) {
  // Fallback kalo error
  console.log("DaziNotFound - WhatsApp Baileys");
  console.log("𝒯 𝐻 𝒜 𝒩 𝒦 𝒮   𝐹 𝒪 𝑅   𝒰 𝒮 𝐼 𝒩 𝐺   𝑀 𝒴   𝐵 𝒜 𝐼 𝐿 𝐸 𝒴 𝒮  ꨄ︎\n");
}

// ============================================
// STEP 3: Kode asli index.js lu (Gak Diubah!)
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
