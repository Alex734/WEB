const http = require('http');
const fs = require('fs');

var qs = require('querystring');
var wp = '';
var jsFile = '';
var cssFile = '';

http.createServer( (req, res) => {
    switch (req.url){
        case '/':
            res.writeHead(200, {'Content-Type':'text/html'});
            file = fs.readFileSync('./index.html');
            res.end(file);
            break;
        case '/main.css':
            res.writeHead(200, {'Content-Type':'text/css'});
            fs.readFile('./main.css', (err, data) => {
                if (err) throw err;
                cssFile = data;
            });
            res.end(file);
            break;
        case '/index.js':
            fs.readFile('./server.js', (err, data) => {
                if (err) throw err;
                jsFile = data;
            });
            res.end(file);
            break;
        case '/WelcomePage.html':
            if (req.method == 'POST'){
                var body = '';
                req.on('data', function(data){
                    body += data;
                    if (body > 1e6) req.connection.destroy();
                })
                req.on('end', function(){
                    var post = qs.parse(body);
                    wp = "document.write('Welcome " + post['name'] + "!')";
                });
            };
            res.writeHead(200, {'Content-Type':'text/html'});
            file = fs.readFileSync('./WelcomePage.html');
            res.end(file);
            break; 
        case '/WP.js':
            res.writeHead(200, {'Content-Type':'text/js'});
            res.end(wp);
            break;  
        default:
            res.writeHead(404, {'Content-Type':'text/plain; charset=UTF-8'});
            res.end('404 Не найдено'); 
    }
}).listen(5000, () => console.log('Server is working'));