var EventUtil = {
    addHandler:function(element,type,handler){
        if(element.addEventListener){
            return element.addEventListener(type,handler,false);
        }else if(element.attachEvent){
            return element.attachEvent("on"+type,handler);
        }else{
            return element["on"+type] = handler;
        }
    },
    getEvent:function(event){
        return event ? event:window.event;
    },
    getTarget:function(event){
        return event.target || event.srcElement;
    }
};
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();//年
  var m = dat.getMonth() + 1;//月
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);//Math.ceil执行向上舍入
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
console.log(aqiSourceData);
// 用于渲染图表的数据

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
var  chartData = {};
/**
 * 渲染图表
 */
function renderChart() {
    var text = [];
    var data = chartData[pageState.nowSelectCity][pageState.nowGraTime];
    var dataArr =Object.getOwnPropertyNames(data);
    var length = dataArr.length;
    var width = 1200/(length*2+1);
    var i=0;
    var color = ["#996633","#666600","#99CC99","#FFCC99","#FF9999","#996699","#CCCCFF","#CCCC99"];
    for(var pro in data){
        var j = Math.ceil(Math.random()*7);
        text.push('<div style="width:'+width+'px;height:'+data[pro]+'px;left:'+(2*i+1)*width+'px;background:'+color[j]+';"><p class="alert">'+pro+':'+data[pro]+'</p></div>');
        i++;
   }
    document.querySelector(".aqi-chart-wrap").innerHTML = text.join("");
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {//修改了单选
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if(target.tagName.toLowerCase() =='input'){
        var city = document.getElementById("city-select").value,
            radio = document.getElementsByName("gra-time"),
            radioLength = radio.length,
            time;
        for(var i=0;i<radioLength;i++){
            if(radio[i].checked == true){
                time = radio[i].value;
            }
        }
        if(time == pageState.nowGraTime){
            return;
        }else{
            pageState.nowGraTime = time;
            renderChart();
        }    
    }

  // 确定是否选项发生了变化 
    
  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var selectValue = document.getElementById("city-select").value;
    pageState.nowSelectCity = selectValue;
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var radio = document.getElementById("form-gra-time");
    EventUtil.addHandler(radio,"click",graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var text = [],i = true;
    for(var pro in aqiSourceData){
        if(!i){
            text.push('<option value="'+pro+'">'+pro+'</option>');
        }else{//将第一个城市选中，并设置pageState中的city值
            text.push('<option value="'+pro+'" selected = "selected">'+pro+'</option>');
            i = false;
            pageState.nowSelectCity = pro;
        }
        
    }
    var city = document.getElementById("city-select");
    city.innerHTML = text.join("");
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    EventUtil.addHandler(city,"change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    for(city in aqiSourceData){
        var cityArr = Object.getOwnPropertyNames(aqiSourceData[city]);
        var cityData = aqiSourceData[city];
        var monthSum = 0 , monthCount=0 ,month={} ,weekSum = 0 ,weekCount = 0,week={},weekDay = 0;
        var weekInit = 4;//周四
        var monthInit = cityArr[0].slice(5,7);
        for(var i=0;i<cityArr.length;i++){
            if(cityArr[i].slice(5,7)==monthInit){//在同一个月
                monthSum += cityData[cityArr[i]];
                monthCount++;
                if(i==cityArr.length-1){//最后一天
                    month['2016-'+monthInit] = Math.ceil(monthSum/monthCount);
                }
                /**周**/
                weekInit++;
                if(weekInit%7!=1){//下一周的第一天
                    weekSum += cityData[cityArr[i]];
                    weekCount++;
                }else{
                    weekDay++;
                    week['2016-'+monthInit+'第'+weekDay+'周'] = Math.ceil(weekSum/weekCount);
                    weekCount = 1;
                    weekSum = cityData[cityArr[i]];
                }
            }else{
                month['2016-'+monthInit] = Math.ceil(monthSum/monthCount);
                monthCount = 1;
                monthSum = cityData[cityArr[i]];
                monthInit = cityArr[i].slice(5,7);
                weekDay = 0;
                weekCount = 0;
                weekSum = cityData[cityArr[i]];
                weekInit++;
                
            }
        }
        chartData[city] = {};
        chartData[city]["month"] = month;
        chartData[city]['week'] =  week;
        chartData[city]["day"] = aqiSourceData[city];
    }
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
EventUtil.addHandler(window,"load",init);


