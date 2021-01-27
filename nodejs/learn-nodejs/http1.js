var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res){
    
    //var name = require('url').parse(req.url, true).query.name;
    var name = url.parse(req.url, true).query.name;

    //console.log(require('url').parse(req.url, true)); 
    if(name === undefined) name = 'world';

    if(name === 'burnigbird'){
        var file = 'phoenix5a.png';
        fs.stat(file, function(err, stat){
            if(err){
                console.error(err);
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('Sorry, Burnigbird isn\'t around right now');
            }else {
                var img = fs.readFileSync(file);
                res.contentType = 'image/png';
                res.contentLength = stat.size;
                res.end(img, 'binary');
            }
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(`Hello ${name}\n`)
    }
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');


