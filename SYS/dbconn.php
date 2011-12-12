<?

function conn(){

$hostname = "localhost";
$username = "root";
$password = "cat#45";
$dbName = "rrl";

    $mysqli = new mysqli($hostname, $username, $password, $dbName);
    if (mysqli_connect_errno(  )) {
            printf("Connect failed: %s\n", mysqli_connect_error(  ));
            exit (  );
    } 
  return $mysqli;                
}                
                
                


                             
 ?>