// Elements
let light = document.querySelector("#light");
let spotLight = document.querySelector("#spotLight");
const game = document.querySelector("#game");
const dialogueText = document.querySelector("#dialogueText");
const like = document.querySelector("#like");
const popup = document.querySelector("#popup");
const input = document.querySelector("#input");
const question = document.querySelector("#question");
const OkBtn = document.querySelector("#OkBtn");
const dialogueContainer = document.querySelector("#dialogueContainer");

let userInput = "";

// Keyboard
let keyCodes = {
    a: 65,
    d: 68
};
// Data
// Stage Data
let stageLvl = -1;
let characterData = null;

let leftCharacterArr = [];
let rightCharacterArr = [];
let leftActive = false;
let rightActive = false;

// Dialog Data
let dialogData = null;
let dialogActive = false;
let dialog = {
    active: false,
    stage: 0,
    index: 0
}
window.onload = function () {
    // Fetch the JSON data
    goFetch();
    // Get the spotlight position
    let lightX = parseInt(getComputedStyle(light).left);
    let spotLightX = parseInt(getComputedStyle(spotLight).left);
    // Move spotlight using keyboard
    window.addEventListener("keydown", moveLight);
    /**
     * CLICK EVENTS
     */
    window.addEventListener("click", updateDialog);
    // Like button
    like.addEventListener("click", clickLike);
    // OK button
    OkBtn.addEventListener("click", okButton);
    /**
     * Move the spotlight using keyboard
     */
    function moveLight(e) {
        // e.preventDefault()
        if (!game.classList.contains("open") || !popup.classList.contains("hidden") || like.classList.contains("press")) {
            return;
        }

        if (!leftActive) {
            if (e.code === "ArrowLeft" || e.keyCode === keyCodes.a) {
                lightX = 600;
                spotLightX = lightX - 130;
                light.style.left = lightX + "px";
                spotLight.style.left = spotLightX + "px";
                leftActive = true;
                rightActive = false;
            }
        }
        if (!rightActive) {
            if (e.code === "ArrowRight" || e.keyCode === keyCodes.d) {
                lightX = 1060;
                spotLightX = lightX - 130;
                light.style.left = lightX + "px";
                spotLight.style.left = spotLightX + "px";
                rightActive = true;
                leftActive = false;
            }
        }

        // console.log(lightX);
    }
};
/**
 * Load JSON file with the character/stagelvl data and dialog data
 */
async function goFetch() {
    try {
        let response1 = await fetch('files/stages.json');
        characterData = await response1.json();

        let response2 = await fetch('files/mainDialog.json');
        dialogData = await response2.json();
    }
    catch (err) {
        // Catches the error if the "response" is not fetched
        console.log(err)
    }
}
/**
 * Increase stage level and call the create character function based on the stage level(so it calls the right charcater at the right level)
 */
function changeLevel() {
    if (stageLvl < 3) {
        stageLvl++;
    }
    if (stageLvl === 0) {
        createCharacters(stageLvl)
    }
    if (stageLvl === 1) {
        createCharacters(stageLvl)
    }
    if (stageLvl === 2) {
        createCharacters(stageLvl)
    }
    if (stageLvl === 3) {
        createCharacters(stageLvl)
    }
}
/**
 * Create character classes
 */
function createCharacters(lvlIndex) {
    console.log(characterData);
    const leftData = characterData[lvlIndex].leftSide;
    const rightData = characterData[lvlIndex].rightSide;

    let leftCharacter = new LeftCharacter(leftData, lvlIndex);
    let rightCharacter = new RightCharacter(rightData, lvlIndex);
    // Add new characters to an array
    leftCharacterArr.push(leftCharacter);
    rightCharacterArr.push(rightCharacter);
    // Render the characters
    leftCharacter.render();
    rightCharacter.render();

    checkCharatersOnStage();
    function checkCharatersOnStage() {
        for (let i = 0; i < leftCharacterArr.length; i++) {
            leftCharacterArr[i].checkStage(lvlIndex);
        }
        for (let i = 0; i < rightCharacterArr.length; i++) {
            rightCharacterArr[i].checkStage(lvlIndex);
        }
    }
}

/**
 * Open/Close curtains
 */
function ToggleCurtains() {
    // If the curtains are closed change the layout
    if (!game.classList.contains("open")) {
        // Reset spotlight position when curtains close
        leftActive = false;
        rightActive = false;
        lightX = 850;
        spotLightX = lightX - 130;
        light.style.left = lightX + "px";
        spotLight.style.left = spotLightX + "px";
        // Change stage lvl
        changeLevel();
    }

    game.classList.toggle("open");
}


/**
 * Update Dialog
 */
function updateDialog() {
    // What dialog stage are we at 
    const stageTxt = dialogData[dialog.stage]
    // If the dialog index is shorter than the the amount of dialog in that stage then set the dialog active to true
    if (dialog.index < stageTxt.length) {
        dialog.active = true;
        dialogueContainer.classList.remove("hidden");
    }
    // If the dialog index is longer than the the amount of dialog in that stage then set the dialog active to false
    if (dialog.index >= stageTxt.length) {
        dialog.active = false;
        dialogueText.textContent = "";
        dialogueContainer.classList.add("hidden");
    }

    if (dialog.stage === 0 && dialog.index === 1) {
        ToggleCurtains();
    }
    if (dialog.stage === 1 && dialog.index === 0) {
        ToggleCurtains();
        like.classList.remove("press");
    }
    if (dialog.stage === 1 && dialog.index === 1) {
        ToggleCurtains();
    }
    if (dialog.stage === 2 && dialog.index === 0) {
        ToggleCurtains();
        like.classList.remove("press");
        setTimeout(ToggleCurtains, 1000);
    }
    if (dialog.stage === 3 && dialog.index === 0) {
        ToggleCurtains();
        like.classList.remove("press");
        setTimeout(ToggleCurtains, 1000);
    }
    // Set the dialog text and add the dialog index
    if (dialog.active) {
        dialogueText.textContent = stageTxt[dialog.index];
        dialog.index++
    }
}

/**
 * Click the like button to trigger popup box
 */
function clickLike() {
    if (!like.classList.contains("press") && game.classList.contains("open")) {
        if (leftActive || rightActive) {
            if (leftActive) {
                const stageQuestion = leftCharacterArr[stageLvl].question;
                question.textContent = stageQuestion
            }
            if (rightActive) {
                const stageQuestion = rightCharacterArr[stageLvl].question;
                question.textContent = stageQuestion
            }
            popup.classList.remove("hidden");
            input.focus();
        }
    }

    if (like.classList.contains("press") && spotLight.style.opacity < 0.5) {
        spotLight.style.opacity = parseFloat(spotLight.style.opacity) + 0.01;
    }
    if (like.classList.contains("press") && spotLight.style.opacity >= 0.5) {
        dialog.stage++;
        dialog.index = 0;
        console.log(dialog.stage);
    }
}

/**
 * Click Ok button and hide the popup
 */
function okButton() {
    userInput = input.value.trim();
    like.classList.add("press");
    popup.classList.add("hidden");
    spotLight.style.opacity = 0.1;
    input.value = "";
}