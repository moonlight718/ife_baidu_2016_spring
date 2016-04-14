var EventUtil = {
    addHandler:function(element,type,Handler){
        if(element.addEventListener){
            return element.addEventListener(type,Handler,false);
        }else if(element.attachEvent){
            return element.attachEvent("on"+type,Handler);
        }else{
            return element["on"+type] = Handler;
        }
    },
    getEvent:function(event){
        return event || window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    }
};
var tag = {};
var tagArr = [];
var $ = function(select){ return document.querySelector(select); };
EventUtil.addHandler(window,"load",init);
function init(){
    EventUtil.addHandler($("#tagInput"),"keyup",outputTag);
    EventUtil.addHandler($("#tag"),"mouseover",changeIn);
    EventUtil.addHandler($("#tag"),"mouseout",changeOut);
    EventUtil.addHandler($("#tag"),"click",deleteTag);
    EventUtil.addHandler($("#ensure"),"click",outputHobby);
}
function outputTag(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event),
        value = target.value;
    if(event.keyCode==13 || /[,，\s\n]+/.test(value)){
        var tagKey = value.trim().replace(/[,，\s\n]+/g,"");
        if(tagKey != '' && !tag.hasOwnProperty(tagKey)){
            if(tagArr.length >= 10){
               delete tag[tagArr.shift()];
            }
            tag[tagKey] = 1;
            tagArr.push(tagKey);
            $("#tag").innerHTML = tagArr.map(function(item){
                return "<p>"+item+"</p>";
            }).join("");
        }
        target.value = "";
    }
}
function changeIn(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase()=='p'){
        target.innerText = "点击删除 "+target.innerText;
    }
}
function changeOut(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase()=='p'){
        target.innerText =target.innerText.slice(5);
    }
}
function deleteTag(event){
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase()=='p'){
        var tagText = target.innerText.slice(5);
        delete tag[tagText];
        tagArr.splice(tagArr.indexOf(tagText),1);
        $("#tag").removeChild(target);
    }
}
function outputHobby(){
    var hobby = {},hobbyArr = [];
    $("#hobby").innerHTML = $("textarea").value.split(/[^a-zA-z0-9\u4E00-\u9FA5]+/).map(function(item){
        var hobbyText = item.trim();
        if(!hobby.hasOwnProperty(hobbyText) && hobbyArr.length < 10){
            hobby[hobbyText] = 1;
            hobbyArr.push(hobbyText);
            return "<div>"+hobbyText+"</div>";
        }
        return "";
    }).join("");
}
