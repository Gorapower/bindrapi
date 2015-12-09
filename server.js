var express     = require('express');  
var app         = express();  
var redis = require('redis');
var client = redis.createClient(6379, '107.170.204.144');

// Conexión con la base de datos
client.on('connect', function() {
    console.log('connected');
});

// Configuración
app.configure(function() {  
    // Localización de los ficheros estÃ¡ticos
    app.use(express.static(__dirname + '/public'));
    // Muestra un log de todos los request en la consola        
    app.use(express.logger('dev')); 
    // Permite cambiar el HTML con el método POST                   
    app.use(express.bodyParser());
    // Simula DELETE y PUT                      
    app.use(express.methodOverride());                  
});
// Rutas de nuestro API
// GET de todos los amiibos
app.get('/api/amiibos/:user', function(req, res) {  
    client.lrange(req.params.user, 0, -1, function(err, replies) {
        replies.forEach(function (reply, index) {
            client.hgetall(reply, function (err, obj) {
                res.json(JSON.stringify(obj));
            });
        });
    });
});

// POST que crea un TODO y devuelve todos tras la creación
app.post('api/amiibos/:url/:user', function(req, res) {  
    client.llen('id',function(err, reply) {
        client.hmset(reply, "name", "Mario",
            "condicion", 1,
            "want","trade",
            "url", req.params.user);
        client.rpush([req.params.user, reply]);
        client.rpush(['id', reply]);
    });
});
server.post('/your-rest-endpt/*', function(req,res){
console.log('');
console.log('req.url: '+req.url);
console.log('req.headers: ');   
console.dir(req.headers);
console.log('req.body: ');
console.dir(req.body);  

var options = {
    host: 'restAPI-IP' + ':' + '8080'

    , protocol: 'http'
    , pathname: 'your-rest-endpt/'
};
console.log('options: ');
console.dir(options);   

var reqUrl = url.format(options);
console.log("Forward URL: "+reqUrl);

var parsedUrl = url.parse(req.url, true);
console.log('parsedUrl: ');
console.dir(parsedUrl);

var queryParams = parsedUrl.query;

var path = parsedUrl.path;
var substr = path.substring(path.lastIndexOf("rest/"));
console.log('substr: ');
console.dir(substr);

reqUrl += substr;
console.log("Final Forward URL: "+reqUrl);

var newHeaders = {
};


app.listen(process.env.PORT);