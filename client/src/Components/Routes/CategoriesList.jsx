import { useState, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
import MobileDashBoardNav from "../mobileDashBoardNav";
import "../Search/SearchPage.css";
function CategoriesList() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error(error));
  }, []);
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
              <th>Market Cap</th>
              <th>Top Gainer</th>
              <th>Volume</th>
              <th>23hr volume</th>
              <th>Top 3</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((crypto, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{crypto.id}</div>
                        <div className="text-sm opacity-50">
                          {crypto.symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    $
                    {crypto.market_cap
                      ? crypto.market_cap
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : "undefined"}
                    <br />
                  </td>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={crypto.top_3_coins[0]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <br />
                  </td>
                  <td>
                    ${crypto.volume_24h ? crypto.volume_24h : "undefined"}
                    <br />
                  </td>
                  <td>
                    {" "}
                    {crypto.market_cap_change_24h ? (
                      +crypto.market_cap_change_24h < 0 ? (
                        <p style={{ display: "flex" }}>
                          <AiOutlineCaretDown style={{ color: "red" }} />$
                          {crypto.market_cap_change_24h}
                        </p>
                      ) : (
                        <p style={{ display: "flex" }}>
                          <AiOutlineCaretUp style={{ color: "green" }} /> $
                          {crypto.market_cap_change_24h}
                        </p>
                      )
                    ) : (
                      "undefined"
                    )}
                  </td>
                  <td>
                    <div className="avatar" style={{ paddingRight: 10 }}>
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={crypto.top_3_coins[0]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className="avatar" style={{ paddingRight: 10 }}>
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={crypto.top_3_coins[1]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={crypto.top_3_coins[2]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <br />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CategoriesList;
