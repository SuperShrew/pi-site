const flags = {
	testFlag: true,
	gotFirstWeapon: false
};

// PROBABLY overly complicated, but may allow for flexibility in dialog effects? (idk what I'm talking about)
class NPC {
	constructor(name, dialogs) {
		this.name = name; //string
		this.dialogs = dialogs; //map of arrays of function objects @_@
	}

	interact() {}	// override this function for your specific NPC

	doDialog(sequence) {
		playerCtrl = false;
		sequence[0]();
        btnNext.style.display = "";
		let i = 0;
        btnNext.onclick = function() {
        	i++;
        	if (i < sequence.length) {
				sequence[i]();
			} else {
				textElement.innerHTML = "";
				btnNext.style.display = "none";
				playerCtrl = true;
			}
		}
	}


	dialogTalk(text){
		textElement.innerHTML = this.name + ": " + text;
	}

	dialogNarration(text){
		textElement.innerHTML = text;
	}

	dialogGetItem(item, quantity) {
		if (quantity < 1) {
			throw "Error: cannot receive less than 1 of an item.";
			return;
		}
		textElement.innerHTML = "you received " + String(quantity) + " " + item + "(s).";
    	playerInventory[item] += quantity;
	}

	dialogGiveItem(item, quantity) {
		if (quantity < 1) {
			throw "Error: cannot give less than 1 of an item.";
			return;
		}
		if (quantity > playerInventory[item] || playerInventory[item] === undefined) {
			throw "Error: cannot give more items than you have.";
			return;
		}
		textElement.innerHTML = "you gave " + this.name + " " + String(quantity) + " " + item + "(s).";
    	playerInventory[item] -= quantity;
	}
	
	dialogChangeLevel(levelNum) {
		clearGame();
		gameElement.appendChild(buildLevel(levelNum));
		currentLevel = levelNum;
		textElement.innerHTML = "Entering level  " + String(levelNum);
	}
}

/////////////////////////////////////////// NPCs ///////////////////////////////////////////////
// NPC definition: Old Man //
const npcOldMan = new NPC("Old Man", new Map());
// 1st meeting dialog
npcOldMan.dialogs.set("meet",
	[
		function() {
			npcOldMan.dialogTalk("you finally awoke! weird blue cube. you have a long journey ahead of you, take this");
		},
		function() {
			npcOldMan.dialogGetItem("WOODEN SWORD", 1);
			flags.gotFirstWeapon = true;
		}
	]);
// default dialog
npcOldMan.dialogs.set("general",
	[
		function() {
			npcOldMan.dialogTalk("go away.");
		}
	]);

npcOldMan.interact = function() {
	//do flag check here?
	if (!flags.gotFirstWeapon) {
		npcOldMan.doDialog(npcOldMan.dialogs.get("meet"));
	} else {
		npcOldMan.doDialog(npcOldMan.dialogs.get("general"));
	}
}


/////////////////////////////////////////// Misc Interactables ////////////////////////////////////////////
// 'NPC' definition: Cave Exit //
const doorCaveExit = new NPC("Cave Exit", new Map());
// use message
doorCaveExit.dialogs.set("enter",
	[
		function() {
			doorCaveExit.dialogNarration("You go through");
		},
		function() {
			doorCaveExit.dialogChangeLevel(2);
			relocatePlayer(100, 0);
		}
	]);

doorCaveExit.interact = function() {
	doorCaveExit.doDialog(doorCaveExit.dialogs.get("enter"));
}

// 'NPC' definition: Cave Enter //
const doorCaveEnter = new NPC("Cave Entrance", new Map());

doorCaveEnter.dialogs.set("enter",
	[
		function() {
			doorCaveEnter.dialogNarration("You go through");
		},
		function() {
			doorCaveEnter.dialogChangeLevel(1);
			relocatePlayer(100, 280);
		}
	]);

doorCaveEnter.interact = function() {
	doorCaveEnter.doDialog(doorCaveEnter.dialogs.get("enter"));
}