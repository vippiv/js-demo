## fileinput 配置项

### 属性
|属性名 | 属性类型 | 描述说明 | 默认值 |
| ------ | ------ | ------ | ------|
| language | String | 多语言设置，使用时需提前引入\locales文件夹下对应的语言文件，中文zh，引入语言文件必须放在fileinput.js之后 | 'en' |
| showCaption | Boolean | 是否显示被选文件的简介 | true |
| showBrowse | Boolean | 是否显示浏览按钮 | true |
| showPreview | Boolean | 是否显示预览区域 | true |
| showRemove | Boolean | 是否显示移除按钮 | true |
| showUpload | Boolean | 是否显示上传按钮 | true |
| showCancel | Boolean | 是否显示取消按钮 | true |
| showClose | Boolean | 是否显示关闭按钮 | true |
| showUploadedThumbs | Boolean |  | true |
| mainClass |  |  |  |
| autoReplace | Boolean | 是否自动替换当前图片，设置为true时，再次选择文件，会将当前的文件替换掉。 | false |
| previewClass | String | 添加预览按钮的类属性 | ‘’ |
| captionClass | String |  | ‘’ |
| deleteUrl | String | 删除图片时的请求路径 | '' |
| deleteExtraData | Object | 删除图片时额外传入的参数 |  |
| allowedFileTypes | Object | 接收的文件后缀，如['jpg', 'gif', 'png'],不填将不限制上传文件后缀类型 | null |
| uploadUrl | String | 上传文件路径 | null |
| uploadAsync | boolean | 是否为异步上传 | true |
| uploadExtraData |   | 上传文件时额外传递的参数设置 | {} |
| minImageWidth | String | 图片的最小宽度 | null |
| minImageHeight | String | 图片的最小高度 | null |
| maxImageWidth | String | 图片的最大宽度 | null |
| maxImageHeight | String | 图片的最大高度 | null |
| minFileSize | number | 单位为kb，上传文件的最小大小值 | 0 |
| maxFileSize | number | 单位为kb，如果为0表示不限制文件大小 | 0 |
| resizeDefaultImageType | number |  调整默认图像类型 | 25600(25MB) |
| minFileCount | number | 表示同时最小上传的文件个数 | 0 |
| maxFileCount | number | 表示允许同时上传的最大文件个数 | 0 |
| validateInitialCount | boolean |  验证初始计数 | false |
| previewFileType | String | 预览文件类型,内置['image', 'html', 'text', 'video', 'audio', 'flash', 'object',‘other‘]等格式 | 'image' |
| elCaptionText | String | 设置标题栏提示信息 | null |
| dropZoneEnabled | boolean | 是否显示拖拽区域 | true |
| dropZoneTitleClass | String | 拖拽区域类属性设置 | 'file-drop-zone-title' |
| textEncoding | String | 编码设置 | 'UTF-8' |
| mainTemplate |  |  |  |
| initialCaption |  |  |  |
| initialPreview |  |  |  |
| initialPreviewDelimiter |  |  |  |
| initialPreviewConfig |  |  |  |
| initialPreviewThumbTags |  |  |  |
| previewThumbTags |  |  |  |
| initialPreviewShowDelete |  |  |  |
| overwriteInitial |  |  |  |
| layoutTemplates |  |  |  |
| previewTemplates |  |  |  |
| allowedPreviewTypes |  |  |  |
| allowedPreviewMimeTypes |  |  |  |
| allowedFileExtensions |  |  |  |
| defaultPreviewContent |  |  |  |
| customLayoutTags |  |  |  |
| customPreviewTags |  |  |  |
| previewSettings |  |  |  |
| fileTypeSettings |  |  |  |
| previewFileIcon |  |  |  |
| previewFileIconClass |  |  |  |
| previewFileIconSettings |  |  |  |
| previewFileExtSettings |  |  |  |
| buttonLabelClass |  |  |  |
| browseIcon |  |  |  |
| browseClass |  |  |  |
| removeIcon |  |  |  |
| removeClass |  |  |  |
| cancelIcon |  |  |  |
| cancelClass |  |  |  |
| uploadIcon |  |  |  |
| uploadClass |  |  |  |
| resizeImage |  |  |  |
| resizePreference |  |  |  |
| resizeQuality |  |  |  |
| msgValidationErrorClass |  |  |  |
| msgValidationErrorIcon |  |  |  |
| msgErrorClass |  |  |  |
| progressThumbClass |  |  |  |
| progressClass |  |  |  |
| progressCompleteClass |  |  |  |
| zoomIndicator |  |  |  |
| elCaptionContainer |  |  |  |
| elPreviewContainer |  |  |  |
| elPreviewImage |  |  |  |
| elPreviewStatus |  |  |  |
| elErrorContainer |  |  |  |
| errorCloseButton |  |  |  |
| slugCallback |  |  | null |
| fileActionSettings |  |  | 对象 |
| otherActionButtons |  |  | '' |
| ajaxSettings |  |  | 对象 |
| ajaxDeleteSettings |  |  | 对象 |
| showAjaxErrorDetails |  |  | true |


### 方法
| 方法名 | 参数 | 描述 |
| ------ | ------ | ------ |
| fileerror | 异步上传错误结果处理 | $('#uploadfile').on('fileerror', function(event, data, msg) {}); |
| fileuploaded | 异步上传成功结果处理 | $("#uploadfile").on("fileuploaded", function (event, data, previewId, index) {}) |
| filebatchuploaderror | 同步上传错误结果处理 | $('#uploadfile').on('filebatchuploaderror', function(event, data, msg) {}); |
| filebatchuploadsuccess |同步上传成功结果处理 | $('#uploadfile').on('filepreupload', function(event, data, previewId, index) {}); |
| filebatchselected | 选择文件后处理事件 | $("#fileinput").on("filebatchselected", function(event, files) {}); |
| upload | 文件上传方法 | $("#fileinput").fileinput("upload"); |
| fileuploaded | 上传成功后处理方法 | $("#fileinput").on("fileuploaded", function(event, data, previewId, index) {}); |
| filereset |  |  |
| fileclear | 点击浏览框右上角X 清空文件前响应事件 | $("#fileinput").on("fileclear",function(event, data, msg){ }); |
| filecleared | 点击浏览框右上角X 清空文件后响应事件 | $("#fileinput").on("filecleared",function(event, data, msg){}); |
| fileimageuploaded | 在预览框中图片已经完全加载完毕后回调的事件 |  |
