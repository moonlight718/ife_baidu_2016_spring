var addHandler = function(element, type, handler){
    if(element.addEventListenter){
        return element.addEventListenter(type, handler, false);
    }else if(element.attachEvent){
        return element.attachEvent("on" + type, hadler);
    }else{
        return element["on" + type] = handler;
    }
};

function $(l){ return document.querySelector(l); }
var check = (function(){
    var nameText = ["名称可用","名称不能为空","名称长度不能小于4个字符","名称长度不能大于16个字符","名称不能包含除了中英文字符和数字以外的其他字符"];
    var password1Text = ["密码可用","密码不得为空","密码长度不能小于9个字符","密码长度不能超出26个字符","密码不能包含除了字母和数字以外的其它字符"];
    var password = "";
    var password2Text = ["密码正确","密码重复不能为空","两次输入密码不同"];
    var emailText = ["格式正确","邮箱地址不能为空","邮箱地址格式不正确"];
    var phoneText = ["格式正确","手机号不能为空","手机号格式不正确"];
    return {
        checkName: function(value){
            if(value == "") return nameText[1];
            if(value.length < 4) return nameText[2];
            if(value.length > 16) return nameText[3];
            if(/[^a-z0-9\u4e00-\u9fa5]/i.test(value))return nameText[4];
            return nameText[0];
        },
        checkPassword1: function(value){
            if(value == '') return password1Text[1];
            if(value.length < 9) return password1Text[2];
            if(value.length > 26) return password1Text[3];
            if(/[^a-z0-9]/i.test(value)) return password1Text[4];
            password = value;
            return password1Text[0];
        },
        checkPassword2: function(value){
            if(value == '') return password2Text[1];
            if(value != password) return password2Text[2];
            return password2Text[0];
        },
        checkEmail: function(value){
            if(value == '') return emailText[1];
            if( /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) return emailText[0];
            return emailText[2];
        },
        checkPhone: function(value){
            if(value == '') return phoneText[1];
            if(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value)) return phoneText[0];
            return phoneText[2];
        }
    };
})(); 

(function(){
    var name = $("#name"),
    nameD = $("#nameD"),
    password1 = $("#password1"),
    password1D = $("#password1D"),
    password2 = $("#password2"),
    password2D = $("#password2D"),
    email = $("#email"),
    emailD = $("#emailD"),
    phone = $("#phone"),
    phoneD = $("#phoneD"),
    button = $("#button");
    addHandler(name,"focus",function(){
        nameD.innerText = "必填，长度为4~16个字符，只能输入中英文字母和数字";
        nameD.style.color = "#ccc";
        name.style.border = "1px solid #08c";
    });
    addHandler(name,"blur",function(){
        var text = check.checkName(name.value);
        nameD.innerText = text;
        if(text == "名称可用"){
            name.style.border = "2px solid #66ff00";
            nameD.style.color = "#66ff00";
        }else{
            name.style.border = "2px solid #ff0000";
            nameD.style.color = "#ff0000";
        }
    });
    addHandler(password1,"focus",function(){
        password1D.innerText = "必填，长度为9~26个字符，只能输入英文字母和数字";
        password1D.style.color = "#ccc";
        password1.style.border = "1px solid #08c";
    });
    addHandler(password1,"blur",function(){
        var text = check.checkPassword1(password1.value);
        password1D.innerText = text;
        if(text == "密码可用"){
            password1.style.border = "2px solid #66ff00";
            password1D.style.color = "#66ff00";
        }else{
            password1.style.border = "2px solid #ff0000";
            password1D.style.color = "#ff0000";
        }
    });
    addHandler(password2,"focus",function(){
        password2D.innerText = "请再次输入密码";
        password2D.style.color = "#ccc";
        password2.style.border = "1px solid #08c";
    });
    addHandler(password2,"blur",function(){
        var text = check.checkPassword2(password2.value);
        password2D.innerText = text;
        if(text == "密码正确"){
            password2.style.border = "2px solid #66ff00";
            password2D.style.color = "#66ff00";
        }else{
            password2.style.border = "2px solid #ff0000";
            password2D.style.color = "#ff0000";
        }
    });
    addHandler(email,"focus",function(){
        emailD.innerText = "必填，请输入邮箱地址";
        emailD.style.color = "#ccc";
        email.style.border = "1px solid #08c";
    });
    addHandler(email,"blur",function(){
        var text = check.checkEmail(email.value);
        emailD.innerText = text;
        if(text == "格式正确"){
            email.style.border = "2px solid #66ff00";
            emailD.style.color = "#66ff00";
        }else{
            email.style.border = "2px solid #ff0000";
            emailD.style.color = "#ff0000";
        }
    });
    addHandler(phone,"focus",function(){
        phoneD.innerText = "必填，请输入手机号";
        phoneD.style.color = "#ccc";
        phone.style.border = "1px solid #08c";
    });
    addHandler(phone,"blur",function(){
        var text = check.checkPhone(phone.value);
        phoneD.innerText = text;
        if(text == "格式正确"){
            phone.style.border = "2px solid #66ff00";
            phoneD.style.color = "#66ff00";
        }else{
            phone.style.border = "2px solid #ff0000";
            phoneD.style.color = "#ff0000";
        }
    });
    addHandler(button, 'click' , function(){
        if(nameD.style.color == "rgb(102, 255, 0)" && 
        password1D.style.color == "rgb(102, 255, 0)" && 
        password2D.style.color=='rgb(102, 255, 0)' && 
        emailD.style.color == 'rgb(102, 255, 0)' && 
        phoneD.style.color == "rgb(102, 255, 0)"){
            alert("输入正确");
        }else{
            alert("输入有误");
        }
    })
})();
