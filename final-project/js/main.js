let light = document.querySelector("#light");
let spotLight = document.querySelector("#spotLight");
const game = document.querySelector("#game");
let keyCodes = {
    a: 65,
    d: 68
};
let stageLvl = -1;
let characterData = null;
let leftCharacterArr = [];
let rightCharacterArr = [];
let leftActive = false;
let rightActive = false;
window.onload = function () {
    // Fetch the JSON data
    goFetch();
    // Get the spotlight position
    let lightX = parseInt(getComputedStyle(light).left);
    let spotLightX = parseInt(getComputedStyle(spotLight).left);
    // Move spotlight using keyboard
    window.addEventListener("keydown", moveLight);
    window.addEventListener("click", ToggleCurtains);
    /**
     * Move the spotlight using keyboard
     */
    function moveLight(e) {
        e.preventDefault()
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

        console.log(lightX);
    }
};
/**
 * Load JSON file with the character/stagelvl data
 */
async function goFetch() {
    try {
        // Try to do what is in the accolades
        // Certain functions use waiting mechanics(see MDN functions that use waiting)
        let response = await fetch('files/stages.json');
        let data = await response.json();
        // console.log(response);
        characterData = data;
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
    console.log(leftData, rightData);
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
    if (!game.classList.contains("open")) {
        // setTimeout(changeLevel, 200)
        changeLevel();
    }
    game.classList.toggle("open");
}

// /**
//  * Close curtains
//  */
// function closeCurtains() {
//     game.classList.remove("open");
// }



