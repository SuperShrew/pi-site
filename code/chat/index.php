<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-F0VLYPNJPZ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-F0VLYPNJPZ');
    </script>
  <meta charset="UTF-8">
  <title>PHP Chat Room</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 30px auto; }
    ul { list-style: none; padding: 0; }
    li { padding: 5px 0; border-bottom: 1px solid #ddd; }
    input[type="text"] { width: 100%; padding: 10px; font-size: 16px; margin-top: 10px; }
    button { padding: 10px; font-size: 16px; margin-top: 10px; }
    label { font-weight: bold; margin-top: 10px; display: block; }
  </style>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <h1 class="type" style="display: inline-block;">Chat.</h1><h1 id="cursor" style="display: inline-block;">|</h1>

<ul id="chat-box"></ul>

<form method="post" action="submit.php" onsubmit="return sendMessage();">
  <label for="name">Your Name:</label>
  <input type="text" id="name" placeholder="Enter your name" required>

  <label for="message">Message:</label>
  <input type="text" id="message" placeholder="Type a message..." required>

  <button type="submit">Send</button>
</form>
<br>
<a href="" id="logs">chat log</a>
<br>
<a href="" id="back">home</a>
<script src="../type.js"></script>
<script>
function loadChat() {
  fetch('chat.txt?' + new Date().getTime())
    .then(response => response.text())
    .then(data => {
      const lines = data.trim().split('\n');
      const lastLines = lines.slice(-10);  // only get the last 10 lines
      const list = document.getElementById('chat-box');
      list.innerHTML = '';
      lastLines.forEach(line => {
        const li = document.createElement('li');
        li.textContent = line;
        list.appendChild(li);
      });
    });
}


// Store and retrieve name from localStorage
document.getElementById('name').value = localStorage.getItem('chatName') || '';

function sendMessage() {
  const name = document.getElementById('name').value.trim();
  const message = document.getElementById('message').value.trim() + " | " + new Date().getDate() + "." + new Date().getMonth() + "." + new Date().getFullYear() + " | " + new Date().getHours() + ":" + new Date().getMinutes() ;
  if (!name || !message) return false;

  localStorage.setItem('chatName', name); // Save name for next time

  // Create a hidden form to submit with name + message
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'submit.php';

  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = 'message';
  input.value = name + ': ' + message;
  form.appendChild(input);

  document.body.appendChild(form);
  form.submit();

  return false; // Prevent default form
}

loadChat();
setInterval(loadChat, 3000);
window.onload = loadChat; // Load on initial page load
document.getElementById("logs").href = `${window.location.origin}/chat/chat.txt`
document.getElementById("back").href = `${window.location.origin}`
</script>

</body>
</html>
