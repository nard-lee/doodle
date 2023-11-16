
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
    get oldTop() { return this.old_y; }

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

function loop(){

    game.player.old_x = game.player.x;
    game.player.old_y = game.player.y;

    let left_column    = Math.floor(game.player.left / game.world.tile_size);
    let right_column   = Math.floor(game.player.right / game.world.tile_size);
    let bottom_row     = Math.floor(game.player.bottom / game.world.tile_size);
    let top_row    = Math.floor(game.player.top / game.world.tile_size);
}