define(["jquery", "ckeditor", "template", "region", "uploadify", "datepicker", "datepickerCN", "form"], function ($, CKEDITOR, template) {
    $(function () {

        //1. 获取当前登录了的用户的个人信息
        $.ajax({
            url: "/api/teacher/profile",
            success: function (data) {
                if (data.code == 200) {
                    var html = template("settings_tpl", data.result);
                    $(".settings").html(html);


                    //日期选择插件的使用
                    $("input[name=tc_birthday]").datepicker({
                        format: "yyyy-mm-dd",
                        autoclose: true,
                        language: "zh-CN"
                    })
                    $("input[name=tc_join_date]").datepicker({
                        format: "yyyy-mm-dd",
                        autoclose: true,
                        language: "zh-CN"
                    })

                    //省市区三级联动插件的使用
                    $("#region").region({
                        url: "/views/assets/jquery-region/region.json"
                    });

                    //富文本编辑器插件的使用
                    CKEDITOR.replace("tc_introduce", {
                        toolbarGroups: [
                            { name: 'clipboard', groups: ['clipboard', 'undo'] },
                            { name: 'insert' },
                            { name: 'tools' },
                            { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] }
                        ]
                    });

                    //图片上传插件的使用
                    $("#upfile").uploadify({
                        swf: "/views/assets/uploadify/uploadify.swf",
                        uploader: "/api/uploader/avatar",
                        fileObjName: "tc_avatar",
                        width: 120,
                        height: 120,
                        buttonText: "",
                        onUploadSuccess: function (file, data, response) {
                            data = JSON.parse(data);
                            if (data.code == 200) {
                                $(".preview img").attr("src", data.result.path)
                            }
                        }
                    });

                    //保存按钮的点击事件
                    $("#btn-save").click(function(){
                        //由于富文本编辑器的小问题，所以修改的内容无法实时同步到我们的textarea中
                        //所以我们需要在提交前将富文本编辑器中的内容 同步到textarea中

                        CKEDITOR.instances.tc_introduce.updateElement();

                        // $("textarea[name=tc_introduce]").val(CKEDITOR.instances.tc_introduce.getData());

                        $("form").ajaxSubmit({
                            url: "/api/teacher/modify",
                            type: "post",
                            success: function(data){
                                if(data.code == 200){
                                    alert("修改成功");
                                }
                            }
                        })
                        return false;
                    })
                }
            }
        })


        // //1. 首先在页面中给省市区三级联动的select加上一个父元素
        // //2. 给三级联动的select分别加上id  p c d
        // //3. 获取父元素jQuery对象，调用.region方法，传入一个对象，对象中包含url属性，指定省市区数据的地址！

        // $("#region").region({
        //     url: "/views/assets/jquery-region/region.json"
        // });

        // //富文本编辑器的使用
        // CKEDITOR.replace("tc_introduce", {
        //     toolbarGroups : [
        //         { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        //         // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        //         // { name: 'links' },
        //         { name: 'insert' },
        //         // { name: 'forms' },
        //         { name: 'tools' },
        //         // { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        //         // { name: 'others' },
        //         // '/',
        //         { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        //         // { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        //         // { name: 'styles' },
        //         // { name: 'colors' },
        //         // { name: 'about' }
        //     ]
        // });


        // $("#upfile").uploadify({
        //     swf: "/views/assets/uploadify/uploadify.swf",
        //     uploader: "/api/uploader/avatar",
        //     fileObjName: "tc_avatar",
        //     width: 120,
        //     height: 120,
        //     buttonText: "",
        //     onUploadSuccess: function(file, data, response){
        //         data = JSON.parse(data);
        //         if(data.code == 200){
        //             $(".preview img").attr("src", data.result.path)
        //         }
        //     }
        // });
    })
})