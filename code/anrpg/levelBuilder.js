class Element {
  static addDiv(id, _class, parentElement, top, left, width, height, position) {
    const newDiv = document.createElement("div");
    newDiv.id = id;
    newDiv.style.top = top;
    newDiv.style.left = left;
    newDiv.style.width = width;
    newDiv.style.height = height;
    newDiv.style.position = position;
    newDiv.className = _class;
    parentElement.appendChild(newDiv);
    return newDiv;
  }
  static addHitbox(parentElement, type) {
    let hitboxDiv = document.createElement("div");
    hitboxDiv.className = type + "Hitbox";
    parentElement.appendChild(hitboxDiv);
    return hitboxDiv;
  }
  static addButton(id, parentElement, text, top, left, position, centre) {
    let button = document.createElement("button");
    button.id = id;
    button.innerHTML = text;
    button.style.top = top
    button.style.left = left
    button.style.position = position
    if (centre) {
      button.style.transform = "translateX(-50%)"
    }
    parentElement.appendChild(button);
    return button;
  }
  static addHeading(parentElement, text, align) {
    let heading = document.createElement("h1");
    heading.innerText = text;
    heading.style.textAlign = align;
    parentElement.appendChild(heading);
    return heading;
  }
}

function clearGame() {
  document.getElementById("game").innerHTML = "";
}

function buildLevel(levelNum) {
  let base = document.createElement("div");
  base.style.width = "300px"
  base.style.height = "300px"
  switch(levelNum) {
  case 0:
    //Element.addHeading(base, "Web RPG thing", "center");
    Element.addButton("pla", base, "Play", "100px", "50%", "absolute", true);
    //document.getElementById("text").innerText = "By Matt and Josh"
    base.style.backgroundColor = "black";
    base.style.width = "300px";
    base.style.height = "300px";
    base.style.position = "absolute";
    return base;
  case 1:
    Element.addDiv("player", "", base, "", "", "20px", "20px", "relative");
    let npc = Element.addDiv("OldMan", "NPC1", base, "100px", "280px", "", "", "relative");
    npcByID.set("OldMan", npcOldMan);
    Element.addHitbox(npc, "NPC");
    Element.addDiv("caveExit", "door1", base, "270px", "30%", "", "", "")
    npcByID.set("caveExit", doorCaveExit);
    return base;
  case 2:
    base.style.backgroundColor = "green";
    Element.addDiv("player", "", base, "", "", "20px", "20px", "relative");
    Element.addDiv("caveEnter", "door1", base, "0px", "30%", "", "", "");
    npcByID.set("caveEnter", doorCaveEnter);
    
    return base;
  }
}

// OLD CODE FROM HERE

function test() {
  alert("test")
}

function addDiv (id, parentElement) {
  var newDiv = document.createElement("div");
  newDiv.id = id;
  parentElement.appendChild(newDiv);

  return newDiv;
}

///formatDiv, addHitbox, etc. ?

function addHitbox (element) {
  var hitboxDiv = document.createElement("div");
  hitboxDiv.id = element.id + "Hitbox";
  element.appendChild(hitboxDiv);
  return hitboxDiv;
}

function clearCurrentLevel () {
  document.getElementById("game").innerHTML = "";
}

function buildLevel1 () {
  const game = document.getElementById("game");
  
  var mover = addDiv("mover", game);
  ///set colour and stuff
  var exit = addDiv("door1", game);

  
  var oldMan = addDiv("oldMan", game);
  addHitbox(oldMan);
} 
function buildLevel2() {
  const game = document.getElementById("game");

  game.innerHTML = ""
  var mover = addDiv("mover", game);
  game.style.backgroundColor = "green";
  ///set colour and stuff
}

function addButton(text, id, parentElement) {
  var button = document.createElement("button");
  button.id = id;
  button.innerHTML = text;
  parentElement.appendChild(button);
  return button;
}
