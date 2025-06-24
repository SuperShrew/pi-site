

// load the initial level
gameElement.appendChild(buildLevel(currentLevel));

///console.log(document.getElementsByClassName("NPC1Hitbox"));
// set up 'Play' button to load the 1st level
document.getElementById("pla").onclick = function() { clearGame(); currentLevel += 1; gameElement.appendChild(buildLevel(currentLevel)); };


document.addEventListener("keydown", function(event) {
  // handle input
  let leftPressed = false;
  let rightPressed = false;
  let upPressed = false;
  let downPressed = false;
  let interactPressed = false;
  if (event.code === "KeyA" || event.key === "ArrowLeft") {
    leftPressed = true;
  }
  if (event.code === "KeyD" || event.key === "ArrowRight") {
    rightPressed = true;
  }
  if (event.code === "KeyW" || event.key === "ArrowUp") {
    upPressed = true;
  }
  if (event.code === "KeyS" || event.key === "ArrowDown") {
    downPressed = true;
  }
  if (event.key === " ") {
    interactPressed = true;
  }
  if (event.key == "1")
    {
      invString = ""
      for (var i in playerInventory)
        {
          invString = invString + i + ": " + playerInventory[i] + "\n";
        }
      text.innerHTML = invString;
    }


  // early out if we are still in the title screen
  if (currentLevel < 1) {
    return;
  }

   /// Player Control ///
  //////////////////////
  origionalX = playerX
  origionalY = playerY
  let playerElement = document.getElementById("player");

  // movement
  if (playerCtrl) {
    if (leftPressed && !rightPressed) {
      playerX -= playerMaxSpeed;
    }
    if (rightPressed && !leftPressed) {
      playerX += playerMaxSpeed;
    }
    if (upPressed && !downPressed) {
      playerY -= playerMaxSpeed;
    }
    if (downPressed && !upPressed) {
      playerY += playerMaxSpeed;
    }
  }

  playerX = Math.max(0, Math.min(playerX, gameWidth-parseInt(playerElement.style.width)));
  playerY = Math.max(0, Math.min(playerY, gameHeight-parseInt(playerElement.style.height)));
  playerElement.style.left = playerX + "px";
  playerElement.style.top = playerY + "px";

  // collision
  getElementsWithVar("--solid").forEach((element) => {
    if (inside(playerElement, element)) {
      console.log(element);
      playerX = origionalX;
      playerY = origionalY;
    }
  });
  playerElement.style.left = playerX + "px";
  playerElement.style.top = playerY + "px";

  // interaction
  if (playerCtrl && interactPressed) { 
    let npcs = getElementsWithVar("--interact");
    for (let i = 0; i < npcs.length; i++) {
      if (collision(playerElement, npcs[i]) || overlap(playerElement, npcs[i])) {
        npcByID.get(npcs[i].id).interact();
        break;
      }
    }
  }

  // misc


});


function getElementsWithVar(cssVar) {
    const elementsWithVar = [];
    const allElements = document.querySelectorAll('*'); // Select all elements
    //console.log(allElements);

    allElements.forEach((element) => {
        const computedStyle = getComputedStyle(element); // Get the styles of the element
        //console.log(computedStyle);
        if (computedStyle.getPropertyValue(cssVar)) {
            elementsWithVar.push(element); // Add the element to the array if the variable is present
        }
    });
    //console.log(elementsWithVar);
    return elementsWithVar;
}

// tests if 2 elements are exactly adjacent
function collision(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    const isTouchingHorizontally = rect1.bottom > rect2.top && rect1.top < rect2.bottom && (rect1.right === rect2.left || rect2.right === rect1.left);
    const isTouchingVertically = rect1.right > rect2.left && rect1.left < rect2.right && (rect1.bottom === rect2.top || rect2.bottom === rect1.top);
    return isTouchingHorizontally || isTouchingVertically;
    /*return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );*/
}

function overlap(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    //console.log(innerRect);
    const rect2 = div2.getBoundingClientRect();
    //console.log(outerRect);
    return !(
        rect1.top > rect2.bottom ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.right < rect2.left
    );
}

