
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

        let sun = new Image();
        sun.src = 'asset/pl1.png';

        let pcx = this.x + this.r * Math.cos(this.angle);
        let pcy = this.y + this.r * Math.sin(this.angle);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(this.rot);
        ctx.alpha = 0.4;
        strokeArc(0, 0, this.r, "#333");
        line(0, 0, pcx, pcy, "#333")
        arc(pcx, pcy, 20, "#333");
        ctx.drawImage(img, pcx-30, pcy-30, 60, 60);
        arc(0, 0, 30, "#333");
        ctx.drawImage(sun, -38, -38, 70, 70);

        ctx.restore();

    }
    update(){
        this.angle += this.vel;
        this.rot += 0.04;
    }
}

let planet = [];

for(let i = 1; i <= 4; i++){
    planet.push(new Planet(0, 0, i * 95, random(-0.03, 0.03),`pl${i+1}.png`));
}


function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < planet.length; i++){
        
        planet[i].display();
        planet[i].update();
    }




    window.requestAnimationFrame(loop);

}

loop();