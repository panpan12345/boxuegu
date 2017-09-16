define(["jquery", "template", "bootstrap"], function($, template){
    $(function(){
        //1. 加载列表数据
        //1.1 发送ajax请求
        $.ajax({
            url: "/api/teacher",
            success: function(data){
                console.log(data);
                //将获取到的讲师列表数据，展示到页面中
                var html = template("teacher_list_tpl", data);
                $("#teacher_list_tbody").html(html);

                
            }
        })

        //给所有的查看按钮注册点击事件
        $("#teacher_list_tbody").on("click", ".check-info", function(){
            //0. 获取当前讲师的id
            var id = $(this).parent().data("id");
            
            //1. 发送请求获取当前行讲师的信息
            $.ajax({
                url: "/api/teacher/view",
                data: {
                    tc_id: id
                },
                success: function(data){
                    if(data.code == 200){
                        //1. 将数据渲染模态框中
                        var html = template("teacher_modal_tpl", data.result);
                        $("#teacherModal>.modal-dialog").html(html);
                        //2. 展示模态框
                        $("#teacherModal").modal("show");
                    }
                }
            })

            
        })


        //讲师的注销以及启用功能分析
        //讲师账号会有两种状态，已启用 和 已注销
        //tc_status==0  已启用
        //tc_status==1  已注销

        //两种状态分别对应两种操作， 
            //已启用  ----->    注销
            //已注销  ----->    启用


        //给所有的注销、启用按钮注册点击事件
        $("#teacher_list_tbody").on("click", ".btn-status", function(){
            var id = $(this).parent().data("id");
            var status = $(this).data("status");
            var that = $(this);
            $.ajax({
                url: "/api/teacher/handle",
                type: "post",
                data: {
                    tc_id: id,
                    tc_status: status
                },
                success: function(data){
                    if(data.code == 200){
                        //因为讲师状态已经发生改变
                        //所以按钮的状态也要随之改变
                        //我们可以根据后台返回回来的当前的讲师状态对于按钮进行修改
                        if(data.result.tc_status == 1){
                            //tc_status==1  已注销
                            //按钮应该是启用按钮
                            that.removeClass("btn-warning").addClass("btn-success").text("启 用");
                            
                        }else{
                            //tc_status==0  已启用
                            //按钮应该是注销按钮
                            that.removeClass("btn-success").addClass("btn-warning").text("注 销");                            
                        }

                        //需要将当前按钮中保存的  data-status 改成修改后的状态
                        that.data("status", data.result.tc_status);
                    }
                }
            })

        })
        
    })
})