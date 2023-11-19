import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = (props) => {
  const [cryptoHistory, setCryptoHistory] = useState([]);
  const id = props.id;
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}/market_chart?vs_currency=usd&days=14`
    )
      .then((response) => response.json())
      .then((data) => setCryptoHistory(data.prices))
      .catch((error) => console.error(error));
  }, [id]);

  const coinChartData = cryptoHistory
    ? cryptoHistory.map((value) => ({ x: value[0], y: value[1].toFixed(2) }))
    : [];

  const options = {
    responsive: true,
  };
  const data = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: `${id.toLowerCase()}`,
        data: coinChartData.map((val) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="history-chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default HistoryChart;
