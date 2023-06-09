import dynamic from "next/dynamic";
import Chart from "../components/chart";

// const CoinPriceChart = dynamic(() => import("../components/chart"), {
//   ssr: false,
// });
async function getData() {
  const res = await fetch(
    `https:api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1m&limit=100`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  let klinedata = {};
  if (data.length > 0) {
    klinedata = data.map((data) => ({
      time: data[0] / 1000,
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

// async function getData() {
//   const res = await fetch(
//     `https:api.binance.com/api/v3/klines?symbol=ETHBTC&interval=1m&limit=10`
//   );

//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error("Failed to fetch data");
//   }

//   return res.json();
// }

// const chart = dynamic(() => import("../components/chart"), {
//   ssr: false,
// });

// export default async function Home() {
//   // const [data, setData] = useState({});
//   const data = await getData();
//   if (data.length > 0) {
//     const klinedata = data.map((data) => ({
//       time: data[0] / 1000,
//       open: data[1] * 1,
//       high: data[2] * 1,
//       low: data[3] * 1,
//       close: data[4] * 1,
//     }));
//     console.log(klinedata);
//   }
