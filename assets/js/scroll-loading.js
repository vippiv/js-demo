/**
 * +----------------------------------------------------------------------
 * | 滚动加载
 * +----------------------------------------------------------------------
 * | Author: 470211273@qq.com
 * +----------------------------------------------------------------------
 */
var loading = false, page = 2;
$(document.body).infinite().on("infinite", function() {
    if(loading) return;
    $(".weui-loadmore").fadeIn(0);
    loading = true;
    page = parseInt($('.weui-loadmore__tips').attr('data-id'));
    if(page >= 5){
        $('.weui-loading').hide();
        $('.weui-loadmore__tips').html('到底了~');
        return;
    }
    setTimeout(function () {
        ajaxAction({
            url : "http://zwl.com/stu_list",
            method: "get",
            data: {
                // page_current: page,
            },
            successCallback:function (response) {
                var res = JSON.parse(response)
                if(res.error_code == 0){
                    var data = res.data
                    var tplStr = template('tmpl', data);
                    $('.stu_box').append(tplStr);
                    page++
                    loading = false;
                    $('.weui-loadmore__tips').attr('data-id', page);
                }
            }
        });
    }, 500)
});


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
