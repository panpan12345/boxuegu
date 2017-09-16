define(["jquery", "template", "utils", "form", "datepicker", "datepickerCN", "validate"], function($, template, utils){
        var id = utils.getQueryObj().id;
        if(id){
            $.ajax({
                url: "/api/teacher/edit",
                data: {
                    tc_id: id
                },
                success: function(data){
                    if(data.code == 200){
                        data.result.title = "编辑讲师";
                        data.result.btnText = "保 存";
                        data.result.url = "/api/teacher/update";
                        renderData(data.result);
                    }
                }
            })

        }else{ 
            var obj = {
                title: "添加讲师",
                btnText: "添 加",
                url: "/api/teacher/add"
            }
            renderData(obj);
        }

        function renderData(data){
            var html = template("teacher_add_edit_tpl", data);
            $(".body,.teacher").html(html);

            //使用日期选择插件
            $("input[name=tc_join_date]").datepicker({
                format: "yyyy-mm-dd",
                autoclose: true,
                language: "zh-CN"
            });

            //给表单注册验证事件
            $("form").validate({
                sendForm: false,
                onBlur: true,
                onChange: true,
                valid: function(){
                    $(this).ajaxSubmit({
                        success: function(data){
                            if(data.code == 200){
                                location.href = "/teacher/list"
                            }
                        }
                    })
                },
                description: {
                    name: {
                        required: "用户名不能为空"
                    },
                    password: {
                        required: "密码不能为空",
                        pattern: "请求输入6-15为数字或字母",
                        // valid: "ok"
                    },
                    date:{
                        required: "请选择入职时间"
                    }
                },
                eachValidField: function(){
                    this.parent().parent().addClass("has-success").removeClass("has-error");
                },
                eachInvalidField: function(){
                    this.parent().parent().addClass("has-error").removeClass("has-success");                    
                }
            });
        }
    })