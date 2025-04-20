const canvas = document.getElementById("sceneCanvas");
const ctx = canvas.getContext("2d");

const bg = new Image();
bg.src = "images/background.jpeg";

const hunter = new Image();
hunter.src = "images/hunter.png";

const crow = new Image();
crow.src = "images/crow.png";

bg.onload = () => {
    ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  
    character.onload = () => {
      ctx.drawImage(hunter, 220, 480, 150, 330); // adjust size/position
  
      crow.onload = () => {
        ctx.drawImage(crow, 780, 140, 180, 180); // adjust size/position
  
        // Add text last
        ctx.shadowColor = "black";
        ctx.shadowBlur = 6;
        ctx.fillStyle = "white";
        ctx.font = "32px Georgia";
        ctx.fillText("Joe Shyti - Cainhurst Castle", 40, 60);
        ctx.shadowBlur = 0;
      };
    };
  };