/**
 * Created with IntelliJ IDEA.
 * User: zhaoruihui
 * Date: 12-12-26
 * Time: 下午7:35
 * To change this template use File | Settings | File Templates.
 */
    // giving a path like d:/www/a.jpg can return a.jpg ,that is the file name
function getFileName(path){
    var pos1 = path.lastIndexOf('/');
    var pos2 = path.lastIndexOf('\\');
    var pos  = Math.max(pos1, pos2)
    if( pos<0 )
        return path;
    else
        return path.substring(pos+1);
}