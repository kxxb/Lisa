<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



function  menu_builder(){
    $v_result;
    require_once('dbconn.php');
    $mysql_conn = conn();
    try{
            $sql_menu =  " select                   ".
                          "  pid,                   ".
                          " case when id = pid then ".
                          " 'root'                  ".
                          "  else                   ".
                          " 'leaf'                  ".
                          " end as root_leaf,       ".
                          " item_name, item_url,    ".
                          " js_function_name        ".
                        " from rrl_sys_menu         ".
                        " where status = 1          ".
                        " order by id               ";
             $mysql_conn->query("SET NAMES 'utf8'");

             $v_i= 0;
                if ($results_menu=$mysql_conn->query($sql_menu) ) {
                     while ($row_menu = mysqli_fetch_assoc($results_menu)){

                     if ($row_menu['root_leaf'] == "leaf") {
                       $v_i=$v_i+1;
                        if ($v_i == 1){
                            $v_menu_text2 = $v_menu_text2."{text: '".$row_menu['item_name'] ."' ,handler: ".$row_menu['js_function_name'] .  "}\n";
                        } else {
                             $v_menu_text2 = $v_menu_text2.",{text: '".$row_menu['item_name'] ."' ,handler: ".$row_menu['js_function_name'] .  "}\n";

                        };

                          $v_menu_functions = $v_menu_functions ."function ". $row_menu['js_function_name'] ."(item){ window.location = '". $row_menu['item_url'] ."'; }\n";
                     };    


                     }

                      $v_menu_text1 = "var menu = new Ext.menu.Menu({ style: {overflow: 'visible'},
                                    items: [";
                      $v_menu_text3 = " ] });";


                $v_result = $v_menu_functions ." ".  $v_menu_text1 ." ".$v_menu_text2." ". $v_menu_text3;

                
              
                }else{
                  $v_result = "{success:false,errors:{reason:'Ошибка! '}}";
                }
    
    } catch (Exception $e){
        echo 'Выброшено исключение: ',  $e->getMessage(), "\n";
    }
$mysql_conn->close();    
return $v_result;                 
        
  
    
}

?>
