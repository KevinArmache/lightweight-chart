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

const CandleStickChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: 1400,
      height: 500,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        fixLeftEdge: true,
        fixRightEdge: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      localization: {
        locale: "en-US",
        dateFormat: "yyyy-MM-dd",
      },
    });
    const areaSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });
    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candleSeries.setData(data);

    return () => {
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} />;
};

export default CandleStickChart;
