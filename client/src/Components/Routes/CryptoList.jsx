import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Search/SearchPage.css";
import MobileDashBoardNav from "../mobileDashBoardNav";
function CryptoList(props) {
  const [cryptos, setCryptos] = useState([]);
  const setSearch = props.setSearch;
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    )
      .then((response) => response.json())
      .then((data) => setCryptos(data))
      .catch((error) => console.error(error));
  }, []);

  function ViewCryptoDetailsHandler(crypto) {
    navigate("/search");
    setSearch(crypto.name);
  }
  return (
    <>
      <div className="mobile-dash-board">
        <MobileDashBoardNav />
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Cap</th>
              <th>24hr high</th>
            </tr>
          </thead>
          <tbody>
            {cryptos.map((crypto, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={crypto.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{crypto.id}</div>
                        <div className="text-sm opacity-50">
                          {crypto.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {crypto.current_price
                      ? crypto.current_price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "undefined"}
                    <br />
                  </td>
                  <td>
                    {crypto.market_cap
                      ? crypto.market_cap
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "undefined"}
                    <br />
                  </td>
                  <td>${crypto.high_24h}</td>
                  <th className="CryptoList-details">
                    <button
                      className="btn btn-ghost btn-xs"
                      style={{ right: -10 }}
                      onClick={() => ViewCryptoDetailsHandler(crypto)}
                    >
                      details
                    </button>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CryptoList;
