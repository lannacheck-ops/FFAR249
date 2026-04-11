let light = document.querySelector("#light");
let spotLight = document.querySelector("#spotLight");
let keyCodes = {
    a: 65,
    d: 68
};
let stageLvl = -1;
let characterData = null;
window.onload = function () {
    goFetch();
    let lightX = parseInt(getComputedStyle(light).left);
    let spotLightX = parseInt(getComputedStyle(spotLight).left);
    window.addEventListener("keydown", moveLight);
    window.addEventListener("click", changeLevel);

    function moveLight(e) {
        e.preventDefault()
        if (lightX > 520) {
            if (e.code === "ArrowLeft" || e.keyCode === keyCodes.a) {
                lightX -= 5;
                spotLightX = lightX - 130;
                light.style.left = lightX + "px"
                spotLight.style.left = spotLightX + "px"
            }
        }
        if (lightX < 1180) {
            if (e.code === "ArrowRight" || e.keyCode === keyCodes.d) {
                lightX += 5;
                spotLightX = lightX - 130;
                light.style.left = lightX + "px"
                spotLight.style.left = spotLightX + "px"
            }
        }

        console.log(lightX);
    }
};

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
    let leftCharacter = new LeftCharacter(leftData);
    let rightCharacter = new RightCharacter(rightData);

    leftCharacter.render();
    rightCharacter.render();
}



