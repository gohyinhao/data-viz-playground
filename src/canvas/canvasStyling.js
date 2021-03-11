const canvas = document.getElementById('canvas');
if (canvas.getContext) {
  const ctx = canvas.getContext('2d');

  // fillStyleDemo(ctx);
  // strokeStyleDemo(ctx);
  // globalAlphaTransparencyDemo(ctx);
  // rgbaTransparencyDemo(ctx);
  // lineWidthDemo(ctx);
  // lineCapDemo(ctx);
  // lineJoinDemo(ctx);
  // miterLimitDemo(ctx);
  // lineDashDemo(ctx);
  // linearGradientDemo(ctx);
  // radialGradientDemo(ctx);
  // patternDemo(ctx);
  shadowDemo(ctx);
}

/**
 * fill style
 */
function fillStyleDemo(ctx) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.fillStyle =
        'rgb(' +
        Math.floor(255 - 42.5 * i) +
        ', ' +
        Math.floor(255 - 42.5 * j) +
        ', 0)';
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}

/**
 * stroke style
 */
function strokeStyleDemo(ctx) {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      ctx.strokeStyle =
        'rgb(0, ' +
        Math.floor(255 - 42.5 * i) +
        ', ' +
        Math.floor(255 - 42.5 * j) +
        ')';
      ctx.beginPath();
      ctx.arc(12.5 + j * 25, 12.5 + i * 25, 10, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
}

/**
 * transparency using globalAlpha
 */
function globalAlphaTransparencyDemo(ctx) {
  // draw background
  ctx.fillStyle = '#FD0';
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = '#6C0';
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = '#09F';
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = '#F30';
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = '#FFF';

  // // set transparency value
  ctx.globalAlpha = 0.2;

  // // Draw semi transparent circles
  for (let i = 0; i < 7; i++) {
    ctx.beginPath();
    ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
    ctx.fill();
  }
}

/**
 * transparency using rgba
 */
function rgbaTransparencyDemo(ctx) {
  // Draw background
  ctx.fillStyle = 'rgb(255, 221, 0)';
  ctx.fillRect(0, 0, 150, 37.5);
  ctx.fillStyle = 'rgb(102, 204, 0)';
  ctx.fillRect(0, 37.5, 150, 37.5);
  ctx.fillStyle = 'rgb(0, 153, 255)';
  ctx.fillRect(0, 75, 150, 37.5);
  ctx.fillStyle = 'rgb(255, 51, 0)';
  ctx.fillRect(0, 112.5, 150, 37.5);

  // // Draw semi transparent rectangles
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + (i + 1) / 10 + ')';
    for (let j = 0; j < 4; j++) {
      ctx.fillRect(5 + i * 14, 5 + j * 37.5, 14, 27.5);
    }
  }
}

/**
 * line width. crisp line issue see https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors
 */
function lineWidthDemo(ctx) {
  for (let i = 0; i < 10; i++) {
    ctx.lineWidth = 1 + i;
    ctx.beginPath();
    ctx.moveTo(5 + i * 14, 5);
    ctx.lineTo(5 + i * 14, 140);
    ctx.stroke();
  }
}

/**
 * line cap demo
 */
function lineCapDemo(ctx) {
  const lineCap = ['butt', 'round', 'square'];

  // Draw guides
  ctx.strokeStyle = '#09f';
  ctx.beginPath();
  ctx.moveTo(10, 10);
  ctx.lineTo(140, 10);
  ctx.moveTo(10, 140);
  ctx.lineTo(140, 140);
  ctx.stroke();

  // Draw lines
  ctx.strokeStyle = 'black';
  for (let i = 0; i < lineCap.length; i++) {
    ctx.lineWidth = 15;
    ctx.lineCap = lineCap[i];
    ctx.beginPath();
    ctx.moveTo(25 + i * 50, 10);
    ctx.lineTo(25 + i * 50, 140);
    ctx.stroke();
  }
}

function lineJoinDemo(ctx) {
  const lineJoin = ['round', 'bevel', 'miter'];
  ctx.lineWidth = 10;
  for (let i = 0; i < lineJoin.length; i++) {
    ctx.lineJoin = lineJoin[i];
    ctx.beginPath();
    ctx.moveTo(5, 15 + i * 40);
    ctx.lineTo(45, 55 + i * 40);
    ctx.lineTo(85, 15 + i * 40);
    ctx.lineTo(125, 55 + i * 40);
    ctx.lineTo(165, 15 + i * 40);
    ctx.stroke();
  }
}

