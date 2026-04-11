class RightCharacter {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.characterDiv = document.createElement("img");
        this.imgSrc = data.image;
        this.question = data.question;
    }

    render() {
        this.characterDiv.src = this.imgSrc;
        this.characterDiv.style.position = "absolute"
        this.characterDiv.style.left = this.x + "px";
        this.characterDiv.style.top = this.y + "px";
        this.characterDiv.style.zIndex = 5;
        this.characterDiv.style.height = 320 + "px";
        this.characterDiv.style.width = "auto";
        // Add to the DOM
        document.querySelector("#game").appendChild(this.characterDiv);
        console.log(this.characterDiv);
    }
}