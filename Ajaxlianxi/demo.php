<?php 

  header ("content-type:text/xml;charset = utf-8");
  // 读取文件
  $xml = file_get_contents("demo.xml");
  echo $xml;

 ?>