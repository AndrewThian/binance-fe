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

// creates the y axis markers
function fillYAxis(ctx, chartInfo) {
  const startY = CHART_PADDING;
  const endY = canvasHeight - CHART_PADDING;
  const lineHeight = endY - startY;

  const yData = chartInfo.y;
  const rangeLength = yData.max - yData.min;
  const stepSize = rangeLength / Y_AXIS_STEPS;

  // calc each difference between steps
  const lineCoordinate = canvasWidth - CANVAS_RIGHT_OFFSET;
  for (let i = 0; i <= Y_AXIS_STEPS; i++) {
    const currentY = startY + (i / Y_AXIS_STEPS) * lineHeight;

    ctx.moveTo(lineCoordinate, currentY);
    ctx.lineTo(lineCoordinate + 10, currentY);

    ctx.fillText(
      yData.min + stepSize * (Y_AXIS_STEPS - i),
      lineCoordinate + 10,
      currentY + 4
    );
  }

  ctx.stroke();
}

export { background, fonts, yAxis, fillYAxis };
