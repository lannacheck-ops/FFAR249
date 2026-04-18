class LeftCharacter {
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
        this.characterDiv.style.position = "absolute";
        this.characterDiv.style.left = `clamp(200px,23vw, 650px)`;;
        this.characterDiv.style.top = `clamp(110px, 10vw, 15vw)`;
        this.characterDiv.style.zIndex = 5;
        this.characterDiv.style.height = "auto";
        // this.characterDiv.style.minHeight = 320 + "px";
        this.characterDiv.style.width = "clamp(100px, 30vw, 320px)";
        // Clamp(minimum size, preferred size, max size);

        // Add to the DOM
        document.querySelector("#game").appendChild(this.characterDiv);
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

