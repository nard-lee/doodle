class Animator {
    constructor() {
        this.images = [];
        this.frameCount = 0;
    }
    animate(x, y, w, h) {
        if (this.images.length > 0) {
            ctx.drawImage(this.images[this.frameCount % this.images.length], x, y, w, h);
            this.frameCount++;
        }
    }
    setImg(src, len) {
        for (let i = 0; i <= len; i++) {
            let img = new Image();
            img.src = `${src}/${src + i}.png`;
            img.onload = () => this.images.push(img);
        }
    }
}







