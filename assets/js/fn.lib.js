/**
 * +----------------------------------------------------------------------
 * | 公共函数库
 * +----------------------------------------------------------------------
 * | Author: 470211273@qq.com
 * +----------------------------------------------------------------------
 */

/**
 * 字符串切割
 * @param str
 * @param start 起始位置
 * @param end 结束位置
 * @returns str
 */
function cutStr(str, start, end){
	if( !str ){
		return;
	}
	start = start || 0;
	end = end || str.length;
	return str.slice(start, end);
}

/**
 * ajax请求，所有的请求都通过这里发送
 * @param options
 */
function ajaxAction(options){
    var defalutOptions = {
        url : "",
        method : "get",
        data : null,
        successCallback : null,
        failCallback : null
    };
    options = $.extend({}, defalutOptions, options);
    console.log(options);
    $.ajax({
        url : options.url,
        data : options.data,
        method : options.method,
        success : function(res){
            options.successCallback && options.successCallback(res);

        },
        fail : function(res){
            options.failCallback && options.failCallback(res);
        }
    });
}

/**
 * 验证手机号
 * @param str
 * @returns {boolean}
 */
function checkPhoneNum(str){
	if( !str ){
		return;
	}
	var reg = new RegExp("^((13[0-9])|(14[5,7,8,9])|(15[0-3,5-9])|(17[0,1,3,5-8])|(18[0-9])|166|198|199|(147))\\d{8}$");
	return reg.test(str);
}

/**
 * 倒计时
 * @param sec 倒计时实现，如60s
 * @param ele 显示容器
 * @param callback
 */
function countDown(sec, ele, callback){
	if( $(ele).length <= 0 ){
		var $ele = $(document);
	}else{
		var $ele = $(ele);
	}
	var s = sec || 60;
	$ele.text(s+"s");
	function calc(){
		timer = setTimeout(function(){
			s--;
			$ele.text(s+"s");
			if( s > 0 ){
				calc();
			}else{
				callback && callback.call();
			}
		},1000);
	}
	calc();
}

/**
 * 计算字符串长度，中文2个字符，英文一个字符
 * @param str
 * @returns {number}
 */
function calcCharacterSize(str){
    if(typeof str != "string"){
        return;
    }
    var len = 0;
    for (var i=0; i<str.length; i++) {
        if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {
            len += 2;
        } else {
            len ++;
        }
    }
    return len;
}

/**
 * 禁止某些字符输入输入
 * @param ele 显示容器
 * @param type 1：禁止空格输入
 *              2：禁止非数字字符输入
 *              3：禁止数字小数点以外的字符输入且第一个不能是小数点
 */
function forbidenInput(ele, type){
	var $ele = $(ele);
	if( $(ele).length <= 0 ){
		return;
	}
	switch(type){
		case 1:
            if( navigator.userAgent.indexOf("MSIE 8.0") > -1 ){
                $ele.on("keyup",function () {
                    $(this).val($(this).val().replace(/\s+/g,""));
                });
            }else{
                $ele.on("input",function () {
                    $(this).val( $(this).val().replace(/\s+/,"") );
                });
            }
			break;
		case 2:
			$ele.val($ele.val().replace(/\D/g,""));
			break;
        case 3:
			$ele.val($ele.val().replace(/[^\d.]*/g,""));
			break;
		default :
			break;
	}
}

$(document).on("keyup",function (event) {
    var $target = $(event.target);
    if( $target[0].nodeName.toLowerCase() == "input" && $target.attr("data-type") && $target.attr("data-type").toLowerCase() == "address" ){
        forbidenInput($target, 1);
        forbidenInput($target, 4);
    }
});

/**
 * 校验url
 * @param str_url
 * @returns {boolean}
 */
function isURL(str_url){
    if( typeof str_url !== "string" ){
        return false;
    }
    var reg = /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/;
    if (reg.test(str_url)){
        return (true);
    }else{
        return (false);
    }
}

