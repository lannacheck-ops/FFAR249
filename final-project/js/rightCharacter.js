class RightCharacter {
    constructor(data, index) {
        this.x = data.x;
        this.y = data.y;
        this.characterDiv = document.createElement("img");
        this.imgSrc = data.image;
        this.question = data.question;
        this.index = index;
    }

    /**
 * Adds the image to the DOM
 */
    render() {
        this.characterDiv.src = this.imgSrc;
        this.characterDiv.style.position = "absolute"
        this.characterDiv.style.left = `clamp(100px, 53vw, 1000px)`;
        // this.characterDiv.style.top = this.y + "%";
        this.characterDiv.style.top = `clamp(110px, 10vw, 15vw)`;
        this.characterDiv.style.zIndex = 5;
        this.characterDiv.style.height = "auto";
        // this.characterDiv.style.minHeight = 320 + "px";
        this.characterDiv.style.width = "clamp(100px, 30vw, 320px)";
        // Add to the DOM
        document.querySelector("#game").appendChild(this.characterDiv);
        console.log(this.characterDiv);
    }

    /**
     * Removes character from the stage if it isnt the character stage lvl
     */
    checkStage(currentStage) {
        if (currentStage !== this.index) {
            this.characterDiv.remove();
        }
    }
}