var http_module = require('http');
var fs = require('fs');
var path = require('path');
var types = {
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg':  'image/jpeg',
    '.png':  'image/png',
    '.svg':  'image/svg+xml',
    '.json': 'application/json',
    '.js':   'text/javascript',
    '.css':  'text/css',
    '.ico':  'image/x-icon',
};
function onrequest(request, response) {
    var filePath = '.' + request.url;
    if (request.url === "/") {
        filePath = './index.html';
    }
    var extname = String(path.extname(filePath)).toLowerCase();
    var contentType = types[extname] || 'text/plain';
    fs.readFile(filePath, function(err, data) {
        if (err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('404 Not Found');
            } else {
                response.writeHead(500, { 'Content-Type': 'text/plain' });
                response.end('500 Internal Server Error');
            }
            return;
        }
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(data);
    });
}
var server = http_module.createServer(onrequest);
server.listen(8080, '0.0.0.0', () => {
    console.log('Сервер запущен на http://localhost:8080');
});