const canvas = document.getElementById('canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  // drawImage(ctx);
  // scalingImage(ctx);
  slicingImage(ctx);
}

function drawImage(ctx) {
  const img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  };
  img.src = 'https://mdn.mozillademos.org/files/5395/backdrop.png';
}

function scalingImage(ctx) {
  const img = new Image();
  img.onload = function () {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        // last 2 arguments are width and height
        ctx.drawImage(img, j * 50, i * 38, 50, 38);
      }
    }
  };
  img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
}

function slicingImage(ctx) {
  // Draw hippo
  const hippoImg = new Image();
  hippoImg.onload = function () {
    ctx.drawImage(hippoImg, 33, 71, 104, 124, 21, 20, 87, 104);
  };
  hippoImg.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';

  // Draw frame
  const frameImg = new Image();
  frameImg.onload = function () {
    ctx.drawImage(frameImg, 0, 0);
  };
  frameImg.src =
    'https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png';
}
