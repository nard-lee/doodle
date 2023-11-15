
class Planet {
    constructor(x, y, r, v, src){
        this.x = x;
        this.y = y;
        this.angle = 1;
        this.r = r;
        this.count = 0;
        this.planets = [];
        this.vel = v;
        this.imgsrc = src;  
        this.rot = 0;
    }
    display(){

        let img = new Image();
        img.src = 'asset/'+this.imgsrc; 

        let asteroid = new Image();
        asteroid.src = 'asset/Baren.png'; 

        let pcx = this.x + this.r * Math.cos(this.angle);
        let pcy = this.y + this.r * Math.sin(this.angle);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(this.rot);
        ctx.alpha = 0.4;
        strokeArc(0, 0, this.r, "#333");
        //line(0, 0, pcx, pcy, "#333")
        arc(pcx, pcy, 3, "#333");
        ctx.drawImage(img, pcx-30, pcy-30, 60, 60);

        ctx.restore();

    }
    update(delta){
        this.angle += this.vel;
        this.rot += 0.04;
    }
    show(){

        let pcx = this.x + this.r * Math.cos(this.angle);
        let pcy = this.y + this.r * Math.sin(this.angle);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.h / 2);
        arc(pcx, pcy, 5, "red");
        ctx.restore();
    }
    shower(){
        this.r += 1;
    }
}

let planet = [];
let lastFrameTime = 0;
let asteroid = [];

let rot = 0;

let sun = new Animator();
sun.setImg('sun', 4, 'sun');

for(let i = 1; i <= 4; i++){
    planet.push(new Planet(0, 0, i * 90, random(-0.01, 0.01),`pl${i+1}.png`));
}


function loop(timestamp){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let deltaTime = (timestamp - lastFrameTime) / 1000;

    if(Math.random() < 0.1){
        asteroid.push(new Planet(0, 0, random(0, 100), 0.01, ''));
    }

    for(let i = 0; i < asteroid.length; i++){
        asteroid[i].display();  
        asteroid[i].update(deltaTime)
        asteroid[i].shower();
    }

    for(let i = 0; i < asteroid.length; i++){
        if(asteroid[i].r > 400){
            asteroid.splice(i, 1);
        }
    }

    for(let i = 0; i < planet.length; i++){
        planet[i].display();
        planet[i].update(deltaTime);
    }


    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height/2);
    ctx.rotate(rot);
    sun.animate(-48, -48, 100, 100);
    ctx.restore();

    rot += 0.01;

    window.requestAnimationFrame(loop);


}

loop();