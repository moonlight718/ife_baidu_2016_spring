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
function $(l){ return document.querySelector(l); }
function Tree(){
    this.nodeArr = [];
}
Tree.prototype.OpenClose = function(node){
    if(node.className == 'parentOpen'){
        node.className = 'parentClose';
        var children = node.parentNode.children,
        len = children.length;
        for(var i = 1; i < len; i++){
            children[i].style.display = 'none';
        }
    }else if(node.className == 'parentClose'){
        node.className = 'parentOpen';
        var children = node.parentNode.children,
        len = children.length;
        for(var i = 1; i < len; i++){
            children[i].style.display = 'block';
        }
    }
}
Tree.prototype.add = function(node){
    var result = prompt("请输入节点名称","");
        result = result.trim();
    if(result==''){
        alert("节点名称不能为空");
    }else{
        var div = document.createElement("div");
        var label = document.createElement("label");
        var span1 = document.createElement("span");
        var span2 = document.createElement("span");
        var span3 = document.createElement("span");
        span1.className = "add";
        span2.className = "delete";
        span3.className = "edit";
        span1.appendChild(document.createTextNode("添加"));
        span2.appendChild(document.createTextNode("删除"));
        span3.appendChild(document.createTextNode("重命名"));
        label.appendChild(document.createTextNode(result));
        label.appendChild(span1);
        label.appendChild(span2);
        label.appendChild(span3);
        div.appendChild(label);
        var children = node.children;
        if(children.length == 1){//没有子元素
            node.firstElementChild.className = "parentOpen";
        }
        if(node.firstElementChild.className == "parentClose"){//有子元素被隐藏了
            node.firstElementChild.className = "parentOpen";
            for(var i = 1; i < children.length; i++){
                children[i].style.display = 'block';
            }
        }
        node.appendChild(div);
    }
}
Tree.prototype.deleteNode = function(node){
    node.parentNode.removeChild(node);
}
Tree.prototype.edit = function(node){
    var result = prompt("请输入节点名称","");
    result = result.trim();
    if(result == ''){
        alert("节点不能为空");
    }else{
        var children = node.childNodes;
        for(var i = 0; i < children.length; i++){
            if(children[i].nodeType == 3){
                children[i].nodeValue = result;
                break;
            }
        } 
    }

}
/**基于广度优先原则**/
Tree.prototype.search = function(node,value){
    var currentNodes = this.nodeArr;
    this.nodeArr = [];
    for(var i = 0;i < currentNodes.length; i++){
        currentNodes[i].style.color = "#555";
    }
    var queue = [],count = 0;
    queue.push(node);
    while(node){
        var children = node.children,
        len = children.length;
        if(children[0].firstChild.nodeValue == value){
            var find = children[0];
            this.nodeArr.push(find);
            find.style.color = "#ff66aa";
            while(find.id!="root"){
                var find = find.parentNode;
                if(find.style.display == 'none'){
                    var ff = find.parentNode;
                    var label = ff.firstElementChild;
                    if(label.className == 'parentClose'){
                        label.className = 'parentOpen';
                        var children1 = ff.children,
                        len1 = children1.length;
                        for(var i = 1; i < len1; i++){
                            children1[i].style.display = 'block';
                        }
                    }else{
                        find.style.display = "block";
                    }
                }
            }
            count++;
        }
        for( var i = 1; i < len; i++){
            queue.push(children[i]);
        }
        queue.shift();
        node = queue[0];
    }
    if(count == 0){
        alert("没有找到对应的节点");
    }else{
        alert("找到了"+count+"个对应的节点");
    }
}
EventUtil.addHandler(window, "load", init);
function init(){
    var newTree = new Tree();
    EventUtil.addHandler($("#root"), "click", function(e){
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        if(target.tagName.toLowerCase() == 'label'){
            newTree.OpenClose(target);
        }else if(target.tagName.toLowerCase() == 'span'){
            switch(target.className){
                case "add": newTree.add(target.parentNode.parentNode);break;
                case "delete":newTree.deleteNode(target.parentNode.parentNode);break;
                default: newTree.edit(target.parentNode);break;
            }
        }
        
    });
    EventUtil.addHandler($("button"), "click" , function(){
        var value = $("#queryInput").value.trim();
        if(value == ''){
            alert("请输入节点名称！");
        }else{
            newTree.search($("#root"),value);
        }
    });
}