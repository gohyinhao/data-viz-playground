const canvas = document.getElementById('canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  clipDemo(ctx);
}

function clipDemo(ctx) {
  // create black bg
  ctx.fillRect(0, 0, 200, 200);
  ctx.translate(100, 100);

  // Create a circular clipping path
  ctx.beginPath();
  ctx.arc(0, 0, 80, 0, Math.PI * 2, true);
  ctx.clip();

  // draw blue background
  var lingrad = ctx.createLinearGradient(0, -75, 0, 75);
  lingrad.addColorStop(0, '#232256');
  lingrad.addColorStop(1, '#143778');
  ctx.fillStyle = lingrad;
  ctx.fillRect(-100, -100, 200, 200);

  // draw stars
  for (let j = 1; j < 50; j++) {
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.translate(
      100 - Math.floor(Math.random() * 200),
      100 - Math.floor(Math.random() * 200),
    );
    drawStar(ctx, Math.floor(Math.random() * 4) + 2);
    ctx.restore();
  }
}

function drawStar(ctx, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(radius, 0);
  for (let i = 0; i < 9; i++) {
    ctx.rotate(Math.PI / 5);
    if (i % 2 === 0) {
      ctx.lineTo((radius / 0.525731) * 0.200811, 0);
    } else {
      ctx.lineTo(radius, 0);
    }
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
