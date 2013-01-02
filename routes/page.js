/**
 * Created with IntelliJ IDEA.
 * User: zmzsmnh
 * Date: 12-12-26
 * Time: 下午8:22
 * To change this template use File | Settings | File Templates.
 */

var imagebll = require('bll/imageBLL');
var errDef = require('./../conf/errorCode.def.json');

exports.index = function(req, res) {
    SLOG.trace("Receive get a page of image request from: ", req.headers['user-agent']);

    imagebll.getImages(req, res, function(images) {
        res.render('index', { title: 'Hello World',who:{name:'11',pic:"/img/logo.gif", images: images, pageNumber: req.query.p}});
    });
}
exports.picUpload = function(req, res) {
    res.render('picUpload', { title: 'Hello World', who: 'ssss' });
}

exports.loginAndregister = function(req, res) {
    res.render('loginAndregister', { title: 'Hello World',who:{name:'',pic:"/img/logo.gif"} });
}

exports.edit = function(req, res) {
    res.render('edit', { title: 'Hello World',who:{name:'lee',"email":"litao6550652.com"} });
}
exports.mainpage = function(req, res) {
    res.render('mainpage', { title: 'Hello World', who:{uid:1,"uname":"test","orgin":"p_large_p5Bl_1e2100026ab52d0f[1].jpg",
        "from":"","tags":"","description":" ","isPending":false,"createTime":"2013-01-02T06:20:09.880Z",url:"http://peacock.b0.upaiyun.com/90c044094d9b45efbe62efb8a812fb9d.jpg",
        "_id":"50e3d19ff2d865d007000002"}});
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
