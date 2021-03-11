const canvas = document.getElementById('canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  // fillText(ctx);
  // strokeText(ctx);
  textBaselineDemo(ctx);
}

function fillText(ctx) {
  ctx.font = '48px serif';
  ctx.fillText('Hello world', 10, 50);
}

function strokeText(ctx) {
  ctx.font = '48px serif';
  ctx.strokeText('Hello world', 10, 50);
}

function textBaselineDemo(ctx) {
  ctx.font = '24px serif';
  ctx.textBaseline = 'bottom';
  ctx.strokeText('Hello world', 0, 100);
}
