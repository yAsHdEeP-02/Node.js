const fs = require('fs');
const textIn = fs.readFileSync('./1-node-farm/starter/txt/input.txt', 'utf-8');
console.log(textIn);
const textOut=`This is what we know ${textIn}`;
fs.writeFileSync('./1-node-farm/starter/txt/input.txt', textOut,'utf-8'); 