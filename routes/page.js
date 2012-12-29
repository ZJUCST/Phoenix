/**
 * Created with IntelliJ IDEA.
 * User: zmzsmnh
 * Date: 12-12-26
 * Time: 下午8:22
 * To change this template use File | Settings | File Templates.
 */

var errDef = require('./../conf/errorCode.def.json');

exports.index = function(req, res) {
    res.locals.user =  {name:'111',pic:"/img/logo.gif"};
    res.render('index', { title: 'Hello World',who:{name:'11',pic:"/img/logo.gif"}});
}
exports.picUpload = function(req, res) {
    res.render('picUpload', { title: 'Hello World', who: 'ssss' });
}

exports.loginAndregister = function(req, res) {
    res.render('loginAndregister', { title: 'Hello World' });
}

exports.picCollect = function(req, res) {
    var from = req.query.from;
    var url = req.query.url;
    var description = req.query.description;
    if(from && url) {
        res.render();
    } else {
        SLOG.error("Get image collect page failed. ");
        res.send(errorDef[400004], 401);
    }
}