/**
 * +----------------------------------------------------------------------
 * | 检测某项功能/版本
 * +----------------------------------------------------------------------
 * | Author: 470211273@qq.com
 * +----------------------------------------------------------------------
 */
var isIE = function (ver) {
    // check for IE versions < 11
    if (navigator.appName !== 'Microsoft Internet Explorer') {
        return false;
    }
    if (ver === 10) {
        return new RegExp('msie\\s' + ver, 'i').test(navigator.userAgent);
    }
    var div = document.createElement("div"), status;
    div.innerHTML = "<!--[if IE " + ver + "]> <i></i> <![endif]-->";
    status = div.getElementsByTagName("i").length;
    document.body.appendChild(div);
    div.parentNode.removeChild(div);
    return status;
};
var isEdge = function () {
    return new RegExp('Edge\/[0-9]+', 'i').test(navigator.userAgent);
};
