
let arrowKeys = {
    left: false,
    right: false,
    top: false,
    down: false,
    key(event) {
        let key_state = (event.type == "keydown") ? true : false;
        switch (event.code) {
            case 'ArrowRight': arrowKeys.right = key_state; break;
            case 'ArrowLeft': arrowKeys.left = key_state; break;
            case 'ArrowUp': arrowKeys.top = key_state; break;
            case 'ArrowDown': arrowKeys.down = key_state; break;
        }
    }
}


let player = new Player(canvas.width / 2, canvas.height / 2, 8);

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.display();
    player.update();

    player.addRays();

    window.requestAnimationFrame(loop);
}

loop();
document.addEventListener("keydown", arrowKeys.key, false);
document.addEventListener("keyup", arrowKeys.key, false);