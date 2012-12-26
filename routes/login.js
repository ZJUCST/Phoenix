/**
 * Created with IntelliJ IDEA.
 * User: Don_F
 * Date: 12-12-24
 * Time: 上午10:24
 * To change this template use File | Settings | File Templates.
 */
var user = require('../node_modules/dal/index').User;

exports.login=function(req,res){
    console.log("entry login.js ");
    var errString="";

    var log={
        name:req.body.username,
        password:req.body.password
    };

    if(log.name==""&&log.password=="")
    {
        console.log("nothing is filled ");
        res.redirect("");
    }
    else if(log.name!=""&&log.password!="")
    {
        user.find(log,{name:1},function(err,docs){
            if(err)
            {
                console.log("something is wrong !!!");
                //
            }
            else
            {
                docs.toArray(function(err,items){
                    if(err)
                        console.log("docs is error");
                    else
                    {
                        if(items.length==0)
                        {
                            user.find({name:log.name},{name:1},function(err,docs){
                                docs.toArray(function(err,items){
                                    if(!err)
                                    {
                                        if(items.length!=0)
                                        {
                                            errString="password err";
                                            console.log("password err");
                                            res.add(errString);
                                        }
                                        else if(items.length==0)
                                        {
                                            errString="the name not exits";
                                            console.log("the name not exits");
                                            res.add(errString);
                                        }
                                    }
                                })
                            })
                            //console.log("this user is not exist!!");
                            res.redirect("");
                            errString="client err!";
                            res.add(errString);
                        }
                        else
                        {
                            console.log("login success!!");
                            res.session.add(log);
                        }
                    }
                })
            }
        })
    }
};