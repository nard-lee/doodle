
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

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.display();
    player.update();

    player.addRays();

    for (let row = 0; row < tileMap.rows; row++) {
        for (let col = 0; col < tileMap.cols; col++) {
            // Get the tile's value
            let tile = tileMap.map[row * tileMap.cols + col];

            // If the tile is not empty
            if (tile !== 0) {
                // Calculate the tile's position
                let tileX = col * tileMap.tileSize;
                let tileY = row * tileMap.tileSize;

                // Check for a collision
                if (isCollidingWithTile(player, tileX, tileY, tileMap.tileSize)) {

                    // Calculate the distance from the center of the circle to the center of the tile
                    let dx = player.x - (tileX + tileMap.tileSize / 2);
                    let dy = player.y - (tileY + tileMap.tileSize / 2);

                    // Calculate the angle of this distance vector
                    let angle = Math.atan2(dy, dx);

                    // Calculate the minimum distance between the circle and the tile (half the tile's diagonal plus the circle's radius)
                    let minDist = Math.sqrt((tileMap.tileSize * tileMap.tileSize) / 2) + player.r;
                    // Calculate the overlap between the circle and the tile
                    let overlap = minDist - Math.sqrt(dx * dx + dy * dy);

                    // Move the circle to this minimum distance from the tile
                    player.x = tileX + tileMap.tileSize / 2 + Math.cos(angle) * minDist;
                    player.y = tileY + tileMap.tileSize / 2 + Math.sin(angle) * minDist;
                }
            }
        }
    }


    window.requestAnimationFrame(loop);
}

loop();
document.addEventListener("keydown", arrowKeys.key, false);
document.addEventListener("keyup", arrowKeys.key, false);