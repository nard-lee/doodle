

function isCollidingWithTile(circle, tileX, tileY, tileSize) {
    // Calculate the closest point in the tile to the circle
    let closestX = Math.max(tileX, Math.min(circle.x, tileX + tileSize));
    let closestY = Math.max(tileY, Math.min(circle.y, tileY + tileSize));

    // Calculate the distance between the circle's center and this closest point
    let dx = circle.x - closestX;
    let dy = circle.y - closestY;

    // If the distance is less than the circle's radius, a collision is happening
    return (dx * dx + dy * dy) < (circle.r * circle.r);
}
