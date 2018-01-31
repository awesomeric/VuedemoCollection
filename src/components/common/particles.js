function LogBackground(opt) {
  this.init(opt);
}
LogBackground.prototype.init = function (opt) {
  const self = this;
  self._initDom(opt);
  self.canvas.width = this.options.canvasWidth;
  self.canvas.height = this.options.canvasHeight;
  self._initCir(self.context);
  self.render();
};
LogBackground.prototype._initDom = function (opt) {
  this.options = {
    canvasContainerID: 'canvas-container',
    canvasOpacity: 0.8,
    circleNum: 40,
    circleColor: 'rgba(180,180,180,1)',
    lineColor: 'rgba(180,180,180,1)',
    circleMovemaxX: 2,
    circleMoveminX: -2,
    circleMovemaxY: 2,
    circleMoveminY: -2,
    canvasWidth: document.documentElement.clientWidth || document.body.Width,
    canvasHeight: document.documentElement.clientHeight || document.body.client,
  };
  if (opt) {
    for (const key in opt) {
      this.options[key] = opt[key];
    }
  }
  const canvasEle = document.createElement('canvas');
  const canvasContainer = document.getElementById(this.options.canvasContainerID);
  canvasContainer.appendChild(canvasEle);
  canvasContainer.style.position = 'relative';
  canvasEle.style.cssText = 'z-index:-20;position:absolute;left:0;top:0';
  canvasEle.style.opacity = this.options.canvasOpacity;
  this.canvas = canvasEle;
  this.drawMaxWidth = this.options.canvasWidth + 30;
  this.drawMinWidth = -30;
  this.drawMaxHeight = this.options.canvasHeight + 30;
  this.drawMinHeight = -30;
  this.context = this.canvas.getContext('2d');
  this.circleArr = [];
  this.moveArr = [];
};
LogBackground.prototype.random = function (max, _min) {
  const minNum = arguments[1] || 0;
  return Math.floor(Math.random() * (max - minNum + 1) + minNum);
};
LogBackground.prototype._initCir = function (context) {
  const self = this;
  for (let i = 0; i < self.options.circleNum; i++) {
    x = self.random(self.drawMaxWidth, self.drawMinWidth);
    y = self.random(self.drawMaxHeight, self.drawMinHeight);
    r = self.random(10);
    const newCircle = self.drawCircle(context, x, y, r);
    self.circleArr.push(newCircle);
    const move = {
      x: Math.random() * (self.options.circleMovemaxX - self.options.circleMoveminX) + self.options.circleMoveminX,
      y: Math.random() * (self.options.circleMovemaxY - self.options.circleMoveminY) + self.options.circleMoveminY,
    };
    self.moveArr.push(move);
  }
};
LogBackground.prototype._initLine = function (ctx, bx, by, cx, cy, opacity) {
  const self = this;
  function Line(bx, by, cx, cy) {
    this.beginX = bx;
    this.beginY = by;
    this.closeX = cx;
    this.closeY = cy;
  }
  const line = new Line(bx, by, cx, cy);
  ctx.beginPath();
  ctx.moveTo(line.beginX, line.beginY);
  ctx.lineTo(line.closeX, line.closeY);
  ctx.stroke();
  const colorArr = self.options.lineColor.split(',');
  ctx.strokeStyle = `${colorArr[0]},${colorArr[1]},${colorArr[2]},${opacity})`;
  ctx.closePath();
};
LogBackground.prototype.render = function () {
  const self = this;
  self.context.clearRect(0, 0, self.options.canvasWidth, self.options.canvasHeight);
  for (let i = 0; i < 40; i++) {
    const changeCircle = self.circleArr[i];
    changeCircle.centerX += self.moveArr[i].x;
    changeCircle.centerY += self.moveArr[i].y;
    self.drawCircle(self.context, changeCircle.centerX, changeCircle.centerY, changeCircle.radius);
    if (changeCircle.centerX < self.drawMinWidth) {
      changeCircle.centerX = self.drawMaxWidth;
      changeCircle.centerY = self.random(self.drawMaxHeight, self.drawMinHeight);
    } else if (changeCircle.centerX > self.drawMaxWidth) {
      changeCircle.centerX = self.drawMinWidth;
      changeCircle.centerY = self.random(self.drawMaxHeight, self.drawMinHeight);
    } else if (changeCircle.centerY < self.drawMinHeight) {
      changeCircle.centerY = self.random(self.drawMaxWidth, self.drawMinWidth);
      changeCircle.centerY = self.drawMaxHeight;
    } else if (changeCircle.centerY > self.drawMaxHeight) {
      changeCircle.centerY = self.random(self.drawMaxWidth, self.drawMinWidth);
      changeCircle.centerY = self.drawMinWidth;
    }
  }
  for (let j = 0; j < 40; j++) {
    for (let k = 0; k < 40; k++) {
      const bx = self.circleArr[j].centerX;
      const by = self.circleArr[j].centerY;
      const cx = self.circleArr[k].centerX;
      const cy = self.circleArr[k].centerY;
      const dis = Math.sqrt(Math.abs(cx - bx) * Math.abs(cx - bx) + Math.abs(by - cy) * Math.abs(by - cy));
      if (dis < 0.15 * this.options.canvasWidth || dis > this.options.canvasWidth * 1.2) {
        let lineOpacity = 1;
        lineOpacity = lineOpacity > 0.3 ? 0.3 : lineOpacity;
        self._initLine(self.context, bx, by, cx, cy, lineOpacity);
      }
    }
  }
  const timer = setTimeout(() => {
    self.render();
  }, 30);
};
LogBackground.prototype.drawCircle = function (ctx, x, y, r) {
  const self = this;
  function Circle(x, y, r) {
    this.centerX = x;
    this.centerY = y;
    this.radius = r;
  }
  const circle = new Circle(x, y, r);
  ctx.beginPath();
  ctx.arc(circle.centerX, circle.centerY, circle.radius, 0, Math.PI * 2, true);
  ctx.fillStyle = self.options.circleColor;
  ctx.fill();
  ctx.closePath();
  return circle;
};

module.exports = LogBackground
