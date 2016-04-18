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
function Block(top, left, degree){
    this.top = top;
    this.left = left;
    this.degree = degree;
    this.block = $("#block");
    this.rotate = 0;
}
Block.prototype = {
    Go: function(){
        switch(this.degree){
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
        
    }
};
(function(){
    var block = new Block(200, 350, 90);
    var order = $(".order");
    var submit = $("#submit");
    var orderText = $("#orderText");
    function action(text){
        switch(text){
            case "GO": block.Go();break;
            case "TUN LEF": block.Left();break;
            case "TUN RIG":block.Right();break;
            case "TUN BAC":block.Back();break;
            default: alert("无效命令");
        }
    }
    EventUtil.addHandler(order , "click" , function(e){
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        action(target.id);
    });
    EventUtil.addHandler(submit, "click", function(){
        action(orderText.value);
    });
})();
