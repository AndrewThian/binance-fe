function background(ctx) {
  ctx.fillStyle = CANVAS_BG_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function fonts(ctx) {
  ctx.font = "10pt Verdana, sans-serif";
  ctx.fillStyle = CANVAS_ALT_COLOR;
}

export { background, fonts };
