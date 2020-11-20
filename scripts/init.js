import { background, fonts, yAxis, fillYAxis, addStocks } from "./ui.js";
import { fetchData, trimLast100, calcMinMax } from "./util.js";

function startUp() {
  const canvas = document.getElementById("canvas");

  canvasHeight = canvas.height;
  canvasWidth = canvas.width;

  const context = canvas.getContext("2d");

  background(context);
  fonts(context);
  yAxis(context);

  return context;
}

async function init() {
  const ctx = startUp();

  const [data, chartInfo] = await fetchData()
    .then(trimLast100)
    .then(calcMinMax)
    .then(({ chartInfo, data }) => {
      fillYAxis(ctx, chartInfo);
      addStocks(ctx, data, chartInfo);
      return [data, chartInfo];
    });
}

window.addEventListener("DOMContentLoaded", init);
