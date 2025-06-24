    document.addEventListener("DOMContentLoaded", function () {
      const element = document.querySelector(".type");
      if (!element) {
        console.error("element with class 'type' not found");
        return;
      }
      const text = element.textContent;
      element.textContent = "";
      let speed = 200;
      let index = 0;
      function typeText() {
        if (index == 0) {
          index++;
          setTimeout(typeText, speed);
          return
        }
        if (index <= text.length) {
          element.textContent += text.charAt(index-1);
          index++;
          setTimeout(typeText, speed);
        }
      }

      typeText();
    });
