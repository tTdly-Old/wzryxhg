<?php
header('Access-Control-Allow-Origin:http://wz.152527.xyz');
if(!isset($_SERVER['HTTP_REFERER']) || !stripos($_SERVER['HTTP_REFERER'],'wz.152527.xyz')) {
 echo 'No authority';
 exit();
}
$servername = "localhost";
$username = "wzryxhg";
$password = "Wn5iS7N6eNCfSBew";
// $username = "root";
// $password = "123456";
$dbname = "wzryxhg";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
  die("连接失败: " . mysqli_connect_error());
}
$qoru = $_GET['do'];
if($qoru == 'get'){
  $page = $_GET['page'];
  $size = $_GET['size'];
  $current = ($page-1)*$size;
  $sql = "SELECT * FROM links2 WHERE date>=date(now()) AND date AND state='1' ORDER BY price DESC LIMIT ".$current.",".$size;
  $result = mysqli_query($conn, $sql);
  $links = array();
  if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while ($row = mysqli_fetch_assoc($result)) {
      array_push($links,$row);
    }
  } else {
  }
  echo json_encode($links);
}else if($qoru == 'page'){
  $sql = "SELECT COUNT(*) AS count FROM links2 WHERE date>=date(now()) AND date AND state='1'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
      echo json_encode($row);
    }
  } else {
    echo "没有数据";
  }
}else if($qoru == 'update'){
  $id = $_GET['id'];
  $sql = "UPDATE links2 SET state=0 WHERE uid=".$id;
  $result = mysqli_query($conn, $sql);
  echo('{"result":"ok"}');
}else if ($qoru == 'ip') {
function get_real_ip()
{
    $ip=false;
    if(!empty($_SERVER["HTTP_CLIENT_IP"])){
        $ip = $_SERVER["HTTP_CLIENT_IP"];
    }
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        $ips = explode (", ", $_SERVER['HTTP_X_FORWARDED_FOR']);
    if($ip){
        array_unshift($ips, $ip); $ip = FALSE;
    }
    for($i = 0; $i < count($ips); $i++){
        if (!eregi ("^(10|172\.16|192\.168)\.", $ips[$i])){
            $ip = $ips[$i];
            break;
            
        }
    }
    }
    $ipoo = $ip ? $ip : $_SERVER['REMOTE_ADDR'];
    return(json_encode($ipoo));
}
echo get_real_ip();
}
mysqli_close($conn);
?>