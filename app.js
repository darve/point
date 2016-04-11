
/**
 * Basic static file server
 */
var path            = require('path'),
    express         = require('express'),
    jf              = require('jsonfile'),
    bodyparser      = require('body-parser'),
    app             = express();

app.use(bodyparser.json({ limit: '50mb', parameterLimit: 100000}));
app.use(bodyparser.urlencoded({ extended: false, limit: '50mb', parameterLimit: 100000 }));

app.post('/omg', function(req, res){
    jf.writeFileSync('./lad.json', req.body);
    res.send('success');
});

app.use("/", express.static(path.resolve(__dirname, "app")));
app.use("/", function(req, res, next) {
  res.send(404);
});

app.get('/', function(req, res) {
  res.sendfile('index.html', { root: "app" });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Server listening on port ' + port);
