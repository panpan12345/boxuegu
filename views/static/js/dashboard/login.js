define(["jquery", "cookie", "form"], function($){
    $(function(){
        $("form").submit(function(){
            var userName = $("#tc_name").val();
            var pass = $("#tc_pass").val();

            if(userName.trim() == ""){
                alert("请输入用户名");
                return false;
            }

            if(pass.trim() == ""){
                alert("请输入密码");
                return false;
            }

            $(this).ajaxSubmit({
                url: "/api/login",
                type: "post",
                success: function(data){
                    if(data.code == 200){
                        $.cookie("userinfo", JSON.stringify(data.result), {expires: 365, path: "/"});
                        location.href = "/";
                    }
                }
            });


            return false;
        })
        














































        //1. 获取登录按钮，注册点击事件

        //1. 获取表单，注册提交事件
        // $("form").submit(function(e){
        //     //1. 获取用户输入的信息
        //     var userName = $("#tc_name").val();
        //     var pass = $("#tc_pass").val();

        //     if(userName.trim() == ""){
        //         alert("请输入用户名");
        //         return false;
        //     }

        //     if(pass.trim() == ""){
        //         alert("请输入密码");
        //         return false;
        //     }

        //     //2. 要将数据发送给后台，让后台进行验证
        //     //2.1 数据接口地址是什么  //http://studyit.com/api/login
        //     //2.2 请求的方式是什么   post
        //     //2.3 请求要的参数是什么  tc_name tc_pass
            
        //     $.ajax({
        //         url: "/api/login",
        //         type: "post",
        //         data: {
        //             tc_name: userName,
        //             tc_pass: pass
        //         },
        //         success: function(data){
        //             if(data.code == 200){
        //                 //登录成功之后，
        //                 //先将后台返回用户的头像以及用户名信息
        //                 //保存到cookie中，为了能够让首页也使用这个信息

        //                 //应该先将对象转成json格式的字符串，然后再存
        //                 $.cookie("userinfo", JSON.stringify(data.result), {expires: 365, path: "/"});

        //                 // 让用户跳转到首页
        //                 location.href = "/";
        //                 // console.log(data);
                        
        //             }
        //         }
        //     });


        //     //阻止表单的默认提交事件
        //     // e.preventDefault();
        //     return false;

        // })
    })
})
