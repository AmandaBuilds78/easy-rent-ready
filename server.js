const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PAYPAL_EMAIL = 'amandaelizabet345@gmail.com';
const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('index.html', (err, data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
    return;
  }
  if (req.method === 'POST' && req.url === '/join') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      let d = querystring.parse(body);
      fs.appendFileSync('signups.txt', `JOIN | ${d.name} | ${d.email} | ${d.phone} | ${d.interest}\n`);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<h1>Welcome ${d.name}!</h1><p>Pay $20 to activate</p><a href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=${PAYPAL_EMAIL}&amount=20&currency_code=USD&item_name=Easy Rent Ready">Pay $20 with PayPal</a><br><p>Or send $20 to ${PAYPAL_EMAIL}</p><a href="/">Back Home</a>`);
    });
    return;
  }
  if (req.method === 'POST' && req.url === '/list-house') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      let d = querystring.parse(body);
      fs.appendFileSync('signups.txt', `HOUSE | ${d.owner} | ${d.phone} | ${d.location} | ${d.price}\n`);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(`<h1>House Received!</h1><a href="/">Back Home</a>`);
    });
    return;
  }
  res.writeHead(404);
  res.end('Not found');
});
server.listen(3000, () => console.log('Running on http://localhost:3000'));
