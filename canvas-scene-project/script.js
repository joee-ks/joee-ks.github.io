const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
const hunter = new Image();
const crow = new Image();

bg.src = "images/background.jpeg";
hunter.src = "images/hunter.png";
crow.src = "images/crow.png";

let imagesLoaded = 0;

function checkAllImagesLoaded() {
  imagesLoaded++;
  if (imagesLoaded === 3) {
    drawScene();
  }
}

bg.onload = checkAllImagesLoaded;
hunter.onload = checkAllImagesLoaded;
crow.onload = checkAllImagesLoaded;

function drawScene() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(hunter, 500, 470, 200, 320); // adjust size/position
  ctx.drawImage(crow, 200, 120, 250, 250);   // adjust size/position 

  // Flipped crow (right side, mirrored)
  ctx.save(); // Save the current context state
  ctx.scale(-1, 1); // Flip horizontally
  ctx.drawImage(crow, -canvas.width + 180, 120, 250, 250); // x is negative because of flipped scale
  ctx.restore(); // Restore context state

  ctx.shadowColor = "black";
  ctx.shadowBlur = 6;
  ctx.fillStyle = "white";
  ctx.font = "32px Georgia";
  ctx.fillText("Cainhurst Castle", 40, 60);
  ctx.shadowBlur = 0;
}
