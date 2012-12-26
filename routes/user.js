
/*
 * GET users listing.
 */
var user = require('dal/index').User;
var crypto = require('crypto');

exports.list = function(req, res){
};

exports.login=function(req,res){
    console.log("entry login.js ");
    var errString="";

    var crypto = require('crypto');
    var log={
        name:req.body.username,
        password:req.body.password
    };

    if(log.name==""&&log.password=="")
    {
        console.log("nothing is filled ");
    }
    else if(log.name!=""&&log.password!="")
    {
        user.find({name:log.name},{},function(err,docs){
            if(err)
            {
                console.log("server err");
            }
            else
            {
                docs.toArray(function(err,items){
                    if(err)
                        console.log("docs is error");
                    else
                    {
                        if(items.length==0)   //代表没有这个用户名
                        {
                            errString="The name dones't exist!!";
                            res.send(errString);

                        }
                        else if(items.length==1)  //代表有这个用户名
                        {
                            var upassword ;
                            var salt = items[0].salt;
                            crypto.pbkdf2( req.body.password, salt, 10000, 512, function(err, dk) {
                                upassword = dk;
                                if(items[0].password == upassword) //代表密码正确
                                {
                                    //res.session.add(log);
                                    console.log("log suc");
                                }
                                else  //代表密码不正确
                                {
                                    errString="the password is wrong";
                                    res.send(errString);
                                    console.log("the password is Wrong");
                                }
                            } );

                            //res.session.add(log);
                        }
                    }
                })
            }
        })
    }
};

exports.reg = function(req,res){
    console.log("entry reg point !!!!!!!");
    var errString="";

    var salt = crypto.randomBytes(128).toString('base64');
    var pwd;
    crypto.pbkdf2( req.body.password, salt, 10000, 512, function(err, dk) {
        pwd = dk;
        console.log(pwd)
        var reg={
            name:req.body.username,
            password:pwd,
            email:req.body.email,
            salt:salt
        };
        user.find({name:reg.name},{name:1},function(err,docs){
            if(err)
                console.log("something is wrong !");
            else
            {
                docs.toArray(function(err,items){
                    if(items.length == 0)
                    {
                        console.log("OK");
                        user.insert(reg,function(err,docs){})
                        //res.session.add(reg);
                    }
                    else
                    {
                        console.log("this user is already exists!");
                        errString="server err";
                        //res.writeHead(200, {"Content-Type": "text/plain"});
                        res.send(errString);
                    }
                })
            }
        })

    } );
};