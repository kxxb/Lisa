<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

require_once ('user_manage.php');
echo u_login($_POST["login"], $_POST["pass"]);
?>