/**
 * 批量向本地缓存中存储数据
 * @param item 格式为[{name:"对象名",val:"存储的值"},{name:"对象名",val:"存储的值"}]
 */
function saveStorage(item){
    if( !(item instanceof Array) ){
        return;
    }
    var len = item.length;
    for(var i=0; i<len; i++){
        if(typeof item[i].val == "string"){
            localStorage.setItem(item[i].name,item[i].val);
        }else{
            localStorage.setItem(item[i].name,JSON.stringify(item[i].val));
        }
    }
}

/**
 * 删除指定缓存
 * @param name
 * @param storageName
 */
function delStorage(name,storageName){
    if( !name && !storageName ){
        return
    }
    var storage = localStorage.getItem(storageName) ? JSON.parse(localStorage.getItem(storageName)) : "";
    if( !storage ){
        return;
    }
    var len = storage.length,
        index = -1;
    for(var i=0; i<len; i++){
        if(name == storage[i].code){
            index = i;
        }
    }
    index >= 0 ? storage.splice(index,1) : "";
    localStorage.removeItem(storageName);
    if(storage.length>0){
        localStorage.setItem(storageName, JSON.stringify(storage));
    }
}

/**
 * 获取指定缓存
 * @param [string] storageName
 * @return [array|object]
 */
function getStorage(storageName){
    if( !storageName || typeof storageName != "string"){
        return;
    }
    return localStorage.getItem(storageName) ? JSON.parse(localStorage.getItem(storageName)) : null;
}

/**
 * IE8 鼠标移入图片放大兼容
 * @param ele 图片容器
 */
function scaleCompatible(ele) {
    var $ele = $(ele);
    if( $ele.length <= 0 ){
        return;
    }
    if(navigator.userAgent.indexOf("MSIE 8.0") > -1){
        $ele.hover(function () {
            $(this).find("img").animate({
                "width" : "120%",
                "height" : "120%"
            },"fast");
        },function () {
            $(this).find("img").animate({
                "width" : "100%",
                "height" : "100%"
            },"fast");
        });
    };
}

/**
 * 屏蔽输入框特殊字符输入
 */
$(function () {
    $("html,body").on("keyup","input",function(){
        var $target = $(this);
        var value = $target.val();
        var lastV = value.substring(value.length-1,value.length);
        var pattern = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%&*（）\-+={}|《》？：“”【】、；‘’，。、]/im;
        var pattern1 = /[……——]/im;
        if(pattern.test(lastV)){
            $target.val(value.slice(0,value.length-1));
        }
        if(pattern1.test(lastV)){
            $target.val(value.slice(0,value.length-2));
        }
    });
})

/**
 * 过滤特殊字符
 * @param val
 * @returns {string}
 */
function filterSpecialSymbal(val) {
    if (!val) {
        return
    }
    val = String(val)
    return val.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, '')
}

/**
 * 禁止输入纯数字/字母/特殊符号
 * @param ele
 * @param str
 * @returns {boolean}
 */
