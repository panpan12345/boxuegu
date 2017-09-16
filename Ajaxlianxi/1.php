<?php 

header("content-type:text/html;charset=utf-8");
$age = 8;
if($age >= 18){
  echo"你已经成年了，是该知道事情的真相了";
}else{
  echo "好好读书！！长大做一个对社会有用得到人";
}

$arr = array("红中","发财","白板","幺鸡","五筒");
for ($i =0;$i <count($arr);$i++){
  echo $arr[$i];
}

$arr2 = array(
        "name" => "feifei",
      "age" => 18,
      "desc" => "不可描述"
  );
foreach($arr2 as $key => $value){
  echo $arr2[$key];
}

 ?>

 funtion ajax(type,url,data,callback){
 var xhr = new XMLHttpRequest();
 if()
 }