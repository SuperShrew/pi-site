<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['message'])) {
    $message = trim($_POST['message']);
    //$message = htmlspecialchars($message);
    file_put_contents('chat.txt', $message . PHP_EOL, FILE_APPEND);
}
header('Location: index.php');
exit;
