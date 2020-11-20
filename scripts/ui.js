let canvasWidth;
let canvasHeight;

const CHART_PADDING = 20;
const CANVAS_BG_COLOR = "#14151a";
const CANVAS_ALT_COLOR = "#4e5561";
const CANVAS_RIGHT_OFFSET = 80;
const Y_AXIS_STEPS = 10;
const LINE_OFFSET = 0.7;
const GREEN_COLOR = "#2dbd84";
const RED_COLOR = "#e02a4a";
const BAR_GAP = 3;

function background(ctx) {
  ctx.fillStyle = CANVAS_BG_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

function reset(ctx) {
  ctx.clearRect(0, 0, canvasWidth - CANVAS_RIGHT_OFFSET, canvasHeight);
  ctx.fillStyle = CANVAS_BG_COLOR;
  ctx.fillRect(0, 0, canvasWidth - CANVAS_RIGHT_OFFSET, canvasHeight);
}

function addStocks(ctx, datas, chartInfo) {
  const elementWidth =
    (canvasWidth - (CHART_PADDING + BAR_GAP + CANVAS_RIGHT_OFFSET)) /
    datas.length;

  const startY = CHART_PADDING;
  const endY = canvasHeight - CHART_PADDING;
  const chartHeight = endY - startY;
  const stepSize = chartHeight / (chartInfo.y.max - chartInfo.y.min);

  // y coordinates for open
  let openY;
  // offset coordinates from open
  let closeYOffset;
  // y coordinates for high
  let highY;
  // y coordinates for low
  let lowY;
  // current x coordinates
  let currentX;

  // ctx.strokeStyle = "#000000";
  datas.forEach((data, i) => {
    openY = (data.open - chartInfo.y.min) * stepSize;
    closeYOffset = (data.open - data.close) * stepSize;
    highY = (data.high - chartInfo.y.min) * stepSize;
    lowY = (data.low - chartInfo.y.min) * stepSize;

    ctx.beginPath();
    currentX = CHART_PADDING + elementWidth * (i + LINE_OFFSET);
    // render high + low line
    ctx.moveTo(currentX, endY - highY);
    ctx.lineTo(currentX, endY - lowY);
    // render box
    ctx.rect(
      CHART_PADDING + elementWidth * i + BAR_GAP,
      endY - openY,
      elementWidth - BAR_GAP,
      closeYOffset
    );
    ctx.strokeStyle = closeYOffset < 0 ? GREEN_COLOR : RED_COLOR;
    ctx.stroke();
    // fill box
    ctx.fillStyle = closeYOffset < 0 ? GREEN_COLOR : RED_COLOR;
    ctx.fillRect(
      CHART_PADDING + elementWidth * i + BAR_GAP,
      endY - openY,
      elementWidth - BAR_GAP,
      closeYOffset
    );
  });
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

export { background, fonts, yAxis, fillYAxis, addStocks };
