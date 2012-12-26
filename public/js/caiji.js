

var bodyCon=document.body.innerHTML;
var pattern = /img[\w\W]*?src=['"]([\w\W]*?)['"]/g;

var list = [];
var item =null;
while(item =  pattern.exec(bodyCon))list.push(item);
var k,k1,v;
for(k in list){
	document.body.innerHTML+="<img src='"+list[k][1]+"' onMouseOver='showSelector(this)' onMouseOut='hidSelector()'/>";
}
document.body.innerHTML+="<img id='cjbutton' src='http://localhost/yuanqun/src/img/cjbutton.gif' style='display:none;position:absolute;z-index=5;' />";


var showSelector = function(e){
	var cjbutton=document.getElementById("cjbutton");
	cjbutton.style.display="inline";
	cjbutton.style.top=(GetObjPos(e).y-31)+"px";
	cjbutton.style.left=GetObjPos(e).x+"px";
}
var hidSelector = function(e){
	var cjbutton=document.getElementById("cjbutton");
	
	var isMouseInObject=mouseInObject(cjbutton);
	if(!isMouseInObject)cjbutton.style.display="none";
}

var CPos = function(x, y){ 
this.x = x; 
this.y = y; 
}
//get object's posistion 
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

var mouseInObject = function(object){
		var div = object;  
        var x=event.clientX;  
        var y=event.clientY;  
        var divx1 = div.offsetLeft;  
        var divy1 = div.offsetTop;  
        var divx2 = div.offsetLeft + div.offsetWidth;  
        var divy2 = div.offsetTop + div.offsetHeight;
        if( x < divx1 || x > divx2 || y < divy1 || y > divy2){  
			return false;
        }else{
			return true;//mouse in object
		}

}