/**
 * Created with IntelliJ IDEA.
 * User: zmzsmnh
 * Date: 12-12-19
 * Time: 下午3:01
 * To change this template use File | Settings | File Templates.
 */

var request = require('request');

request.post('http://localhost:3000/collect/image', {form: {
    from: 'weibo.com',
    uri: 'http://www.upyun.com/images/uclund.png'
}}, function(err, res, body){ console.log(res.statusCode, body);});