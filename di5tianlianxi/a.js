define(function(){
    function test(){
      console.log("我是a模块中的内容");
    }

    function test1(){
      console.log("我是b中的test1函数");
    }
     return{
      test:test,
      test1:test1
     
    }
   
})