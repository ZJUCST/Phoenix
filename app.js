
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes/index')
  , user = require('./routes/user')
  , page = require('./routes/page')
  , image = require('./routes/image')
  , engine = require('ejs-locals')
  , http = require('http')
  , path = require('path')
  , log4js = require('log4js');

log4js.configure('./conf/log4js.conf.json');
SLOG = log4js.getLogger('server');


var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.engine('ejs', engine);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Add page render route here
 */
app.get('/', page.index);
app.get('/upload', page.picUpload);
app.get('/login', page.loginAndregister);


/**
 * Add apis route here
 */
app.post('/login',user.login);
app.post('/reg',user.reg);
app.post('/post/image', image.upload);
app.post('/collect/image', image.collect);
app.get('/get/image', image.getPage);


http.createServer(app).listen(app.get('port'), function(){
  SLOG.info("Express server listening on port " + app.get('port'));
});
