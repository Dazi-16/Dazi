"use strict";

const chalk = require("chalk");

const clearConsole = () => {
  process.stdout.write(
    process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H"
  );
};

clearConsole();

console.log(chalk.white(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`));

// Mix warna untuk bagian bawah (gradasi lembut)
ـــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ـــــــــــ 

           ____              _ _           ______                      
          /  \____ _____  (_) | / /___  / /_/ ____/___    ______  ____/ /
         / / / /  `/_  / / /  |/ /  \/ / /_  /  \/ / / /  \/   /
        / /_/ / /_/ / / /_/ / /|  / /_/ / /_/ / / /_/ / /_/ / / / / /_/ /
       /_____/\__,_/ /___/_/_/ |_/\____/\__/_/    \____/\__,_/_/ /_/\__,_/


              𝒯 𝐻 𝒜 𝒩 𝒦 𝒮   𝐹 𝒪 𝑅   𝒰 𝒮 𝐼 𝒩 𝒢   𝑀 𝒴   𝐵 𝒜 𝐼 𝐿 𝐸 𝒴 𝒮  ꨄ︎

                           𝓛𝓪𝓼𝓽 𝓤𝓹𝓭𝓪𝓽𝓮 • 10 𝓙𝓪𝓷𝓾𝓪𝓻𝔂 2026
                               𝓣𝓮𝓵𝓮𝓰𝓻𝓪𝓶 : @𝓭𝓪𝔃𝓲𝓷𝓸𝓽𝓭𝓮𝓿

 ـــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ــــــــــﮩ٨ـــــــــــ

// ============================
// FIXED __createBinding
// ============================

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
