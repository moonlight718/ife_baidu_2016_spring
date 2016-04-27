var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            return element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            return element.attachEvent("on"+type, handler);
        }else{
            return element["on"+type] = handler;
        }
    },
    getEvent: function(e){
        return e || window.event;
    }
};
function $(l){return document.querySelector(l);}
(function(){
    var bg = $(".bg");
    var contentHead = $(".cover header");
    var box = $(".cover");
    var moveObj = {
        enableMove:false,
        diffX:0,
        diffY:0
    };
    EventUtil.addHandler($("#open-cover"), "click", openCover);
    EventUtil.addHandler($("#close"), "click", closeCover);
    EventUtil.addHandler($("#ensure"), "click", closeCover);
    EventUtil.addHandler($("#back"), "click", closeCover);
    EventUtil.addHandler(contentHead,"mousedown",down);
    EventUtil.addHandler(contentHead,"mousemove",move);
    EventUtil.addHandler(contentHead,"mouseup",up);
    function openCover(){
        bg.style.display = "block";
    }
    function closeCover(){
        bg.style.display = "none";
    }
    function down(e){
        e = EventUtil.getEvent(e);
        moveObj.enableMove = true;
        moveObj.diffX = e.clientX - box.offsetLeft;
        moveObj.diffY = e.clientY - box.offsetTop;
    }
    function move(e){
        e = EventUtil.getEvent(e);
        if(moveObj.enableMove){
            box.style.left = e.clientX - moveObj.diffX + "px";
            box.style.top = e.clientY - moveObj.diffY + "px";  
        }
    }
    function up(){
        moveObj.enableMove = false;
        moveObj.diffX = 0;
        moveObj.diffY = 0;
    }
    
    
    
})();