function inside(innerDiv, outerDiv) {
    const innerRect = innerDiv.getBoundingClientRect();
    const outerRect = outerDiv.getBoundingClientRect();
    return (
        innerRect.top >= outerRect.top &&
        innerRect.left >= outerRect.left &&
        innerRect.bottom <= outerRect.bottom &&
        innerRect.right <= outerRect.right
    );
}

function relocatePlayer(x, y) {
  let plr = document.getElementById("player");
  playerX = x;
  playerY = y;
  plr.style.left = playerX + "px";
  plr.style.top = playerY + "px";
}

/*  OLD CODE FROM HERE

import * as level from './levelBuilder.js';
var Left = 0;
var Top = 0;
var playerMaxSpeed = 20;
var oldManT = false
var inventory = {};
var invString = "";
level.buildLevel1()

function collision(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    return (
        rect1.left <= rect2.right &&
        rect1.right >= rect2.left &&
        rect1.top <= rect2.bottom &&
        rect1.bottom >= rect2.top
    );
}


function inside(innerDiv, outerDiv) {
    const innerRect = innerDiv.getBoundingClientRect();
    const outerRect = outerDiv.getBoundingClientRect();

    return (
        innerRect.top >= outerRect.top &&
        innerRect.left >= outerRect.left &&
        innerRect.bottom <= outerRect.bottom &&
        innerRect.right <= outerRect.right
    );
}



document.addEventListener("keypress", function(event) {
  var door1 = document.getElementById("door1");
  var mover = document.getElementById("mover");
  var oldMan = document.getElementById("oldManHitbox");
  var text = document.getElementById("text");
  var game = document.getElementById("game");
  var gameCSS = window.getComputedStyle(game);
  var gameWidth = parseInt(game.offsetWidth) - parseInt(gameCSS.borderWidth) * 2;
  var gameHeight = parseInt(game.offsetHeight) - parseInt(gameCSS.borderWidth) * 2;
  var buttonDiv = document.getElementById("buttonDiv");
  var buttonNext = level.addButton("Next", "buttonNext", buttonDiv);
  buttonNext.style.display = "none";
  if (event.key == "a") {
    Left = Left - playerMaxSpeed;
    mover.style.left = Left + "px";
    if (parseInt(mover.style.left) == -playerMaxSpeed) {
      Left = Left + playerMaxSpeed;
      mover.style.left = Left + "px";
    }
  }
  if (event.key == "d") {
    Left = Left + playerMaxSpeed;
    mover.style.left = Left + "px";
    if (parseInt(mover.style.left) >= gameWidth) {
      Left = Left - playerMaxSpeed;
      mover.style.left = Left + "px";
    }
  }
  if (event.key == "w") {
    Top = Top - playerMaxSpeed;
    mover.style.top = Top + "px";
    if (parseInt(mover.style.top) == -playerMaxSpeed) {
      Top = Top + playerMaxSpeed;
      mover.style.top = Top + "px";
    }
  }
  if (event.key == "s") {
    Top = Top + playerMaxSpeed;
    mover.style.top = Top + "px";
    if (parseInt(mover.style.top) >= gameHeight) {
      Top = Top - playerMaxSpeed;
      mover.style.top = Top + "px";
    }
  }
  if (event.key == " ") {   
    if (inside(mover, door1)) {
      if (event.key == " ") {
        level.buildLevel2()
        Top = 0;
        Left = 0;
      }
    }
    else if (collision(mover, oldMan)) {
      if (!oldManT) {
        text.innerText = "Old Man: you finally awoke! weird blue cube. you have a long journey ahead of you, take this"
        oldManT = true;
        buttonNext.style.display = "";
        buttonNext.onclick = function() {
          text.innerHTML = "you recieved: WOODEN SWORD"
          inventory["WOODEN SWORD"] = 1;
          buttonNext.style.display = "none";
        }
      } else {
        text.innerHTML = "Old Man: go away.";
      }
    }
  }
  if (event.key == "1")
  {
    invString = ""
    for (var i in inventory)
      {
        invString = invString + i + ": " + inventory[i] + "\n";
      }
    text.innerHTML = invString;
  }
});*/
