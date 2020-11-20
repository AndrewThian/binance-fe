function background(ctx) {
  ctx.fillStyle = CANVAS_BG_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function fonts(ctx) {
  ctx.font = "10pt Verdana, sans-serif";
  ctx.fillStyle = CANVAS_ALT_COLOR;
}

function yAxis(ctx) {
  ctx.beginPath();
  ctx.moveTo(canvasWidth - CANVAS_RIGHT_OFFSET, 0);
  ctx.lineTo(canvasWidth - CANVAS_RIGHT_OFFSET, canvasHeight);
  ctx.strokeStyle = CANVAS_ALT_COLOR;
  ctx.stroke();
}

export { background, fonts, yAxis };
