const fs = require('fs');
fs.writeFileSync('abc.txt','abcdefgh')

console.log('file name is',__filename);
console.log('dir name is',__dirname);