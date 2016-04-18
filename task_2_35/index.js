var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListener){
            return element.addEventListener(type, handler, false);
        }else if(element.attachEvent){
            return element.attachEvent("on" + "type", handler);
        }else{
            return element["on" +type] = handler;
        }
    },
    getEvent: function(e){
        return e || window.event;
    },
    getTarget: function(e){
        return e.target || e.srcElement;
    }
};
function $(l){return document.querySelector(l);}
var qiPan = {
    left:150,
    top:50,
    bottom:550,
    right:650
};
var text = {
    rows:1
};
function Block(top, left, degree){
    this.top = top;
    this.left = left;
    this.degree = degree;
    this.block = $("#block");
    this.rotate = 0;
}
Block.prototype = {
    Go: function(degree){
        switch(degree){
            case 90: if(this.top - 50 > qiPan.top){
                this.top = this.top-50;
            }
            break;
            case 0: if(this.left + 50 < qiPan.right){
                this.left = this.left + 50;
            }
            break;
            case 180: if(this.left - 50 >= qiPan.left){
                this.left = this.left - 50;
            }
            break;
            case 270: if(this.top + 50 <= qiPan.bottom){
                this.top = this.top + 50;
            }
            break;
        }
        this.block.style.top = this.top + "px";
        this.block.style.left = this.left + "px";
    },
    Left: function(){
        this.degree = (this.degree + 90) % 360;
        this.rotate = this.rotate - 90;
        this.block.style.transform = "rotate(" + this.rotate + "deg)";
    },
    Right: function(){
        this.degree = (this.degree - 90 + 360) % 360;
        this.rotate = this.rotate + 90;
        this.block.style.transform = "rotate(" + this.rotate + "deg)";
    },
    Back: function(){
        this.degree = (this.degree + 180) % 360;
        this.rotate = this.rotate + 180;
        this.block.style.transform = "rotate(" + this.rotate + "deg)";
    },
    Mov:function(degree) {
        this.degree = degree;
        this.rotate = -(degree - 90);
        this.block.style.transform = "rotate(" + this.rotate + "deg)";
        
    }
};
(function(){
    var block = new Block(200, 350, 90);
    var orderText = $("#orderText");
    var number = $(".number");
    function action(text){
        switch(text){
            case "GO": block.Go(block.degree);break;
            case "TUN LEF": block.Left();break;
            case "TUN RIG":block.Right();break;
            case "TUN BAC":block.Back();break;
            case "TRA LEF":block.Go(180);break;
            case "TRA TOP":block.Go(90);break;
            case "TRA RIG":block.Go(0);break;
            case "TRA BOT":block.Go(270);break;
            case "MOV LEF":block.Mov(180); block.Go(block.degree);break;
            case "MOV TOP":block.Mov(90);  block.Go(block.degree);break;
            case "MOV RIG":block.Mov(0); block.Go(block.degree);break;
            case "MOV BOT":block.Mov(270); block.Go(block.degree);break;
            default: return true;
        }
    }
    EventUtil.addHandler($(".order"), "click" , function(e){
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        if(target.tagName.toLowerCase() == 'button'){
            action(target.id);
        }
    });
    EventUtil.addHandler(orderText, "keyup", function(e){
        e = EventUtil.getEvent(e);
        if(e.keyCode == 13){//回车
            var div = document.createElement("div");
            div.appendChild(document.createTextNode(++text.rows));
            number.appendChild(div);
        }else if(e.keyCode == 8){//退格
            var rows = orderText.value.split('\n').length;
            if(rows != text.rows){
                text.rows--;
                number.removeChild(number.lastElementChild);
            }
        }
    });
     EventUtil.addHandler(orderText, "scroll", function(){
         number.scrollTop = orderText.scrollTop;
     });
     EventUtil.addHandler($("#refresh"), "click", function(){
         text.rows = 1;
         number.innerHTML = "<div>1</div>";
         orderText.value = "";
     });
    EventUtil.addHandler($("#submit"), "click", function(){
        var order = orderText.value.split('\n');
        var i = 0;
        animation();
        function animation(){
            if(i < order.length){
                var result = action(order[i]);
                if(result){
                    number.children[i].style.background = "red";
                }
                i++;
                setTimeout(animation,400);
            }
        }
    });
})();
