var queue = [];//队列中的数据
var EventUtil = {//跨浏览器兼容事件
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
var $ = function(select){ return document.querySelector(select); };
EventUtil.addHandler(window,"load",init);
function init(){
    EventUtil.addHandler($("#input"),"click",react);//将所有的button都事件代理
    EventUtil.addHandler($("#linkList"),"click",deleteBlock);
    EventUtil.addHandler($("#query"),"click",query);
}
function react(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase()=='button'){
        if(target.id=="leftPush" || target.id=="rightPush"){
            var data = $("textarea").value.split(/[^a-zA-Z0-9\u4e00-\u9fa5]+/).filter(function(item){
                return (item!="");
            });//获取输入的值（数组）
            if(target.id=="leftPush"){
                Array.prototype.unshift.apply(queue,data);
            }else{
                Array.prototype.push.apply(queue,data);
            }
        }else{
            if(queue.length==0){
                alert("队列中已经没有方块了!");
                return;
            }else if(target.id=="leftPop"){
                queue.shift();
            }else{
                queue.pop();
            }
        }
        $("#linkList").innerHTML = queue.map(function(item){
            return "<p>"+item+"</p>";
        }).join("");
    }
}
function deleteBlock(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase()=='p'){
        console.log(target.parentNode.children);
        var index = Array.prototype.indexOf.call(target.parentNode.children,target);//不能用apply，apply只接受数组
        queue.splice(index,1);
        $("#linkList").removeChild(target);
    }
}
function query(){
    var text = $(".queryInput").value;
    if(text!="" && text.length>0){
        var match = new RegExp(text,"g");
        $("#linkList").innerHTML = queue.map(function(item){
            var html = item.replace(match,"<span>"+text+"</span>");
            return "<p>"+html+"</p>";
        }).join("");
    }

}