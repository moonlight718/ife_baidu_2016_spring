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
        if(match.test(number)){
            var linkList = document.getElementById("linkList");
            var childList = linkList.childNodes;
            var length = childList.length;
            switch(target.id){
                case "leftPush":{
                    var node = document.createElement("p");
                    var textNode = document.createTextNode(number);
                    node.appendChild(textNode);
                    linkList.insertBefore(node,linkList.firstChild);
                    break;
                }
                case "rightPush":{
                    var node = document.createElement("p");
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
            }
        }else{
            alert("请输入三位数以内的数字！");
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