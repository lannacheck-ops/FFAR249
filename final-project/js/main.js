let light = document.querySelector("#light");
let spotLight = document.querySelector("#spotLight");

window.onload = function () {
    let lightX = parseInt(getComputedStyle(light).left);
    let spotLightX = parseInt(getComputedStyle(spotLight).left);
    window.addEventListener("keydown", moveLight);

    function moveLight(e) {
        e.preventDefault()
        if (e.code === "ArrowLeft" && lightX > 520) {
            lightX -= 5;
            spotLightX = lightX - 130;
            light.style.left = lightX + "px"
            spotLight.style.left = spotLightX + "px"
        }
        if (e.code === "ArrowRight" && lightX < 1180) {
            lightX += 5;
            spotLightX = lightX - 130;
            light.style.left = lightX + "px"
            spotLight.style.left = spotLightX + "px"
        }
        console.log(lightX);
    }
};



