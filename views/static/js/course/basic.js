define(["jquery", "template", "utils", "ckeditor", "form"], function($, template, utils, CKEDITOR){
    //1. 获取连接中的id参数
    var id = utils.getQueryObj().id;
    // alert(id);

    //2. 向后台发送ajax请求，获取当前要编辑的课程基本信息
    $.ajax({
        url: "/api/course/basic",
        data: {cs_id: id},
        success: function(data){
            if(data.code == 200){
                var html = template("basic_tpl", data.result);
                $(".steps").html(html);

                CKEDITOR.replace("cs_brief");

                $("form").submit(function(){

                    CKEDITOR.instances.cs_brief.updateElement();

                    $(this).ajaxSubmit({
                        url: "/api/course/update/basic",
                        type: "post",
                        success: function(data){
                            if(data.code == 200){
                                location.href = "/course/pic?id=" + data.result.cs_id;
                            }
                        }
                    })

                    return false;
                })
            }
        }
    })
})