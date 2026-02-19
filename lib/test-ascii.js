// test-ascii.js
const fs = require('fs');
const path = require('path');

console.log('🔍 TEST ASCII LOCATION');
console.log('======================');
console.log('__dirname:', __dirname);
console.log('Current working dir:', process.cwd());
console.log('');

// Cek semua kemungkinan lokasi
const paths = [
    './ascii.js',
    './lib/ascii.js',
    path.join(__dirname, 'ascii.js'),
    path.join(__dirname, '../ascii.js'),
    path.join(__dirname, '../lib/ascii.js'),
    path.join(process.cwd(), 'ascii.js'),
    path.join(process.cwd(), 'lib/ascii.js')
];

paths.forEach((p, i) => {
    const exists = fs.existsSync(p);
    console.log(`${i+1}. ${p} : ${exists ? '✅ ADA' : '❌ TIDAK ADA'}`);
});

console.log('\n📋 Daftar file di folder ini:');
try {
    const files = fs.readdirSync(__dirname);
    files.forEach(f => console.log('   - ' + f));
} catch (e) {
    console.log('   Error reading dir:', e.message);
}
