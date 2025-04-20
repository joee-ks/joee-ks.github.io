const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "images/background.jpeg";

const character = new Image();
character.src = "images/character.png";

const torrent = new Image();
torrent.src = "images/torrent.png";

bg.onload = function () {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  character.onload = function () {
    ctx.drawImage(character, 100, 300, 150, 300); // adjust position/size

    torrent.onload = function () {
      ctx.drawImage(torrent, 550, 350, 200, 200); // adjust position/size

      // text
      ctx.fillStyle = "white";
      ctx.font = "30px serif";
      ctx.fillText("Joe Shyti - Lands Between", 20, 50);
    };
  };
};