
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

function line(x1, y1, x2, y2, col){
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}

function arc(x, y, r, col){
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
}

function strokeArc(x, y, r, col){
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
}

function rect(x, y, w, h, col){
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.fillRect(x, y, w, h);
    ctx.fill();
    ctx.strokeStyle="#ccc";
    ctx.strokeRect(x, y, w, h);
    ctx.stroke();
    ctx.closePath();
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function text(x, y, text, col){
    ctx.beginPath();
    ctx.strokeStyle = col;
    ctx.font = "16px Tahoma";
    ctx.strokeText(text, x, y); 
    ctx.stroke();
    ctx.closePath();
}