<?php


function set_user_name($guid){
   
        require_once('dbconn.php');
        $connection = conn();
        $connection->query("SET NAMES 'utf8'");
        $stmt = $connection->prepare("SELECT name, middle_name FROM  rrl_users where id = ?");
        $stmt->bind_param("s", $guid); 

        /* execute query */
        mysqli_stmt_execute($stmt);
        mysqli_stmt_store_result($stmt);
        mysqli_stmt_bind_result($stmt, $name, $middle_name  );
        while (mysqli_stmt_fetch($stmt)) {
            $user_name  =  $user_name. "'Здравсвуйте, <b>".$name." ".$middle_name." </b>' ";
        }
        mysqli_stmt_close($stmt);
        return $user_name;
   
    
}


?>
