class Animator {
    constructor() {
        this.images = [];
        this.frameCount = 0;
    }
    animate(x, y, w, h) {

        ctx.drawImage(this.images[this.frameCount], x, y, w, h);
        this.frameCount++;

        if (this.frameCount >= this.images.length) {
            this.frameCount = 0;
        }

    }
    setImg(src, len, title) {
        for (let i = 0; i <= len; i++) {
            let img = new Image();
            img.src = `${src}/${title + i}.png`;
            this.images.push(img);
        }
    }
}