function forBiddenPureSymbol(ele, str){
    var $ele = $(ele);
    if($ele.length<0 || $ele[0].nodeName.toLowerCase() !== 'input'){
        return
    }
    if(!str){
        return;
    }
    str = String(str);
    var reg=/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*+-_,.?''""~`{}[\](\){\}:;/]{6,24}/;
    return reg.test(str);
}

/**
 * IE8文字被placeholder插件改变颜色
 */
$(function () {
    $("html,body").on("keyup","input",function(){
        if($(this).val().length>0){
            $(this).css('color',"#333");
        }else{
            $(this).css('color',"#999");
        }
    });
    if (IEVersion==8 || IEVersion==9) {
        $("html,body").on("blur", "input", function () {
            if ($(this).val().length <= 0) {
                $(this).css('color', "#999"); // 输入文字后的颜色值
            }
        });
    }
})


/**
 * 检测IE版本
 */
var IEVersion = function() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return 7;
        } else if(fIEVersion == 8) {
            return 8;
        } else if(fIEVersion == 9) {
            return 9;
        } else if(fIEVersion == 10) {
            return 10;
        } else {
            return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 11; //IE11
    }else{
        return -1;//不是ie浏览器
    }
}();

/**
 * 检测属性是否可用，检测属性是否可用，比检测浏览器更靠谱
 * @param ele 元素
 * @param pn 属性
 * @returns {boolean}
 */
function checkProperty(ele,pn) {
    if( typeof ele != "string"){
        return;
    }
    if( !pn ){
        return;
    }
    var test = document.createElement(ele);
    if( test[pn] == "undefined" ){ // 若属性不存在返回的将是undefined，否则返回的是空字符串""
        return false;
    }
    return true;
}

/**
 * 监听粘贴(paste)事件
 * @param ele 需要监听的元素
 * @param callback
 */
function pasteListen(ele,callback){
    var $ele = $(ele);
    if( $ele.length <=0 ){
        return;
    }
    $ele.on("paste",function (event) {
        var val = "", $target = $(event.target);
        if (window.clipboardData && window.clipboardData.getData){
            val = $target.val() + window.clipboardData.getData('Text');
        }else{
            val = $target.val() + event.originalEvent.clipboardData.getData("Text");
        }
        callback && callback(val);
    });
}

/**
 * 全选/取消全选
 * @param ele string/jQuery Object
 * @param coc bool
 */
function checkAll(ele, coc) {
    var $ele = $(ele);
    if( $ele.length <= 0 || $ele.find("input[type='checkbox']").length <= 0 ){
        return;
    }
    coc = Boolean(coc);
    var $checkboxs = $ele.find("input[type='checkbox']");
    if( coc ){
        $checkboxs.each(function(index,item){
            $(item)[0].checked = true;
        });
    }else{
        $checkboxs.each(function(index,item){
            $(item)[0].checked = false;
        });
    }
}

/**
 * 复制指定信息到剪贴板
 * @param str string
 */
function copyToClipboard(str){
    var oInput = document.createElement('input');
    oInput.value = str;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    oInput.className = 'oInput';
    oInput.style.display='none';
    oInput.parentNode.removeChild(oInput);
}

/**
 * 将光标移到编辑框的最后
 * @param contentEditableElement
 */
function setEndOfContenteditable(contentEditableElement){
    var range,selection;
    if(document.createRange)
    {
        range = document.createRange();
        range.selectNodeContents(contentEditableElement);
        range.collapse(false);
        selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    } else if(document.selection) {
        range = document.body.createTextRange();
        range.moveToElementText(contentEditableElement);
        range.collapse(false);
        range.select();
    }
}

/**
 * 设置cookie
 * @param name string
 * @param value string
 * @param maxAge string 单位分钟
 * @param path string cookie路径，默认为当前路径
 */
function setCookie( name , value , maxAge, path ){
    if(path) {
        document.cookie = name + "=" + value + ";max-age=" + (maxAge * 60)+ ";path=" + path;
    }else{
        document.cookie = name + "=" + value + ";max-age=" + (maxAge * 60);
    }
}

/**
 * 获取cookie
 * @param name
 * @returns {string}
 */
function getCookie( name ){
    if(!name) return;
    var arr = document.cookie.split(";");
    var len = arr.length;
    for( var i = 0 ; i < len ; i++ ){
        var _a = arr[i].split("=");
        if( _a[0] === name ){
            return _a[1];
        }
    }
    return false;
}

/**
 * 移除cookie
 * @param name
 */
function removeCookie( name ){
    setCookie( name , -1 , -1 );
}

/**
 * 获取url中指定参数
 * @param name
 * @param url
 * @returns {string}
 * @constructor
 */
function GetQueryStringRegExp(name,url) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if ( reg.test(url) ) return decodeURIComponent( RegExp.$2.replace(/\+/g, " ") ) ; return "";
}

/**
 * 判断是否是闰年
 * @returns {boolean}
 */
Date.prototype.isLeapYear = function(){
    return ( 0 == this.getYear() % 4 && ( ( this.getYear() % 100 != 0 ) || ( this.getYear() % 400 == 0 ) ) );
}
/**
 * 格式化日期
 * @param formatStr
 * @returns {*}
 * @constructor
 */
Date.prototype.Format = function(formatStr){
    var str = formatStr;
    var Week = ['日','一','二','三','四','五','六'];

    str=str.replace(/yyyy|YYYY/,this.getFullYear());
    str=str.replace(/yy|YY/,(this.getYear() % 100)>9?(this.getYear() % 100).toString():'0' + (this.getYear() % 100));

    str=str.replace(/MM/,this.getMonth()>9?this.getMonth().toString():'0' + this.getMonth());
    str=str.replace(/M/g,this.getMonth());

    str=str.replace(/w|W/g,Week[this.getDay()]);

    str=str.replace(/dd|DD/,this.getDate()>9?this.getDate().toString():'0' + this.getDate());
    str=str.replace(/d|D/g,this.getDate());

    str=str.replace(/hh|HH/,this.getHours()>9?this.getHours().toString():'0' + this.getHours());
    str=str.replace(/h|H/g,this.getHours());
    str=str.replace(/mm/,this.getMinutes()>9?this.getMinutes().toString():'0' + this.getMinutes());
    str=str.replace(/m/g,this.getMinutes());

    str=str.replace(/ss|SS/,this.getSeconds()>9?this.getSeconds().toString():'0' + this.getSeconds());
    str=str.replace(/s|S/g,this.getSeconds());

    return str;
}

/**
 * 计算两个日期之间相差的天数
 * @param d1 开始时间
 * @param d2 结束时间
 * @returns {number}
 */
function daysDistance(d1, d2) {
    d1 = new Date(d1);
    d2 = new Date(d2);
    var dateTime = 24*60*60*1000,
        t1 = d1.getTime(),
        t2 = d2.getTime();
    var minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
    var days = Math.abs(minusDays);//取绝对值
    return days;
}

/**
 * 实时监测中文输入方法，key系列事件在中文还未输入阶段即可触发
 * compositionend在中文输入完成后才会触发
 * 该方法支持IE9+
 * @param size
 */
function chineseInput(size) {
    // 解决中文输入的问题
    $("input").on('compositionend',function () {
        if($(this).val().length>size){
            $(this).addClass("error")
        }else{
            $(this).removeClass("error");
        };
    });
    // 解决删除按钮的行为
    $("input").on('keyup',function (event) {
        if(event.keyCode == 8){
            if($(this).val().length<=size){
                $(this).removeClass("error");
            }
        }
    });
}

/**
 * 判断是不是数组
 * @param arr
 * @returns {*}
 */
function isArray(arr){
    if( Array.isArray ){
        return Array.isArray(arr);
    }else{
        return Object.prototype.toString.call(arr).toLowerCase().indexOf("array") > -1;
    }
}

/**
 * 判断是Android还是iOS
 * @returns {string}
 */
var mobileSystem = function(){
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
        return "Android"
    }else if(isiOS){
        return "iOS"
    }
}();

/**
 * 根据系统类型更改input框的属性
 * @param ele
 */
function fixTelInputType(ele) {
    var $ele = $(ele);
    if( $ele.length<=0 ){
        return;
    }
    if( mobileSystem.toLowerCase() == "ios" ){
        $(ele).attr("type","tel");
    }
}

/**
 * 禁止复制
 * @param cb 回调
 */
function copyForbiden(cb) {
    // 禁用复制，所有浏览器有效
    document.oncontextmenu = function(){
        return false;
    }

    window.document.onkeydown = function(event){
        var evt = event || window.event
        if((evt.ctrlKey) && (evt.keyCode == 67)){
            evt.returnValue = false; // 兼容IE
            evt.preventDefault && evt.preventDefault() // 兼容firfox
            cb && cb()
        }
    }
}


/**
 ***********************************************************************************
 ********************************** 插件用法*****************************************
 * *********************************************************************************
 **/

/**
 * 插件名：datepicker.js
 * 实现功能：两个时间选择框，结束时间是开始时间后的31天，限制开始时间不能大于结束时间
 */
// 开始时间
$('#start_time').datepicker({
    todayBtn : "linked",
    autoclose : true,
    todayHighlight : true,
    endDate : new Date()
}).on('changeDate',function(e){
    var startTime = e.date,
        endTime = new Date(e.date.getTime()+(31*24*60*60*1000));
    $('#end_time').datepicker('setStartDate',startTime);
    $('#end_time').datepicker('setEndDate',endTime);
});
//结束时间：
$('#end_time').datepicker({
    todayBtn : "linked",
    autoclose : true,
    todayHighlight : true,
    endDate : new Date()
}).on('changeDate',function(e){
    var endTime = new Date(e.date.getTime()+(24*60*60*1000));
    $('#start_time').datepicker('setEndDate',endTime);
});


/**
 * 插件名：datepicker.js
 * 实现功能：两个时间选择框，结束时间大于开始时间给提示，时间间隔超过31天给提示，需要三个辅助函数
 */
$('.datepicker').datepicker({
    autoclose: true,
    format: 'yyyy-mm-dd',
    todayBtn: true,
    endDate:"{:date('Y-m-d')}"
}).on("change",function(){
    var $form = $(this).closest('form'),
        $inputBegin = $form.find('input[name=begin]'),
        $inputEnd = $form.find('input[name=end]');
    var flag = diffDate($inputBegin.val(), $inputEnd.val());
    if (!flag) {
        msg("结束时间不能小于开始时间", function(){
            $inputEnd.val("");
        });
    }
    if ($inputBegin.val() && $inputEnd.val()) {
        var outTime = isTimeOut($inputBegin.val(), $inputEnd.val(), 31)
        if (outTime) {
            msg("开始时间和结束时间不能超过31天", function(){
                $inputBegin.val("");
                $inputEnd.val("");
            });
        }
    }
});
function diffDate(startDate, EndDate) {
    var arry1 = startDate.split('-'),
        sDate = new Date(arry1[0], arry1[1], arry1[2]),
        arry2 = EndDate.split('-'),
        eDate = new Date(arry2[0], arry2[1], arry2[2]);
    if (sDate > eDate) {
        return false
    } else {
        return true
    }
}
function isTimeOut(startDate, EndDate, day) {
    var arry1 = startDate.split('-'),
        sDate = new Date(arry1[0], arry1[1], arry1[2]),
        arry2 = EndDate.split('-'),
        eDate = new Date(arry2[0], arry2[1], arry2[2]);
    return Math.abs(sDate.getTime() - eDate.getTime()) > (day * 24 * 60 * 60 * 1000);
}
function msg(msg, fn) {
    layer.msg(
        msg,
        {time: 1300,},
        fn || function () {
        }
    )
}

/**
 * 插件名：datetimepicker.js 该插件和datepicker唯一的不同就是可以精确到时分
 * 实现功能：两个时间选择框，结束时间大于开始时间给提示，时间间隔超过31天给提示，需要三个辅助函数
 */
$('.datepicker').datepicker({
    weekStart: 1,
    todayHighlight: 1,
    todayBtn: true,
    minView: 0,
    autoclose: true,
    language: 'zh-CN'
}).on("change", function () {
    if (toTimeStamp($("input[name=time_start]").val()) > toTimeStamp($("input[name=time_end]").val())) {
        msg("结束时间不得早于开始时间", function () {
            $("input[name=time_end]").val("");
        });
    }
});


/**
 * fileinput插件无法处理限制多张图片上传的问题（同时选择多张可以完美的限制，但分开选择就可以绕开这个限制），因此用下面的办法来处理，本质上是利用事件冒泡捕获来实现的
 */
$(selector).on("click", function (event) {
    if('条件'){
        layer.msg("只能上传一张")
        return false
    }
})
