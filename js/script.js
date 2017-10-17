/* jshint esversion: 6 */
// https://www.youtube.com/watch?v=yq2au9EfeRQ#





/* **************** */
/* Setup the Canvas */
/* **************** */

// Selects the canvas element.
var canvas = document.querySelector('canvas');

// Sets canvas size to fill the browser window.
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');





/* **** */
/* Main */
/* **** */

// var minRadius = 4;
var maxRadius = 50;

// Array holds color values which are randomly assigned to circles as they are created.
var colorArray = [
  'hsla(0,100%,50%,0.2)',
  'hsla(25,100%,50%,0.2)',
  'hsla(50,100%,50%,0.2)'
];

// Mouse coordinates are stored within the mouse object.
var mouse = {
  x: undefined,
  y: undefined
};

// The function takes the event that is listened for as an argument.
window.addEventListener('mousemove', function(event) {
  // event.x and y are taken from the event that has been passed into the function and are given to the mouse object above.
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});




// This function defines the circle object.
// The capital letter indicates that Circle is an object.
function Circle(x, y, xVelocity, yVelocity, radius) {
  // This list of assignments is not affected by looping. Its values are constant.
  this.x = x;
  this.y = y;
  this.xVelocity = xVelocity;
  this.yVelocity = yVelocity;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  // This draws the circle at the given x & y coordinates and is called within the update function below.
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    // c.strokeStyle = 'hsla(10,100%,70%,0.5)';
    // c.stroke();
  };

  this.update = function() {
    // changes direction of motion when width of screen is reached
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.xVelocity = -this.xVelocity;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.yVelocity = -this.yVelocity;
    }

    // Adds to x & y coordinates each time the loop is run so that the circle will be redrawn in a new location.
    this.x += this.xVelocity;
    this.y += this.yVelocity;

    // Interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    // Runs the draw function, drawing the circle in it's new x & y coordinates.
    this.draw();
  };
}




var circleArray = [];

// This for loop creates multiples of the circle object and puts them into the array above.
for (var i = 0; i < 1000; i++) {
  // These set the spawn location within the browser window.
  var x = Math.random() * (innerWidth - radius * 2) + radius;
  var y = Math.random() * (innerHeight - radius * 2) + radius;
  // These set the speed that the circle will move and in what direction.
  // Math.random() - 0.5 gives you either a negitive or positive value.
  var xVelocity = (Math.random() - 0.5) * 2;
  var yVelocity = (Math.random() - 0.5) * 1;
  // This sets the size of the circle.
  var radius = Math.random() * 10 + 1;

  // This creates a new circle object each time the for loop runs.
  circleArray.push(new Circle(x, y, xVelocity, yVelocity, radius));
}




// This causes a loop: function animate() {requestAnimationFrame(animate);
function animate() {
  requestAnimationFrame(animate);

  // This clears the screen every time the loop runs
  c.clearRect(0,0,innerWidth,innerHeight);

  // This calls the update function within every circle object in the circle array.
  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}
animate();
