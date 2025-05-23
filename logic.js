var fs = require('fs');
var path = require('path');
const TEXTS = require('./script/constants').TEXTS;

var types = {
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.ico': 'image/x-icon',
};

function onrequest(request, response) {
    var filePath = '.' + request.url;
    
    if (request.url === "/") {
        filePath = './index.html';
        
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                response.writeHead(500, {'Content-Type': 'text/plain'});
                response.end('Server Error');
                return;
            }

            let html = data
                .replace(/{{TITLE}}/g, TEXTS.TITLE)
                .replace(/{{INPUT_LABEL}}/g, TEXTS.INPUT_LABEL)
                .replace(/{{OUTPUT_LABEL}}/g, TEXTS.OUTPUT_LABEL)
                .replace(/{{INPUT_PLACEHOLDER}}/g, TEXTS.INPUT_PLACEHOLDER)
                .replace(/{{ALPHABET_TITLE}}/g, TEXTS.ALPHABET_TITLE)
                .replace(/{{ORIGINAL_LABEL}}/g, TEXTS.ORIGINAL_LABEL)
                .replace(/{{ENCRYPTED_LABEL}}/g, TEXTS.ENCRYPTED_LABEL)
                .replace(/{{HOW_WORKS_TITLE}}/g, TEXTS.HOW_WORKS_TITLE)
                .replace(/{{HOW_WORKS_1}}/g, TEXTS.HOW_WORKS_1)
                .replace(/{{HOW_WORKS_2}}/g, TEXTS.HOW_WORKS_2)
                .replace(/{{HOW_WORKS_3}}/g, TEXTS.HOW_WORKS_3)
                .replace(/{{FOOTER_TEXT}}/g, TEXTS.FOOTER_TEXT);
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.end(html);
        });
    } else {
        const extname = String(path.extname(filePath)).toLowerCase();
        const contentType = types[extname] || 'application/octet-stream';

        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    response.writeHead(404);
                    response.end('Not Found');
                } else {
                    response.writeHead(500);
                    response.end('Server Error');
                }
            } else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });
    }
}

module.exports = { onrequest };