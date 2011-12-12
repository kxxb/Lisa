<?php


require_once 'dbconn.php';

$u_ip = "127.0.0.1";
$login_date = date("Y-m-d H:i:s");
$logout_date = null;
$login_status = 1;
$user_id = 2;

echo $login_date; 
$mysqli_conn = conn();  
            $stmt_i = $mysqli_conn->prepare("INSERT INTO rrl_user_login ".
                                             " (user_id,login_status,login_datetime,logout_datetime,user_ip)".
                                             " VALUES (?,?,?,?,?)");
            $stmt_i->bind_param("iisss", $user_id, $login_status,  $login_date, $logout_date ,$u_ip);
            /* execute prepared statement */
            mysqli_stmt_execute($stmt_i);
            echo "next ". $mysqli_conn->insert_id ;
?>
