import dynamic from "next/dynamic";
import Chart from "../components/chart";

// const CoinPriceChart = dynamic(() => import("../components/chart"), {
//   ssr: false,
// });
async function getData() {
  const res = await fetch(
    `https:api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=500`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  let klinedata = {};
  if (data.length > 0) {
    klinedata = data.map((data) => ({
      time: data[0] / 1000,
      // time: (data[0] - 60) * 1000,

      open: data[1] * 1,
      high: data[2] * 1,
      low: data[3] * 1,
      close: data[4] * 1,
    }));
    console.log(klinedata);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="tvchart">
        <h1>lightweight chart</h1>
        <Chart data={klinedata} />
      </div>
    </main>
  );
}
