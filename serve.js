const http = require('http');
const url = require('url');
const fs = require('fs');


const data = fs.readFileSync('./1-node-farm/starter/dev-data/data.json', 'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req, res) => {
    // console.log(req.url);
    const pathName = req.url;

    if (pathName === '/overview' || pathName === '/') {
        res.end('This is overview');
    }


    else if (pathName === '/product') {
        res.end('This is product');
    }


    else if (pathName === '/api') {
        // fs.readFile('./1-node-farm/starter/dev-data/data.json', 'utf-8', (err, data) => {
        //     res.writeHead(200,{''Content-type': 'application/json'})
        //     res.end(data);
        // })
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(data);
    }


    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own': 'hello'
        });
        res.end('Page not found');
    }

})


server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to resquest on port 8000');
});

// When you specify an IP address as the host parameter when setting up a server in Node.js, the server will listen for incoming connections only on that specific IP address. It will accept requests that are directed to that particular IP address.


//For example, if you set server.listen(port, '192.168.1.100'), the server will only accept connections that are addressed to the IP address '192.168.1.100'. It will ignore or reject connections that are not directed to that specific IP address.

// Keep in mind that this setup restricts the server to listen only on the specified IP address, potentially blocking connections from other IP addresses or interfaces.

