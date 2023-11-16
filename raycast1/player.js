
class Player {
    constructor(x, y, r) {
        this.angle = 0;
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = 2;
    }

    display() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.strokeStyle = "#000";
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.r * Math.cos(this.angle), this.y + this.r * Math.sin(this.angle));
        ctx.stroke();
        ctx.closePath();
    }

    update() {

        if (arrowKeys.left) this.angle -= 0.1;
        if (arrowKeys.right) this.angle += 0.1;

        if (arrowKeys.top) {
            this.x += this.speed * Math.cos(this.angle);
            this.y += this.speed * Math.sin(this.angle);
        }
        if (arrowKeys.down) {
            this.x -= this.speed * Math.cos(this.angle);
            this.y -= this.speed * Math.sin(this.angle);
        }

    }
    addRays() {

        let rayAngle;
        let rayX;
        let rayY;

        for (let i = -40; i <= 40; i += .5) {

            rayAngle = this.angle + i * Math.PI / 180;
            rayX = this.x + 300 * Math.cos(rayAngle);
            rayY = this.y + 300 * Math.sin(rayAngle);

            line(this.x, this.y, rayX, rayY, '#fff')

        }

    }
}