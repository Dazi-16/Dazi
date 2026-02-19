const figlet = require("figlet");
const chalk = require("chalk").default;
const stringWidth = require("string-width").default;

const TITLE = "DaziNotFound";
const FONT = "Slant";

// caption (center)
const captionLines = [
  "𝒯 𝐻 𝒜 𝒩 𝒦 𝒮   𝐹 𝒪 𝑅   𝒰 𝒮 𝐼 𝒩 𝒢   𝑀 𝒴   𝐵 𝒜 𝐼 𝐿 𝐸 𝒴 𝒮  ꨄ︎",
  "   ",
  "𝓛𝓪𝓼𝓽 𝓤𝓹𝓭𝓪𝓽𝓮 • 10 𝓙𝓪𝓷𝓾𝓪𝓻𝔂 2026",
  "𝓣𝓮𝓵𝓮𝓰𝓻𝓪𝓶 : @𝓭𝓪𝔃𝓲𝓷𝓸𝓽𝓭𝓮𝓿",
];

// layout
const padX = 6;
const padTop = 1;
const gapY = 2;
const padBottom = 1;

// theme (opsional)
const borderColor = chalk.hex("#64748b");
const asciiColor = chalk.hex("#e2e8f0");
const accentColor = chalk.hex("#22d3ee");
const subtleColor = chalk.hex("#94a3b8");

// border style user
const BORDER_SEG = "ـــــــــﮩ٨ـ"; // atas & bawah
const SIDE = " ";                // samping kosong sesuai note

function cleanFigletLines(s) {
  let lines = s.split("\n");
  while (lines.length && lines[0].trimEnd() === "") lines.shift();
  while (lines.length && lines[lines.length - 1].trimEnd() === "") lines.pop();
  return lines;
}

function vWidth(s) {
  return stringWidth(s.replace(/\s+$/, ""));
}

function padToWidth(s, targetWidth) {
  const clean = s.replace(/\s+$/, "");
  const w = stringWidth(clean);
  return clean + " ".repeat(Math.max(0, targetWidth - w));
}

function centerToWidth(s, targetWidth) {
  const clean = s.replace(/\s+$/, "");
  const w = stringWidth(clean);
  const left = Math.floor((targetWidth - w) / 2);
  const right = targetWidth - w - left;
  return " ".repeat(Math.max(0, left)) + clean + " ".repeat(Math.max(0, right));
}

// isi line dengan BORDER_SEG sampai lebar target (berdasar display width)
function fillWithSegment(seg, targetWidth) {
  const segW = stringWidth(seg);
  if (segW <= 0) return " ".repeat(targetWidth);

  let out = "";
  let w = 0;
  while (w + segW <= targetWidth) {
    out += seg;
    w += segW;
  }
  // sisa lebar ditutup pakai tatweel biar halus, atau spasi
  const rest = targetWidth - w;
  if (rest > 0) out += "ـ".repeat(rest); // 1 kolom per "ـ" di kebanyakan terminal
  return out;
}

figlet.text(TITLE, { font: FONT }, (err, art) => {
  if (err) throw err;

  const artLines = cleanFigletLines(art);
  const contentLines = [
    ...Array(padTop).fill(""),
    ...artLines,
    ...Array(gapY).fill(""),
    ...captionLines,
    ...Array(padBottom).fill(""),
  ];

  const maxWidth = Math.max(...contentLines.map(vWidth), 0);
  const innerWidth = maxWidth + padX * 2;

  // atas & bawah: samping kosong + segmen sampai innerWidth + samping kosong
  const top = SIDE + fillWithSegment(BORDER_SEG, innerWidth) + SIDE;
  const bot = SIDE + fillWithSegment(BORDER_SEG, innerWidth) + SIDE;

  const body = contentLines.map((line) => {
    const clean = line.replace(/\s+$/, "");
    const isEmpty = clean.length === 0;
    const isCaption = captionLines.includes(clean);

    let raw, colored;
    if (isEmpty) {
      raw = " ".repeat(maxWidth);
      colored = raw;
    } else if (isCaption) {
      raw = centerToWidth(clean, maxWidth);
      colored = (clean === captionLines[0]) ? accentColor(raw) : subtleColor(raw);
    } else {
      raw = padToWidth(clean, maxWidth);
      colored = asciiColor(raw);
    }

    // samping kosong = cuma spasi, tapi tetap kasih padding kiri/kanan
    return SIDE + " ".repeat(padX) + colored + " ".repeat(padX) + SIDE;
  });

  console.log([borderColor(top), ...body, borderColor(bot)].join("\n"));
});
