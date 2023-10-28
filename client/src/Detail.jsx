import { useParams } from "react-router-dom";
import HistoryChart from "./components/HistoryChart";

function Detail() {
  const { id } = useParams();

  // You can now use coinId to fetch and display data about the coin
  return (
    <div>
      <h1>Coin Detail Page</h1>
      <p>Coin ID: {id}</p>
      <HistoryChart id={id} />
    </div>
  );
}

export default Detail;
