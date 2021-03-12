const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// adjustable variables
const LINE_WIDTH = 4;
const MAX_RADIUS = 150;

const mousePos = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

window.onmousemove = function (e) {
  mousePos.x = e.clientX;
  mousePos.y = e.clientY;
};

function getRandomColor() {
  const possibleChars = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += possibleChars[Math.ceil(Math.random() * 15)];
  }
  return color;
}

let a = [];
window.onload = function myfunction() {
  resize();
  animate();
};

window.onresize = function () {
  resize();
};
function resize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  for (let i = 0; i < 101; i++) {
    a[i] = new Dot(mousePos.x, mousePos.y, LINE_WIDTH, getRandomColor(), 0.02);
  }
}

class Dot {
  constructor(x, y, lineWidth, color, deltaTheta) {
    this.x = x;
    this.y = y;
    this.lineWidth = lineWidth;
    this.color = color;
    this.theta = Math.random() * Math.PI * 2;
    this.deltaTheta = deltaTheta;
    this.distFromCentre = Math.random() * MAX_RADIUS;

    this.draw = function () {
      const lastPos = {
        x: this.x,
        y: this.y,
      };
      this.theta += this.deltaTheta;
      this.x = mousePos.x + Math.cos(this.theta) * this.distFromCentre;
      this.y = mousePos.y + Math.sin(this.theta) * this.distFromCentre;
      ctx.beginPath();
      ctx.lineWidth = this.lineWidth;
      ctx.strokeStyle = this.color;
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(this.x, this.y);
      ctx.stroke();
      ctx.closePath();
    };
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(0,0,0,0.05)'; // translucent fill so it is slowly covered up to create effect of afterimage
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  a.forEach((element) => {
    element.draw();
  });
}
