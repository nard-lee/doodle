
let tileMap = {
    cols: 10,
    rows: 10,
    tileSize: 80,
    map: [
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 5,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 5,
        5, 0, 0, 5, 0, 0, 5, 0, 0, 5,
        5, 0, 0, 5, 5, 5, 5, 0, 0, 5,
        5, 0, 0, 5, 0, 0, 5, 0, 0, 5,
        5, 0, 0, 5, 0, 0, 5, 0, 0, 5,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 5,
        5, 0, 0, 0, 0, 0, 0, 0, 0, 5,
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5,

    ],
    display(x, y, color) {
        ctx.beginPath();
        ctx.globalAlpha = 0.8;
        ctx.strokeStyle = "#ccc";
        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
        ctx.stroke();
        ctx.closePath();
    }
};