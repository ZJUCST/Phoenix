
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , image = require('./routes/image')
  , http = require('http')
  , path = require('path')
  , log4js = require('log4js');

log4js.configure('./conf/log4js.conf.json');
SLOG = log4js.getLogger('server');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
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

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/post/image', image.upload);
app.post('/collect/image', image.collect);

http.createServer(app).listen(app.get('port'), function(){
  SLOG.info("Express server listening on port " + app.get('port'));
});
