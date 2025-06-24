<?php
$username = $_POST['username'];
echo "Hello, $username!";
session_start();
echo "<br>";
$_SESSION['user'] = $username;
echo $_SESSION['user'];
?>
