class Animator {
    constructor(){
        this.images = [];
        this.frameCount = 0;
    }
    animate(x, y, w, h){
        setInterval(()=>{
            ctx.drawImage(this.images[this.frameCount], x, y, w, h);
            this.frameCount++;
        
            if (this.frameCount >= this.images.length) {
                this.frameCount = 0;
            }
        }, 120)();
    }
    setImg(src, len, title){
        for(let i = 0;i <= len; i++){
            let img = new Image();
            img.src = `${src}/${title+i}.png`;
            this.images.push(img);
        }
    }
}

let sprite = new Animator();

sprite.setImg('sun', 4, 'sun');

function loop(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sprite.animate(100, 100, 50, 50);
    window.requestAnimationFrame(loop);

}

loop();





