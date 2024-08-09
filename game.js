// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the basket
const basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 50,
    width: 100,
    height: 20,
    dx: 5
};

// Define the falling object
const object = {
    x: Math.random() * (canvas.width - 20),
    y: 0,
    width: 20,
    height: 20,
    dy: 2
};

// Define the score
let score = 0;

// Draw the basket
function drawBasket() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

// Draw the falling object
function drawObject() {
    ctx.fillStyle = 'red';
    ctx.fillRect(object.x, object.y, object.width, object.height);
}

// Draw the score
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the basket
function moveBasket() {
    document.addEventListener('keydown', function (event) {
        if (event.key === 'ArrowLeft' && basket.x > 0) {
            basket.x -= basket.dx;
        } else if (event.key === 'ArrowRight' && basket.x + basket.width < canvas.width) {
            basket.x += basket.dx;
        }
    });
}

// Update the falling object's position
function updateObject() {
    object.y += object.dy;

    // Check for collision with basket
    if (
        object.x + object.width > basket.x &&
        object.x < basket.x + basket.width &&
        object.y + object.height > basket.y
    ) {
        score++;
        resetObject();
    }

    // Check if the object has fallen off the screen
    if (object.y + object.height > canvas.height) {
        resetObject();
    }
}

// Resetting th falling object's position
function resetObject() {
    object.x = Math.random() * (canvas.width - 20);
    object.y = 0;
}

// Update the game state
function update() {
    clearCanvas();
    drawBasket();
    drawObject();
    drawScore();
    updateObject();
    requestAnimationFrame(update)
}

// Start the game
moveBasket();
update();







