define(["jquery", "template", "utils", "form"], function($, template, utils){


    var id = utils.getQueryObj().id;

    //判断当前是编辑功能还是添加功能
    if(id){
        //编辑功能
        //1. 获取当前要编辑的讲师的详细信息
        $.ajax({
            url: "/api/teacher/edit",
            data: {
                tc_id: id
            },
            success: function(data){
                if(data.code == 200){
                    console.log(data);
                    //需要将数据用模板引擎渲染到页面
                    data.result.title = "编辑讲师";
                    data.result.btnText = "保 存";
                    data.result.url = "/api/teacher/update";
                    var html = template("teacher_add_edit_tpl", data.result);
                    $(".body,.teacher").html(html);

                    //给保存按钮注册点击事件
                    $("#save-btn").click(function(){
                        $.ajax({
                            url: "/api/teacher/update",
                            type: "post",
                            data: $("form").serialize(),
                            success: function(data){
                                if(data.code == 200){
                                    location.href = "/teacher/list"
                                }
                            }
                        })
                        return false;
                    });
                }
            }
        })
    }else{  
        //添加功能

        //设置数据，将模板渲染到页面上去
        var obj = {
            title: "添加讲师",
            btnText: "添 加",
            url: "/api/teacher/add"
        }

        var html = template("teacher_add_edit_tpl", obj);
        $(".body,.teacher").html(html);

        $("#save-btn").click(function(){
            //1. 获取用户输入的内容
            // var data = $("form").serialize()
            //2. 将这些内容通过ajax请求发送给后台进行保存
            $.ajax({
                url: "/api/teacher/add",
                type: "post",
                data: $("form").serialize(),
                success: function(data){
                    if(data.code == 200){
                        location.href = "/teacher/list"
                    }
                }
            })
            //3. 保存成功之后调回列表页
            // console.log($("form").serialize());
            // console.log(data);
            
            //阻止表单的默认提交
            return false;
        });
    }
})