/**
 * Created with IntelliJ IDEA.
 * User: zmzsmnh
 * Date: 12-12-26
 * Time: 下午8:22
 * To change this template use File | Settings | File Templates.
 */


exports.index = function(req, res) {
    res.render('index', { title: 'Hello World' });
}
exports.picUpload = function(req, res) {
    res.render('picUpload', { title: 'Hello World' });
}