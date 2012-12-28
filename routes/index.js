
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
exports.loginAndregister = function(req, res){
    res.render('loginAndregister', { title: 'Express' });
};