var EventUtil = {
    addHandler: function(element, type, handler){
        if(element.addEventListenter){
            return element.addEventListenter(type, handler, false);
        }else if(element.attachEvent){
            return element.attachEvent("on"+type, handler);
        }else{
            return element["on"+type] = handler;
        }
    },
    getEvent: function(e){
        return e || window.element;
    },
    getTarget: function(e){
        return e.target || e.srcElement;
    }
};
function $(l){ return document.querySelector(l); }
function Ship(element, p){
    this.rotate = 0;
    this.energy = 100;
    this.element = element;
    this.p = p;//控制台
    this.exist = false;
    this.isFly = false;
    this.pp = this.element.querySelector("p");
    this.span = this.element.querySelector("span");
    this.enerygyAdd = null;
    this.energySub = null;
}
Ship.prototype.fly = function(){
    if(this.isFly || !this.energy) return;
    if(this.energySub){
        clearInterval(this.energySub);
    }
    var self = this;
    var element =  this.element;
    this.isFly = true;
    this.enerygyAdd = setInterval(function(){
        if(--self.energy == 0){
            clearInterval(self.enerygyAdd);
            self.isFly = false;
            self.gianEnergy();
        }
        self.rotate += 5;
        self.changeShape();
    },100);
};
Ship.prototype.stop = function(){
    if(!this.isFly){//本来就没有飞行
        return;
    }else{
        this.gianEnergy();
        this.isFly = false;
        clearInterval(this.enerygyAdd);
    } 
};
Ship.prototype.distroy = function(){
    this.exist = false;
    this.element.style.display = "none";
    this.p.style.display = "none";
    this.rotate = 0;
    this.energy = 100;
    this.isFly = false;
    clearInterval(this.enerygyAdd);
    clearInterval(this.energySub);
    this.enerygyAdd = null;
    this.energySub = null;
};
Ship.prototype.emerage = function(){
    this.exist = true;
    this.element.style.display = "block";
    this.p.style.display = "block";
    this.changeShape();
};
Ship.prototype.gianEnergy = function(){
    if(this.energy >= 100)return;
    var self = this;
    this.energySub = setInterval(function(){
        self.energy++;
        if(self.energy == 100){
            clearInterval(self.energySub);
        }
        self.changeShape();
    },200);
};
Ship.prototype.changeShape = function(){
    this.element.style.transform = "rotate("+this.rotate+"deg)";
    this.pp.innerText = this.energy;
    this.span.style.width = this.energy+"%";
    if(this.energy < 33 && this.energy >= 0){
        this.span.style.backgroundColor = "red";
    }else if(this.energy >=33 && this.energy < 67){
        this.span.style.backgroundColor = "#FF9933";
    }else{
        this.span.style.backgroundColor = "#2288aa";
    }
};
(function(){
    var ships = [new Ship($("#ship1"),$("#controller1")), new Ship($("#ship2"),$("#controller2")), 
                 new Ship($("#ship3"),$("#controller3")), new Ship($("#ship4"),$("#controller4"))];
    var count = 0;
    var controller = $(".controller");
    var display = $("#console");
    EventUtil.addHandler(controller, "click", action);
    function action(e){
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        if(target.id == 'create'){
            if(count >= 4){
                alert("飞船数量不能超过四只，请销毁其它飞船！");
            }else{
                for(var i = 0; i < ships.length; i++){
                    if(!ships[i].exist){
                        ships[i].emerage();
                        count++;
                        break;
                    }
                }
            }
        }else{
            var order = target.id.slice(0,-1);
            var shipNum = Number(target.id.slice(-1));
            switch(order){
                case "fly":ships[shipNum-1].fly();break;
                case "stop":ships[shipNum-1].stop();break;
                case "distroy":ships[shipNum-1].distroy();count--;break;
            }
        }
    }
})();
