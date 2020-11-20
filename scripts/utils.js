async function fetchData() {
  const seriesData = await fetchSeriesData();
  // console.log("seriesData: ", seriesData);

  // [time, open, high, low, close][]
  function fetchSeriesData() {
    return new Promise((resolve, reject) => {
      fetch("https://www.binance.com/api/v1/klines?symbol=BTCUSDT&interval=1m")
        .then(async (res) => {
          const data = await res.json();
          const result = data.map(([time, open, high, low, close]) => ({
            time,
            open,
            high,
            low,
            close,
          }));
          resolve(result);
        })
        .catch((e) => reject(e));
    });
  }

  return seriesData;
}

function trimLast100(data) {
  return data.filter((_, idx) => idx < 500 && idx > 399);
}

function roundUp(val) {
  return Math.ceil(val / 100) * 100;
}

function roundDown(val) {
  return Math.floor(val / 100) * 100;
}

function calcMinMax(data) {
  let min = 0;
  let max = 0;

  const newData = data.map((d) => {
    const result = format(d);

    if (result.high > max) max = result.high;
    if (min === 0) min = result.low;
    if (min !== 0 && result.low < min) min = result.low;

    return result;
  });

  min = roundDown(min);
  max = roundUp(max);

  return { data: newData, chartInfo: { y: { min, max } } };
}

function format({ time, open, high, low, close }) {
  return {
    time,
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
  };
}

export { fetchData, trimLast100, calcMinMax };
