/**
 * +----------------------------------------------------------------------
 * | fileinput 实例化
 * +----------------------------------------------------------------------
 * | Author: 470211273@qq.com
 * +----------------------------------------------------------------------
 */
$("#file-0").fileinput({
    'allowedFileExtensions' : ['jpg', 'png','gif'],
});
$("#file-1").fileinput({
    language: 'zh',
    uploadUrl: '#', // you must set a valid URL here else you will get an error
    allowedFileExtensions : ['jpg', 'png','gif'],
    overwriteInitial: false,
    maxFileSize: 1000,
    maxFilesNum: 10,
    //allowedFileTypes: ['image', 'video', 'flash'],
    slugCallback: function(filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
});
/*
$(".file").on('fileselect', function(event, n, l) {
    alert('File Selected. Name: ' + l + ', Num: ' + n);
});
*/
$("#file-3").fileinput({
    language: 'zh',
    showUpload: false,
    showCaption: false,
    browseClass: "btn btn-primary btn-lg",
    fileType: "any",
    previewFileIcon: "<i class=\"fa fa-address-book\" aria-hidden=\"true\"></i>"
});
$("#file-4").fileinput({
    language: 'zh',
    uploadExtraData: {kvId: '10'}
});
$(".btn-warning").on('click', function() {
    if ($('#file-4').attr('disabled')) {
        $('#file-4').fileinput('enable');
    } else {
        $('#file-4').fileinput('disable');
    }
});
$(".btn-info").on('click', function() {
    $('#file-4').fileinput('refresh', {previewClass:'bg-info'});
});
/*
$('#file-4').on('fileselectnone', function() {
    alert('Huh! You selected no files.');
});
$('#file-4').on('filebrowse', function() {
    alert('File browse clicked for #file-4');
});
*/
$(document).ready(function() {
    $("#test-upload").fileinput({
        language: 'zh',
        'showPreview' : false,
        'allowedFileExtensions' : ['jpg', 'png','gif'],
        'elErrorContainer': '#errorBlock'
    });
    /*
    $("#test-upload").on('fileloaded', function(event, file, previewId, index) {
        alert('i = ' + index + ', id = ' + previewId + ', file = ' + file.name);
    });
    */
});
$("#input-24").fileinput({
    language: 'zh',
    initialPreview: [
        "<img src='assets/img/moon.jpg' class='file-preview-image' alt='The Moon' title='The Moon'>",
        "<img src='assets/img/earth.jpg' class='file-preview-image' alt='The Earth' title='The Earth'>",
    ],
    overwriteInitial: false,
    maxFileSize: 100,
    initialCaption: "The Moon and the Earth"
});
$("#file-0c").fileinput({
    uploadUrl: "", // 这里只能写字符串不能写变量
    allowedFileExtensions: ['jpg', 'png', 'jpeg'],
    overwriteInitial: true,
    autoReplace: true,
    maxFilesNum: 1,
    language: 'zh',
    maxFileSize: 6144,
    minImageWidth: 750, //图片的最小宽度
    minImageHeight: 750,//图片的最小高度
    maxImageWidth: 750,//图片的最大宽度
    maxImageHeight: 750,//图片的最大高度
    slugCallback: function (filename) {
        return filename.replace('(', '_').replace(']', '_');
    }
}).on('fileuploaded', function (event, data, id, index) {
    if (data.response.error_code == 0) {
        $('#official_img').val(data.response.data);
    } else {
        layer.msg(data.response.error_msg);
        return false;
    }
}).on("fileuploaderror", function (event, data) {
    return false;
}).on("fileclear", function () {
    $("#official_img").val("");
    $(".img-upload .fileinput-upload-button").removeClass('disabled');
});
