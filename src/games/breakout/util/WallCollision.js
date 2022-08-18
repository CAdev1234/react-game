const WallCollision = (
    ballObj,
    canvas,
    // player,
    paddleProps,
) => {
    let isLost = false;
    if (ballObj.y + ballObj.rad > canvas.height) {
        // player.lives--;
        isLost = true;
        ballObj.x = paddleProps.x;
        ballObj.y = paddleProps.y - 30;
        ballObj.dx = 6 * (Math.random() * 2 - 1);
        ballObj.dy = -6;
    }
    if (ballObj.y - ballObj.rad < 0) {
        ballObj.dy *= -1;
    }

    if (ballObj.x + ballObj.rad > canvas.width || ballObj.x - ballObj.rad < 0) {
        ballObj.dx *= -1;
    }
    return isLost;
}
export default WallCollision;