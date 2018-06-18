
const logger = require('./logger');
const http= require('http');
const server = http.createServer((req,res) =>
{ 
    if(req.url==='/')
    res.write('Hello world');
    else if(req.url==='/sayHi')
    res.write('Hi');
    res.end();
});
// server.on('connection',(socket) =>{
//     console.log('new connection');
// });
server.listen(3000);
console.log('listening to port 3000')
// logger.log('message logged');

