var http_module = require('http');
const logic = require('./logic.js');

var server = http_module.createServer(logic.onrequest);
server.listen(8080, '0.0.0.0', () => {
    console.log('Сервер запущен на http://localhost:8080');
});