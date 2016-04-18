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
function $(l){ return document.querySelector(l);}
(function(){
    var data = {"bj":["北京大学","清华大学","人民大学","北京邮电大学"],
                "sh":["复旦大学","上海理工大学","上海交通大学"],
                "sc":["四川大学","电子科技大学","西南财经大学"]
                };
    var student = "schoolStudent";
    var schoolStudent = $("#schoolStudent");
    var notSchoolStudent = $("#notSchoolStudent");
    var city = $("#city");
    var school = $("#school");
    EventUtil.addHandler($("#change"), "click", function(e){
        e = EventUtil.getEvent(e);
        var target = EventUtil.getTarget(e);
        if(target.tagName.toLowerCase() == 'input' ){
            if(target.id == student){
                return;
            }else{
                $("#" + target.id + "1").removeAttribute("class");
                $("#" + student + "1").className = "missing";
                student = target.id;
            }
        }
    });
    EventUtil.addHandler(city, "change" ,function(){
        school.innerHTML = data[city.value].map(function(item){
            return "<option>" + item + "</option>";
        }).join("");
    });
})();