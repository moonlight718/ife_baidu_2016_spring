function Tree(){
    this.nodeArr = [];
    this.isAllow = true;
}
Tree.prototype.preOrder = function(node){
    if(node){
        this.nodeArr.push(node);
        this.preOrder(node.firstElementChild);
        this.preOrder(node.lastElementChild);
    }   
};
Tree.prototype.inOrder = function(node){
    if(node){
        this.inOrder(node.firstElementChild);
        this.nodeArr.push(node);
        this.inOrder(node.lastElementChild);
    }
};
Tree.prototype.postOrder = function(node){
    if(node){
        this.postOrder(node.firstElementChild);
        this.postOrder(node.lastElementChild);
        this.nodeArr.push(node);
    }
};
Tree.prototype.animation = function(){
    if(this.isAllow){
        this.isAllow = false;//开始动画，阻止新动画
        var Arr = this.nodeArr,
            self = this,
            i = 0,
            len = Arr.length;
        this.nodeArr = [];
        changeBg();
        function changeBg() {
            if(i<len){
                Arr[i].style.backgroundColor = "#33ffee";
                if(i!=0){
                    Arr[i-1].style.backgroundColor = "#fff";
                }
                i++;
                setTimeout(changeBg,500);
            }else{
                self.isAllow = true;
                Arr[len-1].style.backgroundColor = "#fff";
            }
        }
    }
}
var EventUntil = {
    addHandler: function(element,type,handler){
        if(element.addEventListener){
            return element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            return element.attachEvent("on" + type,handler);
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
function $(l){ return document.querySelector(l); }

EventUntil.addHandler(window,"load",init);
function init(){
    var newTree = new Tree();
    EventUntil.addHandler($(".button"),"click",function(e){
        e = EventUntil.getEvent(e);
        var target = EventUntil.getTarget(e);
        if(target.tagName.toLowerCase() == 'button' && newTree.isAllow){
            switch(target.id){
                case "pre": {
                    newTree.preOrder($(".root"));
                    newTree.animation();
                    break;
                }
                case "in": {
                    newTree.inOrder($(".root"));
                    newTree.animation();
                    break;
                }default: {
                    newTree.postOrder($(".root"));
                    newTree.animation();
                    break;
                }        
            }
        }
    });
}
