<?php

/*
 * Функции управления пользователями и получения различной информации о пользователях
 * 
 */

require_once('../SYS/hello_user.php');
require_once('../SYS/dbconn.php');


function u_login($login, $pass){
    
$u_ip=
$login_date = date("Y-m-d H:i:s");
$logout_date = null;



$connection = conn();
$stmt = $connection->prepare("SELECT  id, user_status  FROM  rrl_users where login = ? and pass = ?;");
$stmt->bind_param("ss", $login,$pass);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        mysqli_stmt_bind_result($stmt, $uid, $status  );
        mysqli_stmt_fetch($stmt);

       if ($uid != null) {  
         session_start();
         $log_result = login_log($uid);
         //записываю параметры логина пользователя
          if ($log_result != null ){
              $_SESSION['uid'] = $log_result;
              return "{success:true}"; 
          }else{
              return "{success:false,errors:{reason:'Ошибка! Лог не записан!'}}";
          }
          
       }else
       {
           return "{success:false,errors:{reason:'Ошибка! Неправильный логин или пароль ".$id."'}}";
       }
        
        mysqli_stmt_close($stmt);

}


function login_log($p_userid) {
    $u_ip = $_SERVER['REMOTE_ADDR'];
    $login_date = date("Y-m-d H:i:s");
    $logout_date = null;
    $login_status = 1;
    $user_id = $p_userid;


     $mysqli_conn = conn();  
            $stmt_i = $mysqli_conn->prepare("INSERT INTO rrl_user_login ".
                                             " (user_id,login_status,login_datetime,logout_datetime,user_ip)".
                                             " VALUES (?,?,?,?,?)");
            $stmt_i->bind_param("iisss", $user_id, $login_status,  $login_date, $logout_date ,$u_ip);
            /* execute prepared statement */
            mysqli_stmt_execute($stmt_i);
            mysqli_stmt_close($stmt_i);

      return  $mysqli_conn->insert_id;
     
}
 


function login_check($login_id,  $user_ip){
 $sql_check =  " SELECT user_id as c FROM rrl_user_login ".
               "  where  id = ?                      ".
               "  and login_status = 1               ".
               "  and user_ip = ?          ";
 
            $mysqli_conn = conn();  
            $stmt = $mysqli_conn->prepare($sql_check);
            $stmt->bind_param("is", $login_id,  $user_ip);
            /* execute prepared statement */
            mysqli_stmt_execute($stmt);
         
            mysqli_stmt_store_result($stmt);
            mysqli_stmt_bind_result($stmt, $res);
            mysqli_stmt_fetch($stmt);
            mysqli_stmt_close($stmt);

            return $res;
    
}
?>
