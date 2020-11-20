import {
  background,
  fonts,
  yAxis,
  fillYAxis,
  addStocks,
  startUp,
} from "./ui.js";
import { fetchData, trimLast100, calcMinMax, subscribe } from "./utils.js";

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

  subscribe((incomingData) => {
    data.shift();
    data.push(incomingData);
    addStocks(ctx, data, chartInfo);
  });
}

window.addEventListener("DOMContentLoaded", init);
