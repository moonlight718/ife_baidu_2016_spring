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

function Tree(){
    this.nodeArr = [];
    this.isAllow = true;
    this.currentNode = null;
}
/*深度优先*/
Tree.prototype.depthFirst = function(node){
    this.nodeArr.push(node);
    var childen = node.children,
        len = childen.length;
        for(var i=0;i<len;i++){
            this.depthFirst(childen[i]);
        }  
};
/*广度优先*/
Tree.prototype.BFs = function(node){
    var queue = [];
    queue.push(node);
    while(node){
        var children = node.children,
        len = children.length;  
        for(var i = 0; i < len; i++){
            queue.push(node.children[i]);
        }
        this.nodeArr.push(queue.shift());
        node = queue[0];
    }
}
Tree.prototype.search = function(node,value){
    var queue = [];
    queue.push(node);
    while(node){
        var children = node.childNodes,
        len = children.length;  
        for(var i = 0; i < len; i++){
            if(children[i].nodeType == 3 && children[i].nodeValue.trim() == value){ 
                this.currentNode = children[i].parentNode;
                this.nodeArr.push(this.currentNode);
                return true;
            }
            if(children[i].nodeType == 1){
                queue.push(children[i]);
            }
        }
        this.nodeArr.push(queue.shift());
        node = queue[0];
    }
}
Tree.prototype.animation = function(){
    if(this.isAllow){
        var Arr = this.nodeArr,
            self = this,
            i = 0,
            len = Arr.length;
        this.nodeArr = [];
        this.isAllow = false;
        changeBg();
        function changeBg(){
            if(i<len){
                if(i != 0){
                    Arr[i-1].style.background = "#fff";
                }
                Arr[i].style.backgroundColor = "#33ffdd";
                i++;
                setTimeout(changeBg, 500);
            }else{
                if(!self.currentNode){
                    Arr[i-1].style.backgroundColor = "#fff";
                }
                self.isAllow = true;
            }
        }
    }
}
function init(){
    var newTree = new Tree();
    EventUtil.addHandler($("#button"), "click", function(e){
        e = EventUtil.getEvent(e);
        target = EventUtil.getTarget(e);
        if(newTree.isAllow){
            if(newTree.currentNode){
                newTree.currentNode.style.backgroundColor = "#fff";
                newTree.currentNode = null;
            }
            switch(target.id){
                case "depthFirst":{
                    newTree.depthFirst($(".root"));
                    newTree.animation();
                    break;
                }
                case "BFs":{
                    newTree.BFs($(".root"));
                    newTree.animation();
                    break;
                }
                case "query":{
                    var value = $("#queryText").value.trim();
                    if(value == ""){
                        alert("请输入字符！");
                    }else{
                        var isFound = newTree.search($(".root"),value);
                        if(isFound){
                            newTree.animation();
                        }else{
                            newTree.nodeArr = [];
                            alert("没有找到相应的元素");
                        }
                    }
                }
            }
        }
       
    });
}
var $ = function(l){ return document.querySelector(l);}
EventUtil.addHandler(window, "load", init);