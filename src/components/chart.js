// import { createChart } from "lightweight-charts";
"use client";
// const CoinPriceChart = () => {
//   const chart = createChart(document.body, { width: 400, height: 300 });
//   return chart;
// };

// export default CoinPriceChart;
// const chart = createChart(document.body, { width: 400, height: 300 });
// const lineSeries = chart.addLineSeries();
// lineSeries.setData([
//   { time: "2019-04-11", value: 80.01 },
//   { time: "2019-04-12", value: 96.63 },
//   { time: "2019-04-13", value: 76.64 },
//   { time: "2019-04-14", value: 81.89 },
//   { time: "2019-04-15", value: 74.43 },
//   { time: "2019-04-16", value: 80.01 },
//   { time: "2019-04-17", value: 96.63 },
//   { time: "2019-04-18", value: 76.64 },
//   { time: "2019-04-19", value: 81.89 },
//   { time: "2019-04-20", value: 74.43 },
// ]);

import { createChart, CrosshairMode } from "lightweight-charts";
import { useEffect, useRef } from "react";
async function getData() {
  const res = await fetch(
    `https:api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1m&limit=1000`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const CandleStickChart = ({ data }) => {
  // const data = await getData();
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 1400,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      layout: {
        background: {
          type: "solid",
          color: "#000000",
        },
        textColor: "rgba(255, 255, 255, 0.9)",
      },
      grid: {
        vertLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
        horzLines: {
          color: "rgba(197, 203, 206, 0.5)",
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      localization: {
        locale: "en-US",
        dateFormat: "yyyy-MM-dd",
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candleSeries.setData(data);
    // candleSeries.setData([
    //   {
    //     time: "2018-12-22",
    //     open: 75.16,
    //     high: 82.84,
    //     low: 36.16,
    //     close: 45.72,
    //   },
    //   { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
    //   {
    //     time: "2018-12-24",
    //     open: 60.71,
    //     high: 60.71,
    //     low: 53.39,
    //     close: 59.29,
    //   },
    //   { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
    //   {
    //     time: "2018-12-26",
    //     open: 67.71,
    //     high: 105.85,
    //     low: 66.67,
    //     close: 91.04,
    //   },
    //   { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
    //   {
    //     time: "2018-12-28",
    //     open: 111.51,
    //     high: 142.83,
    //     low: 103.34,
    //     close: 131.25,
    //   },
    //   {
    //     time: "2018-12-29",
    //     open: 131.33,
    //     high: 151.17,
    //     low: 77.68,
    //     close: 96.43,
    //   },
    //   {
    //     time: "2018-12-30",
    //     open: 106.33,
    //     high: 110.2,
    //     low: 90.39,
    //     close: 98.1,
    //   },
    //   {
    //     time: "2018-12-31",
    //     open: 109.87,
    //     high: 114.69,
    //     low: 85.66,
    //     close: 111.26,
    //   },
    // ]);
    chart.timeScale().fitContent();
    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default CandleStickChart;

// --------------------
