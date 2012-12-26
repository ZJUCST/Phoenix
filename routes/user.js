/*
 * GET users listing.
 */
var user = require('dal').User;
var crypto = require('crypto');

exports.login = function (req, res) {
    console.log("entry login.js ");
    var errString = "";

    var log = {
        name:req.body.username,
        password:req.body.password
    };

    if (log.name == "" && log.password == "") {
        console.log("nothing is filled ");
    }
    else if (log.name != "" && log.password != "") {
        user.find({name:log.name}, {}, function (err, docs) {
            if (err) {
                SLOG.error("server err");
            }
            else {
                docs.toArray(function (err, items) {
                    if (err)
                        console.log("docs is error");
                    else {
                        if (items.length == 0) {
                            errString = "The name dones't exist!!";
                            res.send(errString, 401);

                        }
                        else if (items.length == 1) {
                            var upassword;
                            var salt = items[0].salt;
                            crypto.pbkdf2(req.body.password, salt, 10000, 512, function (err, dk) {
                                upassword = dk;
                                if (items[0].password == upassword) {
                                    //res.session.add(log);
                                    console.log("log suc");
                                }
                                else {
                                    errString = "the password is wrong";
                                    res.send(errString, 401);
                                    console.log("the password is Wrong");
                                }
                            });

                            //res.session.add(log);
                        }
                    }
                })
            }
        })
    }
};

exports.reg = function (req, res) {
    console.log("entry reg point !!!!!!!");
    var errString = "";

    var salt = crypto.randomBytes(128).toString('base64');
    var pwd;
    crypto.pbkdf2(req.body.password, salt, 10000, 512, function (err, dk) {
        pwd = dk;
        console.log(pwd)
        var reg = {
            name:req.body.username,
            password:pwd,
            email:req.body.email,
            salt:salt
        };
        user.find({name:reg.name}, {name:1}, function (err, docs) {
            if (err)
                console.log("something is wrong !");
            else {
                docs.toArray(function (err, items) {
                    if (items.length == 0) {
                        console.log("OK");
                        user.insert(reg, function (err, docs) {
                        })
                        //res.session.add(reg);
                    }
                    else {
                        console.log("this user is already exists!");
                        errString = "server err";
                        //res.writeHead(200, {"Content-Type": "text/plain"});
                        res.send(errString);
                    }
                })
            }
        })

    });
};