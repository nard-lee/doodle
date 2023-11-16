
let player = {

    color: "#ff9900",
    height: 32,
    old_x: 160,// these are what you should take note of. Don't worry, it's useful
    old_y: 160,// to keep track of old positions for many physics methods. These aren't one trick pony's.
    velocity_x: 0,
    velocity_y: 0,
    width: 32,
    x: 160 - 16,
    y: 100 - 16,

    // These functions just make it easy to read the collision code
    get bottom() { return this.y + this.height; },
    get oldBottom() { return this.old_y + this.height; },
    get left() { return this.x; },// kind of pointless, but used
    get oldLeft() { return this.old_x; },// to help visualize the collision methods
    get right() { return this.x + this.width; },
    get oldRight() { return this.old_x + this.width; },
    get top() { return this.y; },// equally pointless as left side calculations
    get oldTop() { return this.old_y; },

    display() {
        rect(this.x, this.y, this.height, this.width, this.color);
    }


};

let controller = {

    down: false, left: false, right: false, up: false,

    keyUpDown: function (event) {

        var key_state = (event.type == "keydown") ? true : false;

        switch (event.keyCode) {

            case 37: controller.left = key_state; break; // left key
            case 38: controller.up = key_state; break; // up key
            case 39: controller.right = key_state; break; // right key
            case 40: controller.down = key_state; break; // down key

        }

    }

};

let collision = {
    1: function (object, row, column) {
        this.bottomCollision(object, row);
    },
    2: function (object, row, column) {
        this.rightCollision(object, column);
    },
    3: function (object, row, column) {
        this.leftCollision(object, column);
    },
    4: function (object, row, column) {
        this.topCollision(object, row);
    },
    5: function (object, row, column) {
        if (this.topCollision(object, row)) { return; }
        if (this.leftCollision(object, column)) { return; }
        if (this.rightCollision(object, column)) { return; }
        this.bottomCollision(object, row);
    },
    leftCollision(object, column) {
        if (object.x - object.old_x > 0) {
            var left = column * game.world.tile_size;
            if (object.right > left && object.oldRight <= left) {
                object.velocity_x = 0;
                object.x = object.old_x = left - object.width - 0.001;
                return true;
            }
        }
        return false;
    },

    rightCollision(object, column) {
        if (object.x - object.old_x < 0) {
            var right = (column + 1) * game.world.tile_size;
            if (object.left < right && object.oldLeft >= right) {
                object.velocity_x = 0;
                object.old_x = object.x = right;
                return true;
            }
        }
        return false;
    },

    bottomCollision(object, row) {
        if (object.y - object.old_y < 0) {
            var bottom = (row + 1) * game.world.tile_size;
            if (object.top < bottom && object.oldTop >= bottom) {
                object.velocity_y = 0;
                object.old_y = object.y = bottom;
            }
        }
    },

    topCollision(object, row) {
        if (object.y - object.old_y > 0) {
            var top = row * game.world.tile_size;
            if (object.bottom > top && object.oldBottom <= top) {
                object.velocity_y = 0;
                object.old_y = object.y = top - object.height - 0.01;
                return true;
            }
        }
        return false;

    }
};

