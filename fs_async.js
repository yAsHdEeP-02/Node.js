const fs = require('fs');
fs.readFile('./1-node-farm/starter/txt/start.txt', 'utf-8', (err, data1) => {
    fs.readFile(`./1-node-farm/starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2);
        fs.writeFile(`./1-node-farm/starter/txt/final.txt`, data2, 'utf-8', (err) => {
            console.log('Written');
        })
    });
});
console.log('Reading \n');
