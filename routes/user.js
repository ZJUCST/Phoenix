
var userDAL = require('dal').User,
    crypto = require('crypto'),
    errorDef = require('./../conf/errorCode.def.json');

exports.login = function (req, res) {
    SLOG.trace("Receive login request from: ", req.headers['user-agent']);

    var loginInfo = {
        name:req.body.username,
        password:req.body.password
    };

    if (!loginInfo.name) {
        SLOG.info("Login attempt failed: username cannot be empty.");
        res.send(errorDef[100001], 401);
    } else if (!loginInfo.password) {
        SLOG.info("Login attempt failed: password cannot be empty.");
        res.send(errorDef[100002], 401);
    } else {
        userDAL.findOne({name:loginInfo.name}, function (err, dbuser) {
            if (err) {
                SLOG.error(err);
            } else if(!dbuser) {
                SLOG.info("Login attempt failed: username not found.");
                res.send(errorDef[100003], 401);
            } else {
                hasher(loginInfo.password, dbuser.salt, function(err, dk) {
                    if(dbuser.password == dk) {
                        req.session.user = dbuser;
                        res.send();
                    } else {
                        SLOG.info("Login attempt failed: wrong password.");
                        res.send(errorDef[100004], 401);
                    }
                });
            }
        });
    }
};

exports.reg = function (req, res) {
    SLOG.trace("Receive register request from: ", req.headers['user-agent']);

    if(!req.body.email) {
        SLOG.info("Register attempt failed: email cannot be empty.");
        res.send(errorDef[100005], 401);
    } else if (!req.body.username) {
        SLOG.info("Register attempt failed: username cannot be empty.");
        res.send(errorDef[100001], 401);
    } else if (!req.body.password) {
        SLOG.info("Register attempt failed: password cannot be empty.");
        res.send(errorDef[100002], 401);
    } else {
        userDAL.findOne({name: req.body.username}, function(err, dbUser) {
            if(err) {
                SLOG.error(err);
                res.send(errorDef[400001], 500);
            } else if(dbUser) {
                SLOG.error(err);
                res.send(errorDef[100006], 401);
            } else {
                userDAL.findOne({email: req.body.email}, function(err, dbUser) {
                    if(err) {
                        SLOG.error(err);
                        res.send(errorDef[400001], 500);
                    } else if(dbUser) {
                        SLOG.error(err);
                        res.send(errorDef[100007], 401);
                    } else {
                        var salt = crypto.randomBytes(128).toString('base64');
                        hasher(req.body.password, salt, function(err, dk) {
                            var newUser = {
                                name:req.body.username,
                                password:dk,
                                email:req.body.email,
                                salt:salt,
                                createTime:new Date()
                            };
                            userDAL.insert(newUser, {safe: true}, function(err, docs) {
                                if(err) {
                                    SLOG.error(err);
                                    res.send(errorDef[400001], 500);
                                } else {
                                    SLOG.trace("Register successful: ", docs[0].name);
                                    delete docs[0].password;
                                    delete docs[0].salt;
                                    req.session.user = docs[0];
                                    res.send();
                                }
                            });
                        });
                    }
                });
            }
        });
    }
};

/**
 * pbkdf2 password hasher
 * @param pwd - plain text of password
 * @param salt - salt used in pbkdf2
 * @param fn - callback function
 */
function hasher(pwd, salt, fn) {
    crypto.pbkdf2(pwd, salt, 1000, 512, fn);
}