function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < tileMap.map.length; i++) {
        let posx = (i % tileMap.cols) * tileMap.tileSize;
        let posy = Math.floor(i / tileMap.cols) * tileMap.tileSize;
        if (tileMap.map[i] === 5) {
            rect(posx, posy, tileMap.tileSize, tileMap.tileSize, '#999');
        } else {
            rect(posx, posy, tileMap.tileSize, tileMap.tileSize, '#333');
        }

    }

    if (controller.down) { player.velocity_y += 0.5; }

    if (controller.left) { player.velocity_x -= 0.5; }

    if (controller.right) { player.velocity_x += 0.5; }

    if (controller.up) { player.velocity_y -= 0.5; }

    player.old_x = player.x;
    player.old_y = player.y;

    // player.x += player.velocity_x;
    // player.y += player.velocity_y;


    /*
    
    get bottom() { return this.y + this.height; },
    get oldBottom() { return this.old_y + this.height; },
    get left() { return this.x; },// kind of pointless, but used
    get oldLeft() { return this.old_x; },// to help visualize the collision methods
    get right() { return this.x + this.width; },
    get oldRight() { return this.old_x + this.width; },
    get top() { return this.y; },// equally pointless as left side calculations
    get oldTop() { return this.old_y; },

    */

    //check wall position

    let left_column = Math.floor(player.left / tileMap.tileSize); // left
    let right_column = Math.floor(player.right / tileMap.tileSize); // right
    let bottom_row = Math.floor(player.bottom / tileMap.tileSize); // bottom
    let top_row = Math.floor(player.top / tileMap.tileSize); // top

    // check if it is  a wall
    let botl = tileMap.map[bottom_row * tileMap.cols + left_column]; //
    let topl = tileMap.map[top_row * tileMap.cols + left_column];
    let botr = tileMap.map[bottom_row * tileMap.cols + right_column];
    let topr = tileMap.map[top_row * tileMap.cols + right_column];


    // if ((botl || botr) && player.bottom > top_row * 80) { //top
    //     player.velocity_y = 0;
    //     player.y = top_row * tileMap.tileSize + tileMap.tileSize - player.width;
    // }

    // if ((topl || topr) && player.top < bottom_row * 80) { //bottom
    //     player.velocity_y = 0;
    //     player.y = bottom_row * 80;
    // }

    // if((topl || botl) && player.left < right_column * 80){ // right
    //     player.velocity_x = 0;
    //     player.x = right_column * 80
    // }

    // if((topr || botr) && player.right > left_column * 80){ //left
    //     player.velocity_x = 0;
    //     player.x = right_column * 80 - 32;

    // }

    //console.log(bottom_row * 80, "::", player.top)

// Update player's x position
player.x += player.velocity_x;

// Calculate new tile positions
left_column = Math.floor((player.x + player.velocity_x) / tileMap.tileSize);
right_column = Math.floor((player.x + player.width + player.velocity_x) / tileMap.tileSize);

// Check for horizontal collisions
topl = tileMap.map[top_row * tileMap.cols + left_column];
botl = tileMap.map[bottom_row * tileMap.cols + left_column];
topr = tileMap.map[top_row * tileMap.cols + right_column];
botr = tileMap.map[bottom_row * tileMap.cols + right_column];

if((topl || botl) && player.velocity_x < 0){ // Moving left
    player.velocity_x = 0;
    player.x = (left_column + 1) * tileMap.tileSize;
}

if((topr || botr) && player.velocity_x > 0){ // Moving right
    player.velocity_x = 0;
    player.x = right_column * tileMap.tileSize - player.width;
}

// Update player's y position
player.y += player.velocity_y;

// Calculate new tile positions
top_row = Math.floor((player.y + player.velocity_y) / tileMap.tileSize);
bottom_row = Math.floor((player.y + player.height + player.velocity_y) / tileMap.tileSize);

// Check for vertical collisions
topl = tileMap.map[top_row * tileMap.cols + left_column];
botl = tileMap.map[bottom_row * tileMap.cols + left_column];
topr = tileMap.map[top_row * tileMap.cols + right_column];
botr = tileMap.map[bottom_row * tileMap.cols + right_column];

if ((topl || topr) && player.velocity_y < 0) { // Moving up
    player.velocity_y = 0;
    player.y = (top_row + 1) * tileMap.tileSize;
}

if ((botl || botr) && player.velocity_y > 0) { // Moving down
    player.velocity_y = 0;
    player.y = bottom_row * tileMap.tileSize - player.height;
}


    player.velocity_x *= 0.9;
    player.velocity_y *= 0.9;


    player.display();
    window.requestAnimationFrame(loop);

}

loop();
window.addEventListener("keydown", controller.keyUpDown);
window.addEventListener("keyup", controller.keyUpDown);
