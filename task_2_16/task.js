var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            return element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            return element.attachEvent("on"+type,handler);
        }else{
            return element["on"+type]=handler;
        }
    },
    getEvent:function(event){
        return event?event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    }
};
function renderAqiList(city,value){
    var tr = document.createElement("tr");
    var deleteBtn = document.createElement("button");
    deleteBtn.appendChild(document.createTextNode("删除"));
    tr.insertCell(0);
    tr.cells[0].appendChild(document.createTextNode(city));
    tr.insertCell(1);
    tr.cells[1].appendChild(document.createTextNode(value));
    tr.insertCell(2);
    tr.cells[2].appendChild(deleteBtn);
    document.getElementById("aqi-table").appendChild(tr);
}
function addBtnHandle() {
    var city = document.getElementById("aqi-city-input").value.replace(/(^\s*)|(\s*$)/g, ""),
        aqiValue = document.getElementById("aqi-value-input").value.replace(/(^\s*)|(\s*$)/g, ""),
        cityMatch = /^[a-zA-Z\u4e00-\u9fa5]+$/,
        aqiValueMatch = /^[0-9]+$/,
        tag = false,
        cityAlert = document.getElementById("city-alert"),
        valueAlert = document.getElementById("value-alert");
        cityAlert.innerText = "";
        valueAlert.innerText = "";
    if(!cityMatch.test(city)){
        cityAlert.innerText = "城市名称格式有误，只能输入中英文字符且不能为空。";
        tag = true;
    }
    if(!aqiValueMatch.test(aqiValue)){
        valueAlert.innerText = "空气质量指数输入有误，只能输入数字且不能为空。";
        tag = true;
    }
    if(tag){
        return;
    }else{
        renderAqiList(city,aqiValue);
    }
}

function delBtnHandle(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase() =='button'){
        var i=target.parentNode.parentNode.rowIndex;
        document.getElementById('aqi-table').deleteRow(i);
    }
}

function init(){
    var btn = document.getElementById("add-btn");
    EventUtil.addHandler(btn,"click",addBtnHandle);
    var table = document.getElementById("aqi-table");
    EventUtil.addHandler(table,"click",delBtnHandle);
}
EventUtil.addHandler(window,"load",init);