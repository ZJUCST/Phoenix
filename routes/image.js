/**
 * Created with IntelliJ IDEA.
 * User: zmzsmnh
 * Date: 12-12-21
 * Time: 下午2:50
 * To change this template use File | Settings | File Templates.
 */

var imagebll = require('bll/imageBLL');

exports.upload = function(req, res) {
    SLOG.trace("Receive upload request from: ", req.headers['user-agent']);
    if(req.session.user && req.files.image_upload) {
        imagebll.upload(req, res);
    } else {
        res.send('Not Authorized', 403);
    }
}

exports.collect = function(req, res) {
    req.setEncoding('utf-8');
    SLOG.trace("Receive upload request from: ", req.headers['user-agent']);
    if(req.session.user && req.body.uri) {
        imagebll.collect(req, res);
    } else {
        res.send('Not Authorized', 403);
    }
}

exports.getPage = function(req, res) {
    SLOG.trace("Receive get a page of image request from: ", req.headers['user-agent']);

    imagebll.getImages(req, res, function(images) {
        res.send(JSON.stringify(images));
    });
}

exports.getImageById = function(req, res) {
    SLOG.trace("Receive a get image by id request from: ", req.headers['user-agent']);

    if(req.query.id) {
        imagebll.getImageById(req.query.id, res, function(image) {
            res.send(JSON.stringify(image));
        });
    } else {
        res.send('ID parameter is required.', 403);
    }
}
