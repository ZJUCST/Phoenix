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
    res.render('loginAndregister', { title: 'Hello World',who:{name:'',pic:"/img/logo.gif"} });
}

exports.edit = function(req, res) {
    res.render('edit', { title: 'Hello World',who:{name:'lee',email:'litao6550652.com'} });
}
exports.mainpage = function(req, res) {
    res.render('mainpage', { title: 'Hello World', who: 'ssss' });
}

exports.picCollect = function(req, res) {
    var from = req.query.from;
    var uri = req.query.uri;
    var description = req.query.description;
    if(from && uri) {
        res.render('collect', { from:from,uri:uri,description:description });
    } else {
        SLOG.error("Get image collect page failed. ");
        res.send(errDef[400004], 401);
    }
}
exports.error = function(req, res) {
    var errorContent = req.query.errorContent;
    var redirectUrl =  req.query.redirectUrl;
    res.render('error', { errorContent:errorContent,who:{name:'lee',email:'litao6550652.com'},redirectUrl: redirectUrl});
}