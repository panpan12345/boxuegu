define(["jquery", "template", "utils", "uploadify"], function($, template, utils){
    //1. 获取id
    var id = utils.getQueryObj().id;
    // alert(id);
    //2. 向后台发送请求获取当前id对应的课程的图片信息
    $.ajax({
        url: "/api/course/picture",
        data: {cs_id: id},
        success: function(data){
            if(data.code == 200){
                var html = template("pic_tpl", data.result);
                $(".steps").html(html);

                //图片上传插件的使用
                $("#upload-btn").uploadify({
                    swf: "/views/assets/uploadify/uploadify.swf",
                    uploader: "/api/uploader/cover",
                    fileObjName: "cs_cover_original",
                    formData: {cs_id: id},
                    buttonClass: "btn btn-success btn-sm",
                    buttonText: "上传图片",
                    width: 70,
                    height: 30,
                    //通过itemTemplate可以设置进度条信息显示的模板，不想要进度条信息，直接设置空标签即可
                    itemTemplate: "<p></p>",
                    onUploadSuccess: function(file, data, response){
                        data = JSON.parse(data);
                        if(data.code == 200){
                            $(".preview>img").attr("src", data.result.path);
                        }
                    }
                }); 

                $("#upload-btn-button").css("line-height", "1.5");
            }
        }
    })
})