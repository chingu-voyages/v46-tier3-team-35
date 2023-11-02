import { useState, useEffect } from "react";
import axios from "axios";

function Favorite({ email }) {
  const [likedCoins, setLikedCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLikedCoins() {
      try {
        const response = await axios.get(
          `http://localhost:8000/favorite/list/${email}`
        );
        setLikedCoins(response.data);
      } catch (err) {
        console.error("Error fetching liked coins:", err);
        setError("Failed to fetch liked coins");
      } finally {
        setIsLoading(false);
      }
    }

    fetchLikedCoins();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (likedCoins.length === 0) {
    return <div>You have not liked any coins yet</div>;
  }

  return (
    <div>
      <h1>Favorite Coins</h1>
      <ul>
        {likedCoins.map((coin) => (
          <li key={coin.name}>
            <strong>{coin.name}</strong> -{" "}
            <img src={coin.image} alt={coin.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Favorite;
