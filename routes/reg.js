/**
 * Created with IntelliJ IDEA.
 * User: Don_F
 * Date: 12-12-24
 * Time: 上午10:34
 * To change this template use File | Settings | File Templates.
 */
var user = require('../node_modules/dal/index').User;

exports.reg = function(req,res){
    console.log("entry reg point !!!!!!!");
    var errString="";
    var reg={
        name:req.body.username,
        password:req.body.password,
        email:req.body.email
    };
    user.find(reg,function(err,docs){
        if(err)
            console.log("something is wrong !");
        else
        {
            docs.toArray(function(err,items){
                if(items.length == 0)
                {
                    console.log("OK");
                    user.insert(reg,function(err,docs){})
                    res.session.add(reg);
                }
                else
                {
                    console.log("this user is already exists!");
                    //res.redirect("");
                    errString="server err";
                    res.add(errString);
                }
            })
        }
    })
};