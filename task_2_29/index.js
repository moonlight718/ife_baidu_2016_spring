var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            return element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            return element.attachEvent("on" + type, handler);
        }else{
            return element["on" + type] = handler;
        }
    },
    getEvent: function(e){
        return e || window.event;
    },
    getTarget: function(e){
        return e.target || e.srcElement;
    }
};
var $ = function(l){ return document.querySelector(l); }
EventUtil.addHandler(window, "load", init);
function init(){
    var  p = $("p");
    var input = $("input");
    EventUtil.addHandler($("button"), "click", function(){
        var value = $("input").value;
        var len = getLength(value);
        if(len < 4 || len > 16){
            p.innerHTML = "姓名不能为空";
            p.style.color = "red";
            input.style.border = "2px solid red";
        }else{
            p.innerHTML = "名称格式正确";
            p.style.color = "green";
            input.style.border = "2px solid green";
        }
    });
}
function getLength(text){
    var match = /[^x00-xff]/,
        len = 0;
    for(var i = 0; i < text.length; i++){
        if(match.test(text[i])){
            len += 2;
        }else{
            len++;
        }
    }
    return len;
}