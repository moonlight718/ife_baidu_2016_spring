var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            return element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            return element.attachEvent("on"+type,handler);
        }else{
            return element["on"+type] = handler;
        }
    },
    getEvent:function(event){
        return event || window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    }
};
EventUtil.addHandler(window,"load",init);
function init(){
    var input = document.getElementById("input");
    var linkList = document.getElementById("linkList");
    EventUtil.addHandler(input,"click",react);//将所有的button都事件代理
    EventUtil.addHandler(linkList,"click",deleteBlock);
}
function react(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase()=='button'){
        var match = /^\d{1,3}$/;
        var number = document.getElementById("number").value;
        if(match.test(number) && number>=10 && number<=100){
            var linkList = document.getElementById("linkList");
            var childList = linkList.childNodes;
            var length = childList.length;
            switch(target.id){
                case "leftPush":{
                    if(length>=60){
                        alert("队列个数不能超出60个！");
                        break;
                    }
                    var node = document.createElement("p");
                    node.setAttribute("style","height:"+number+"px;");
                    var textNode = document.createTextNode(number);
                    node.appendChild(textNode);
                    linkList.insertBefore(node,linkList.firstChild);
                    break;
                }
                case "rightPush":{
                    if(length>=60){
                        alert("队列个数不能超出60个！");
                        break;
                    }
                    var node = document.createElement("p");
                    node.setAttribute("style","height:"+number+"px;");
                    var textNode = document.createTextNode(number);
                    node.appendChild(textNode);
                    linkList.appendChild(node);
                    break;
                }
                case "leftPop":{
                    if(length==0){
                        alert("队列中已经没有方块了！");
                    }else{
                        linkList.removeChild(linkList.firstChild);
                    }
                    break;
                }
                case "rightPop":{
                    if(length==0){
                        alert("队列中已经没有方块了！");
                    }else{
                        linkList.removeChild(linkList.lastChild);
                    }
                    break;
                }
                default:{
                    for(var i=0;i<length;i++){
                        for(var j=0;j<length-i-1;j++){
                            if(Number(childList[j].innerText)>Number(childList[j+1].innerText)){
                                var firstNode = childList[j].cloneNode(true);
                                var secondNode = childList[j+1].cloneNode(true);
                                linkList.replaceChild(firstNode,childList[j+1]);
                                linkList.replaceChild(secondNode,childList[j]);
                            }    
                        }
                        
                    }
                }
            }
        }else{
            alert("请输入10-100的一个整数。");
        }
    }
}
function deleteBlock(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase()=='p'){
        document.getElementById("linkList").removeChild(target);
    }
}