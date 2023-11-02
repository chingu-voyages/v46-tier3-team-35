import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
import moment from "moment";
import axios from "axios";

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

function Detail({ email }) {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [coinInfo, setCoinInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const endpoint = `https://api.coingecko.com/api/v3/coins/${id}/market_chart`;
        const params = { vs_currency: "usd", days: timeRange };
        const { data } = await axios.get(endpoint, { params });
        setCoin(data);
        // get coinInfo
        const info = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`
        );
        setCoinInfo(info.data);
        // Check if the coin is liked

        const response = await axios.get(
          `http://localhost:8000/favorite/check?name=${id}&userEmail=${email}`
        );
        if (response.data.liked) {
          setLiked(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [email, id, timeRange]);

  if (isLoading) return <div>Loading...</div>;

  if (!coin || !coin.prices) return <div>No data available</div>;

  const coinChartData = coin.prices.map((value) => ({
    x: value[0],
    y: parseFloat(value[1]).toFixed(2),
  }));

  const options = {
    responsive: true,
  };

  const data = {
    labels: coinChartData.map((value) => moment(value.x).format("MMM DD")),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((val) => val.y),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/favorite/like", {
        name: id,
        image: coinInfo.image.large,
        userEmail: email,
      });
      setLiked(true);
    } catch (error) {
      console.error("Error liking the coin:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await axios.delete("http://localhost:8000/favorite/dislike", {
        data: {
          name: id,
          userEmail: email,
        },
      });
      setLiked(false);
    } catch (error) {
      console.error("Error disliking the coin:", error);
    }
  };

  // You can now use coinId to fetch and display data about the coin
  return (
    <div>
      <h1>Coin Detail Page</h1>
      <p>Coin ID: {id}</p>
      <div>
        {liked ? (
          <button onClick={handleDislike}>Dislike</button>
        ) : (
          <button onClick={handleLike}>Like</button>
        )}
      </div>
      <div>
        <div>
          <label>Time Range: </label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1d">1 Day</option>
            <option value="7d">7 Days</option>
            <option value="30d">1 Month</option>
            <option value="365d">1 Year</option>
            <option value="max">All</option>
          </select>
        </div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Detail;
