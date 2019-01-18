/**
 * +----------------------------------------------------------------------
 * | copy-forbiden
 * +----------------------------------------------------------------------
 * | Author: 470211273@qq.com
 * +----------------------------------------------------------------------
 */
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

// 回调
function copyForbidenCb() {
    alert("禁止复制")
}

copyForbiden(copyForbidenCb)
