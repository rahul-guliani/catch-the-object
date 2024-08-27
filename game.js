// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the basket
const basket = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 50,
    width: 300,
    height: 20,
    dx: 20
};

// Initialize the falling objects array
let objects = [];
let objectCount = 5;

// Initialize falling objects
function createObjects() {
    objects = [];
    for (let i = 0; i < objectCount; i++) {
        objects.push({
            x: Math.random() * (canvas.width - 20),
            y: Math.random() * -canvas.height,  // '-' to set starting y coordinate above the canvas
            width: 20,
            height: 20,
            dy: 1 + Math.random() * 2   // Varying falling speeds
        });
    }
}

// Define the score
let score = 0;

// Define the excaped objects
let escaped_objects = 0;

// Draw the basket
function drawBasket() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);
}

// Draw the falling objects
function drawObjects() {
    ctx.fillStyle = 'red';
    objects.forEach(object => {
        ctx.fillRect(object.x, object.y, object.width, object.height); 
    });   
}

// Draw the score
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Draw the no. of escaped objects
function drawEscapedNumber() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText(`Escaped Objects: ${escaped_objects}`, 400, 20);
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
function updateObjects() {
    objects.forEach(object => {
        object.y += object.dy;
    
        // Check for collision with basket
        if (
            object.x + object.width > basket.x &&
            object.x < basket.x + basket.width &&
            object.y + object.height > basket.y
        ) {
            score++;
            resetObject(object);
        }
        
        // Check if the object has fallen off the screen
        if (object.y + object.height > canvas.height) {
            escaped_objects++;
            resetObject(object);
        }
    });
}

// Resetting th falling object's position
function resetObject(object) {
    object.x = Math.random() * (canvas.width - 20);
    object.y = Math.random() * - canvas.height;
    object.dy = 2 + Math.random() * 2;  // Reset speed
}

function drawGameOver() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'blue'
    ctx.textAlign = 'center'
    ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2)
}

// Update the game state
function update() {
    clearCanvas();
    drawBasket();
    drawObjects();
    drawScore();
    drawEscapedNumber();
    updateObjects();

    if (escaped_objects <= 5) {
        requestAnimationFrame(update);
    }
    else {
        drawGameOver();
    }
}

// Update score
//function updateScore() {
//    if
//}

// Start the game
moveBasket();
createObjects();
update();









