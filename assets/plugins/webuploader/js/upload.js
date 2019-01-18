//  图片webupload 上传
var $list;
var countnum = 0;

function myUp(picCon, listCon) {
    $list = $(listCon);

    var $filePicker = $(picCon), // 上传按钮
        $upimgmax =11, // 支持上传最大个数
        // 优化retina, 在retina下这个值是2
        ratio = window.devicePixelRatio || 1,
        // 缩略图大小
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio,
        //初始化对象
        initObj = {
            // 自动上传。
            auto: true,
            // swf文件路径
            swf: '/assets/js/Plugin/webuploader/js/Uploader.swf',
            // 文件接收服务端。
            server: "/img/upload/",  //  这里是图片上传地址
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash
            pick: {
                id: $filePicker,
                // multiple: false
            },
            duplicate: true,
            fileSingleSizeLimit: 6* 1024 *1024, //  单个文件大小
            fileNumLimit: $upimgmax, // 限制上传个数
            accept: {
                title: 'Images',
                extensions: 'jpg,jpeg,png,bmp',
                mimeTypes: 'image/jpg,image/jpeg,image/png,image/bmp,' //修改这行
            },
            thumb: {
                width: 100,
                height: 100,
                // 图片质量，只有type为`image/jpeg`的时候才有效。
                quality: 70,
                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: true,
                // 是否允许裁剪。
                crop: true,
                // 为空的话则保留原有图片格式。
                // 否则强制转换成指定的类型。
                type: 'image/jpeg'
            }
        };

    // 初始化Web Uploader
    var uploader = WebUploader.create(initObj);


    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {

        var $li = $(
            '<div id="' + file.id + '" class="file-item thumbnail">' + '<input class="nameval" type="hidden" value=""/>' +
            '<img>' + '<span class = "cancel delimgbtns" title="删除"><i class="fa fa-close" aria-hidden="true"></i></span>'
            // '<div class="info">' + file.name + '</div>' +
            //'<div class = "file-panel" style = "height: 30px;" ><input class="inbiaoti" type="text" valur="" placeHolder="点击输入标题"></div>' +
            //'</div>'
            ),
            $img = $li.find('img');

        $list.append($li);
        removefiles(file); // 文件删除
        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
        var uploadfilesNum = uploader.getStats().queueNum; //  共选中几个图片
        // 最多支持 5张
        // console.log(222,$list.data('value'))
        // console.log(222,$list.parent('.controls').data('name'))
        var limitValue = parseInt($list.data('value'))

        var tempName = $list.parent('.controls').data('name')
        if(tempName == "cover-img" ){
            if ($list.find('.file-item').length >= 5) {
                // $filePicker.hide();
                $('.cover-control .filePicker').hide()
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.canupload').text($list.find('.file-item').length);
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.yuupload').text(limitValue - $list.find('.file-item').length);
                if ($list.find('.file-item').length > 5) {
                    // 中断 取消 大于  5张图片的对象
                    uploader.removeFile(file, true);
                    $list.find('.file-item').last().remove();
                    // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.canupload').text($list.find('.file-item').length);
                    // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.yuupload').text(limitValue - $list.find('.file-item').length);
                }
            } else {
                // $filePicker.show();
                $('.cover-control .filePicker').show();
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.canupload').text($list.find('.file-item').length);
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.yuupload').text(limitValue - $list.find('.file-item').length);

            }
        } else if(tempName == "cover-detail" ){
            if ($list.find('.file-item').length >= 6) {
                // $filePicker.hide();
                $('.detail-control .filePicker').hide()
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.canupload').text($list.find('.file-item').length);
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.yuupload').text(limitValue - $list.find('.file-item').length);
                if ($list.find('.file-item').length > 6) {
                    // 中断 取消 大于  5张图片的对象
                    uploader.removeFile(file, true);
                    $list.find('.file-item').last().remove();
                    // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.canupload').text($list.find('.file-item').length);
                    // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.yuupload').text(limitValue - $list.find('.file-item').length);
                }
            } else {
                // $filePicker.show();
                $('.detail-control .filePicker').show();
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.canupload').text($list.find('.file-item').length);
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.yuupload').text(limitValue - $list.find('.file-item').length);

            }
        }

    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');
        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>').appendTo($li).find('span');
        }
        $percent.css('width', percentage * 100 + '%');
    });
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        var $li = $('#' + file.id),
            $img = $li.find('img'),
            $fileUrl = response.data[0].url, // 图片上传地址
            $filename = file.name, // 上传文件名称
            $filesize = (file.size / 1024).toFixed(2); // 上传文件尺寸大小 保留2位
        $li.addClass('upload-state-done');
        $('#' + file.id).find('.nameval').val(response.data)
        $img.attr('src', $fileUrl);
        removefiles(file); // 删除文件
        removehttpfiles();
        // 传值赋值
        // 商品详细图片 位置
        // 这里自己赋值 传值
    });

    uploader.on("error", function (type) {
        if (type == "F_EXCEED_SIZE") {
            var tishixin = "文件大小不能超过6M";
            tishitip(tishixin, 2)
            totalnumber(countnum);
            // alert("文件大小不能超过6M");
        } else {
            console.log(type)
            // alert("上传出错！请检查后重新上传！错误代码"+type);
            // tishitip("上传出错！请检查后重新上传！错误代码"+type,2)
        }
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {

        countnum++;
        var $li = $('#' + file.id),
            $error = $li.find('div.error');
        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }
        $error.text('上传失败');
        totalnumber(countnum);
    });
    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        countnum++
        $('#' + file.id).find('.progress').remove();
        totalnumber(countnum);


        // 获取文件统计信息。返回一个包含一下信息的对象。
        /*successNum 上传成功的文件数
        progressNum 上传中的文件数
        cancelNum 被删除的文件数
        invalidNum 无效的文件数
        uploadFailNum 上传失败的文件数
        queueNum 还在队列中的文件数
        interruptNum 被暂停的文件数
        */
        // console.log(uploader.getStats().uploadFailNum);
    });
    uploader.on('error', function (handler) {
        if (handler == "Q_EXCEED_NUM_LIMIT") {
            // tishitip("最多只能上传9张图片！")
            // layer.msg("最多只能上传 " + $upimgmax + "张图片");
        }
    });

    // 删除按钮事件
    function removefiles(file) {
        // 删除本条数据
        // $('.delimgbtns').each(function(index, el) {
        $('.delimgbtns').click(function () {
            var temp = $(this).parents('.controls').data('name')
            // 中断 取消 传图
            uploader.removeFile(file, true);
            var spthisdiv = $(this);
            spthisdiv.parent('.file-item').remove();
            if(temp == 'cover-img'){
                // $filePicker.show(); // 上传按钮显示
                $('.cover-control .filePicker').show();
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.canupload').text($list.find('.file-item').length);
                // $list.closest(".uploadpicwk").siblings('.zhangshuxz').children('.yuupload').text($upimgmax - $list.find('.file-item').length);
            }else if(temp == 'cover-detail'){
                $('.detail-control .filePicker').show();
            }

        });
        // });
    }
    function tishitip(message){
        layer.msg(message)
    }

    // 删除服务器文件
    function removehttpfiles() {
        // 删除本条数据
        // $('.delimgbtns').each(function(index, el) {
        $('.delimgbtns').click(function () {
            // event.preventDefault();
            var spthisdiv = $(this);
            // 如果上传成功才执行
            var thisimgsrc = spthisdiv.siblings('img').attr('src');
            var geturl = "attach/deleteFlowFile";
            // $.axpost(
            //     geturl, {
            //         url: thisimgsrc,
            //     },
            //     //请求成功时处理
            //     function(data) {
            //         layer.msg('删除成功');
            //     });
        });

    }

    $("body").on("click", ".filePicker", function () {
        $list = $(this).prev(".fileList");
        countnum = $list.find('.file-item').length;
        $('#save-btn').attr("disabled", true)
    });

}

for (var i = 0; i < $(".shigongwk").length; i++) {

    var index = $(".defalutaddpic").eq(i).attr("data-index");
    var className = ".filePicker-" + index;

    myUp(className, ".fileList-" + index);
    // console.log(className)
}

myUp('.filePicker', '.uploader-list');


function totalnumber(number) {
    // console.log(($list))
    // console.log(11,$list.parent(".controls").data("name"))
    var temp = $list.parent(".controls").data("name")
    if(temp == 'cover-img'){
        if($list.find('.file-item').length > 5){
            $('.cover-control .webuploader-pick').attr("disabled", false).hide()
        }
    }else if(temp == 'cover-detail'){
        if($list.find('.file-item').length > 6){
            $('.detail-control .webuploader-pick').attr("disabled", false).hide()
        }
    }
   /* var getnumber = $list.find('.file-item').length;
    if (getnumber == number) {
        $('#save-btn').attr("disabled", false)
    }*/
}

