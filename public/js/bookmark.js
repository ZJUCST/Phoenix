var bodyCon=document.body.innerHTML;
var pattern = /img[\w\W]*?src=['"]([\w\W]*?)['"]/gi;
var needPattern = /.(jpg|gif|png|jpeg)$/i
//var noNeedPattern = /.(swf|js)/i
var list = [];
var item =null;
var image = new Image();

var alertHtml="<div id='selectContent'>";
while(item =  pattern.exec(bodyCon))list.push(item);

var k,k1,v,picSrc,imgMargin;
for(k in list){
    picSrc = list[k][1];

    //if item has some string like the noNeedPatter describe,we do not need this item
    //if(noNeedPattern.test(picSrc))continue;

    //if item do not has  string like the needPatter describe,we do not need this item
    if(!needPattern.test(picSrc))continue;
    image.src=picSrc;
    if(image.width<200)continue;
    //the image margin-top,make it v-center
    imgMargin = (200-(200/image.width)*image.height)/2;
    if(imgMargin<0)imgMargin=0;
    alertHtml+="<div style='float:left;height:200px;width:200px;background-color: #fff;border: solid #e7e7e7;border-width: 0 1px 1px 0;opacity: 1;'><img src='"+picSrc+"' onMouseOver='showSelector(this)'  style='margin-top:"+imgMargin+"px;width:auto !important;height:auto !important;max-height:200px;max-width:200px;'/></div>";
}
alertHtml+="<img id='cjbutton' src='http://localhost/yuanqun/src/img/cjbutton.gif' style='display:none;position:absolute;z-index=5;' onclick='caiji()'/>";
alertHtml+="<input type='hidden' id='imgUri' />";
alertHtml+="</div>";

sAlert("selectContent",alertHtml);


var caiji = function(){
    var imgUri=URLencode(document.getElementById("imgUri").value);
    var imgFrom = URLencode(document.URL);
    window.open (('http://localhost:3000/collect?uri='+imgUri+'&from='+imgFrom),'newwindow','height=400,width=600,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');

}

// encode uri change '&' to '%26'  etc
function URLencode(sStr)
{
    return escape(sStr).replace(/\+/g, '%2B').replace(/\"/g,'%22').replace(/\'/g, '%27').replace(/\//g,'%2F');
}
var showSelector = function(e){
    var cjbutton=document.getElementById("cjbutton");
    cjbutton.style.display="inline";
    document.getElementById("imgUri").value=e.src;
    cjbutton.style.top=(GetObjPos(e).y+33)+"px";
    cjbutton.style.left=(GetObjPos(e).x+60)+"px";
}
//GetObjPos will use CPos
var CPos = function(x, y){
    this.x = x;
    this.y = y;
}
//get object's posistion  x,y
var  GetObjPos = function(ATarget) {
    var target = ATarget;
    var pos = new CPos(target.offsetLeft, target.offsetTop);

    target = target.offsetParent;
    while (target)
    {
        pos.x += target.offsetLeft;
        pos.y += target.offsetTop;
        target = target.offsetParent;
    }
    return pos;
}

function sAlert(contentId,strContent){

    var msgw,msgh,bordercolor;
    msgw=document.body.clientWidth*0.997;//提示窗口的宽度 
    msgh=30;//提示窗口的高度 
    titleheight=25 //提示窗口标题高度 
    bordercolor="#336699";//提示窗口的边框颜色; 
    titlecolor="#99CCFF";//提示窗口的标题颜色
    var sWidth,sHeight;
    sWidth=document.body.clientWidth*0.997; //背景遮罩层宽
    sHeight=document.body.clientHeight*2; //背景遮罩层高度
    var bgObj=document.createElement("div");
    bgObj.setAttribute('id','bgDiv');
    bgObj.style.position="absolute";
    bgObj.style.top="0";
    bgObj.style.background="white";
    bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";
    bgObj.style.opacity="0.95";
    bgObj.style.left="0";
    bgObj.style.width=sWidth + "px";
    bgObj.style.height=sHeight + "px";
    bgObj.style.zIndex = "10000";
    document.body.appendChild(bgObj);
    var msgObj=document.createElement("div")
    msgObj.setAttribute("id","msgDiv");
    msgObj.setAttribute("align","center");
    msgObj.style.background="white";
    msgObj.style.border="1px solid " + bordercolor;
    msgObj.style.position = "absolute";
    msgObj.style.left = "0%";
    msgObj.style.top = "0%";
    msgObj.style.font="12px/1.6em Verdana, Geneva, Arial, Helvetica, sans-serif";

    msgObj.style.width = msgw + "px";
    msgObj.style.height = msgh + "px";
    msgObj.style.textAlign = "center";
    msgObj.style.lineHeight ="25px";
    msgObj.style.zIndex = "10001";
    var title=document.createElement("h4");
    title.setAttribute("id","msgTitle");
    title.setAttribute("align","right");
    title.style.margin="0";
    title.style.padding="5px 0 0 0";
    title.style.background="white";
    title.style.color="black";
    title.style.filter="progid:DXImageTransform.Microsoft.Alpha(startX=20, startY=20, finishX=100, finishY=100,style=1,opacity=75,finishOpacity=100);";

    title.style.border="1px solid grey";
    title.style.height="33px";
    title.style.font="12px Verdana, Geneva, Arial, Helvetica, sans-serif";
    title.style.cursor="pointer";
    title.title = "点击关闭";
    title.innerHTML="<div style='text-align:center;font-weight: bold;font-size:18px;'>取消</div>";

    title.onmouseout=function(){
        title.style.background="white";
        title.style.color="black";
    }
    title.onmouseover=function(){
        title.style.background="blue";
        title.style.color="white";
    }
    title.onclick=function(){
        document.body.removeChild(bgObj);
        document.getElementById("msgDiv").removeChild(title);
        document.body.removeChild(msgObj);
    }
    document.body.appendChild(msgObj);
    document.getElementById("msgDiv").appendChild(title);
    var txt=document.createElement("div");
    txt.setAttribute("id","msgTxt");
    txt.innerHTML=strContent;
    document.getElementById("msgDiv").appendChild(txt);
    //重新设置背景高度
    var bgObj2 = document.getElementById("bgDiv");
    if(bgObj2.style.height<document.getElementById(contentId).offsetHeight)bgObj2.style.height=document.getElementById(contentId).offsetHeight + "px";
} 