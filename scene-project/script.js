const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const bgImg = new Image();
bgImg.src = "images/background.jpeg";
bgImg.onload = function () {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
};

const charImg = new Image();
charImg.src = "images/character.png"; 
charImg.onload = function () {
  ctx.drawImage(charImg, 100, 300, 150, 300);
};

const creatureImg = new Image();
creatureImg.src = "images/creature.png";
creatureImg.onload = function () {
  ctx.drawImage(creatureImg, 500, 300, 200, 150);
};

const text = "Welcome to the Scene!";