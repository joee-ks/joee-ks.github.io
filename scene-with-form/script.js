// Get DOM elements
const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");

const bgRadios = document.getElementsByName("background");
const slider = document.getElementById("character-slider");
const pumpkinToggle = document.getElementById("pumpkin-toggle");
const witchToggle = document.getElementById("witch-toggle");
const treeToggle = document.getElementById("tree-toggle");

const sound1 = document.getElementById("sound1");
const sound2 = document.getElementById("sound2");
const sound3 = document.getElementById("sound3");

// Image assets
const images = {
  backgrounds: {
    haunted: new Image(),
    graveyard: new Image(),
    forest: new Image()
  },
  character: new Image(),
  pumpkin: new Image(),
  witch: new Image(),
  tree: new Image()
};

// Set image sources
images.backgrounds.haunted.src = "images/hauntedhouse.png";
images.backgrounds.graveyard.src = "images/graveyard.png";
images.backgrounds.forest.src = "images/forest.png";
images.character.src = "images/ghost.png";
images.pumpkin.src = "images/pumpkin.png";
images.witch.src = "images/witch.png";
images.tree.src = "images/tree.png";

// Sound assets
const sounds = {
  owlhoot: new Audio("sounds/owlhoot.wav"),
  witchlaugh: new Audio("sounds/witchlaugh.wav"),
  thunder: new Audio("sounds/thunder.wav")
};

// Character position
let characterX = parseInt(slider.value);

// Draw the scene
function draw() {
  // Get selected background
  let selectedBg = [...bgRadios].find(r => r.checked).value;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.drawImage(images.backgrounds[selectedBg], 0, 0, canvas.width, canvas.height);

  // Draw character
  ctx.drawImage(images.character, characterX, 300, 60, 80);

  // Draw items if toggled
  if (pumpkinToggle.checked) {
    ctx.drawImage(images.pumpkin, 100, 400, 50, 50);
  }
  if (witchToggle.checked) {
    ctx.drawImage(images.witch, 300, 420, 50, 50);
  }
  if (treeToggle.checked) {
    ctx.drawImage(images.tree, 600, 280, 100, 150);
  }
}

// Event listeners
slider.addEventListener("input", () => {
  characterX = parseInt(slider.value);
  draw();
});

[...bgRadios].forEach(radio => radio.addEventListener("change", draw));
pumpkinToggle.addEventListener("change", draw);
witchToggle.addEventListener("change", draw);
treeToggle.addEventListener("change", draw);

sound1.addEventListener("click", () => sounds.owlhoot.play());
sound2.addEventListener("click", () => sounds.witchlaugh.play());
sound3.addEventListener("click", () => sounds.thunder.play());

// Initial draw once images load
let imagesLoaded = 0;
const totalImages = Object.values(images.backgrounds).length + 4;

Object.values(images.backgrounds).forEach(img => img.onload = checkAllLoaded);
[images.character, images.pumpkin, images.witch, images.tree].forEach(img => img.onload = checkAllLoaded);

function checkAllLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    draw();
  }
}