/**
 * miterLimit property determines how far the outside connection point can be placed from the inside connection point.
 * If two lines exceed this value, a bevel join gets drawn instead
 */
function miterLimitDemo(ctx) {
  // Draw guides
  ctx.strokeStyle = '#09f';
  ctx.lineWidth = 2;
  ctx.strokeRect(-5, 50, 160, 50);

  // Set line styles
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 10;

  // set miterLimit
  ctx.miterLimit = 6;

  // Draw lines
  ctx.beginPath();
  ctx.moveTo(0, 100);
  for (let i = 0; i < 24; i++) {
    const dy = i % 2 == 0 ? 25 : -25;
    ctx.lineTo(Math.pow(i, 1.5) * 2, 75 + dy);
  }
  ctx.stroke();
}

/**
 * The setLineDash method accepts a list of numbers that specifies distances to alternately draw a line and a gap
 * the lineDashOffset property sets an offset where to start the pattern.
 */
function lineDashDemo(ctx) {
  let offset = 0;

  function draw() {
    ctx.setLineDash([4, 2]);
    ctx.lineDashOffset = -offset;
    ctx.strokeRect(10, 10, 100, 100);
  }

  function march() {
    offset++;
    if (offset > 16) {
      offset = 0;
    }
    draw();
    // setTimeout(march, 20);
  }

  march();
}

function linearGradientDemo(ctx) {
  // Create gradients
  const lingrad = ctx.createLinearGradient(0, 0, 0, 150);
  lingrad.addColorStop(0, '#00ABEB');
  lingrad.addColorStop(0.5, '#fff');
  lingrad.addColorStop(0.5, '#26C000');
  lingrad.addColorStop(1, '#fff');

  const lingrad2 = ctx.createLinearGradient(0, 50, 0, 95);
  lingrad2.addColorStop(0.5, '#000');
  lingrad2.addColorStop(1, 'rgba(0, 0, 0, 0)');

  // assign gradients to fill and stroke styles
  ctx.fillStyle = lingrad;
  ctx.strokeStyle = lingrad2;

  // draw shapes
  ctx.fillRect(10, 10, 130, 130);
  ctx.strokeRect(50, 50, 50, 50);
}

function radialGradientDemo(ctx) {
  // Create gradients
  const radgrad = ctx.createRadialGradient(45, 45, 10, 52, 50, 30);
  radgrad.addColorStop(0, '#A7D30C');
  radgrad.addColorStop(0.9, 'rgba(1,159,98,1)');
  radgrad.addColorStop(1, 'rgba(1, 159, 98, 0)');

  const radgrad2 = ctx.createRadialGradient(105, 105, 20, 112, 120, 50);
  radgrad2.addColorStop(0, '#FF5F98');
  radgrad2.addColorStop(0.75, '#FF0188');
  radgrad2.addColorStop(1, 'rgba(255, 1, 136, 0)');

  const radgrad3 = ctx.createRadialGradient(95, 15, 15, 102, 20, 40);
  radgrad3.addColorStop(0, '#00C9FF');
  radgrad3.addColorStop(0.8, '#00B5E2');
  radgrad3.addColorStop(1, 'rgba(0, 201, 255, 0)');

  const radgrad4 = ctx.createRadialGradient(0, 150, 50, 0, 140, 90);
  radgrad4.addColorStop(0, '#F4F201');
  radgrad4.addColorStop(0.8, '#E4C700');
  radgrad4.addColorStop(1, 'rgba(228, 199, 0, 0)');

  // draw shapes
  ctx.fillStyle = radgrad4;
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = radgrad3;
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = radgrad2;
  ctx.fillRect(0, 0, 200, 200);
  ctx.fillStyle = radgrad;
  ctx.fillRect(0, 0, 200, 200);
}

function patternDemo(ctx) {
  // create new image object to use as pattern
  const img = new Image();
  img.src = 'https://mdn.mozillademos.org/files/222/Canvas_createpattern.png';
  img.onload = function () {
    // create pattern
    const ptrn = ctx.createPattern(img, 'repeat');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);
  };
}

function shadowDemo(ctx) {
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';

  ctx.font = '20px Times New Roman';
  ctx.fillStyle = 'Black';
  ctx.fillText('Sample String', 5, 30);
}
