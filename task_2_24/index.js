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
    this.isAllow = true;//是否允许点击其他按钮
    this.currentNode = null;//查找到的当前节点
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
/*查询，基于广度优先*/
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
/*动画*/
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
                if(self.currentNode){
                    Arr[i-1].style.backgroundColor = "#ff44aa";
                }
                else{
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
            switch(target.id){
                case "depthFirst":{//深度优先遍历
                    if(newTree.currentNode){
                        newTree.currentNode.style.backgroundColor = "#fff";
                        newTree.currentNode = null;
                    }
                    newTree.depthFirst($(".root"));
                    newTree.animation();
                    break;
                }
                case "BFs":{//广度优先遍历
                    if(newTree.currentNode){
                        newTree.currentNode.style.backgroundColor = "#fff";
                        newTree.currentNode = null;
                    }
                    newTree.BFs($(".root"));
                    newTree.animation();
                    break;
                }
                case "query":{//查询
                    if(newTree.currentNode){
                        newTree.currentNode.style.backgroundColor = "#fff";
                        newTree.currentNode = null;
                    }
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
                    break;
                }
                case "delete":{
                    if(newTree.currentNode && newTree.currentNode.style.backgroundColor == "rgb(255, 238, 170)"){
                        newTree.currentNode.parentNode.removeChild(newTree.currentNode);
                        newTree.currentNode = null;
                    }else{
                        alert("请选定您要删除的节点");
                    }
                    break;
                }
                case "add":{
                    if(newTree.currentNode && newTree.currentNode.style.backgroundColor == "rgb(255, 238, 170)"){
                        value = $("#addInput").value.trim();
                        if(value==''){
                            alert("请输入新节点名称");
                        }else{
                            var div = document.createElement("div");
                            div.appendChild(document.createTextNode(value));
                            newTree.currentNode.appendChild(div);
                        }
                    }else{
                        alert("请选定节点");
                    }
                }
            }
        }
    });
    EventUtil.addHandler($(".root"),"click",function(e){
        if(newTree.isAllow){
            e = EventUtil.getEvent(e);
            var target = EventUtil.getTarget(e);
            if(newTree.currentNode){
                newTree.currentNode.style.backgroundColor = "#fff";
            }
            newTree.currentNode = target;
            target.style.backgroundColor = "#ffeeaa";    
        }
    });
}
var $ = function(l){ return document.querySelector(l);}
EventUtil.addHandler(window, "load", init);