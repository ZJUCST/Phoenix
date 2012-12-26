
/*
 * GET users listing.
 */
var user = require('../node_modules/dal/index').User;

exports.list = function(req, res){
    /*res.send("respond with a resource");
    console.log("user entroy point!!!!");
    var log = {uname:req.body.name1,password:req.body.password1};
    var reg = {uname:req.body.name2,password:req.body.password2};
    if(log.uname ==""&&reg.uname =="")
    {
        console.log("nothing is filled!");
        res.redirect("");
    }
    else if(log.uname != "")
    {
        user.find({name:log.uname,password:log.password},{name:1},function(err,doc){
            if(err)
            {
                console.log("something is err!!!!")
            }
            else
            {
                doc.toArray(function(err,items){
                    if(items.length==0)
                        console.log("the user dones't exist!");
                    else
                    {
                        console.log("OK");
                    }
                })
            }
        });
    }
    else if(reg.uname !="")
    {
         user.insert({name:reg.name,password:reg.password},function(err,doc){
             if(err)
                console.log("when insert into table user ,something is wrong!");
         })
    } */
};