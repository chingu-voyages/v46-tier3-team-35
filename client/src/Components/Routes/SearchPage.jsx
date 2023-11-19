import { useState, useEffect } from "react";
import "../Search/SearchPage.css";
import HistoryChart from "../HistoryChart";
import SearchPageStats from "../Search/SearchPageStats";
import RecentTransactions from "../Search/SearchPageRecentTransactions";
import SearchPageNews from "../Search/SearchPageNews";
import Description from "../Search/SearchPageDescription";
import Trade from "../Search/SearchPageTrade";
import { HeartIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import MobileDashBoardNav from "../mobileDashBoardNav";
import MobileSearchPageStats from "../Search/MobileSearchPageStats";
function SearchPage(props) {
  const search = props.search;
  const [cryptoId, setCryptoId] = useState([]);
  const [cryptoInfo, setCryptoInfo] = useState([]);
  const [name, setName] = useState("");
  const [liked, setLiked] = useState(false);
  const [profile, setProfile] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const auth = props.auth;
  useEffect(() => {
    setName(search);
  }, [search]);
  useEffect(() => {
    setUserLoggedIn(auth.isAuthenticated());
  }, [auth]);
  useEffect(() => {
    loadUserProfile();
  }, [userLoggedIn]);
  const loadUserProfile = () => {
    userLoggedIn
      ? auth.getProfile((profile, error) => setProfile({ profile, error }))
      : "";
  };

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/search?query=${name}`)
      .then((response) => response.json())
      .then((data) => setCryptoId(data.coins[0].id))
      .catch((error) => console.error(error));
  }, [name, search]);
  useEffect(() => {
    setProfileEmail(profile.profile ? profile.profile.email : "");
  }, [profile]);
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}`)
      .then((response) => response.json())
      .then((data) => setCryptoInfo(data))
      .catch((error) => console.error(error));
  }, [cryptoId]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:8000/favorite/check?name=${cryptoInfo.name.toLowerCase()}&userEmail=${profileEmail}`
        );
        if (response.data.liked) {
          setLiked(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [profileEmail, cryptoInfo.name]);
  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/favorite/like", {
        name: cryptoInfo.name.toLowerCase(),
        image: cryptoInfo.image.thumb,
        userEmail: profileEmail,
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
          name: cryptoInfo.name.toLowerCase(),
          userEmail: profileEmail,
        },
      });
      setLiked(false);
    } catch (error) {
      console.error("Error disliking the coin:", error);
    }
  };
  return (
    <div className="searchPage">
      <div className="mobile-search-dash-board">
        <MobileDashBoardNav />
      </div>
      <div className="crypto-header">
      <div
        className="avatar"
        style={{ width: 170, height: "auto", marginLeft: 50, marginTop: 20 }}
      >
        <img
          src={cryptoInfo.length === undefined ? cryptoInfo.image.thumb : ""}
          alt="Avatar Tailwind CSS Component"
          className="crypto-picture"
        />

        <h2 className="crypto-name">
          {cryptoInfo.length === undefined ? cryptoInfo.name : ""}
        </h2>
        <h2 className="crypto-symbol">
          {cryptoInfo.length === undefined
            ? cryptoInfo.symbol.toUpperCase()
            : ""}
        </h2>
        {liked ? (
          <button
            type="button"
            className="relative inline-flex items-center gap-x-1.5 rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={handleDislike}
          >
            <HeartIcon className="h-6 w-6 shrink-0 cursor-pointer text-red-500" />
            unlike
          </button>
        ) : (
          <button
            type="button"
            className="relative inline-flex items-center gap-x-1.5 rounded bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            onClick={handleLike}
          >
            <HeartIcon className="h-6 w-6 shrink-0 cursor-pointer text-gray-400" />
            like
          </button>
        )}
      </div>
      </div>
      <div className="search-chart">
        <div className="Search-page-chart">
          <h2 className="Crypto-price">
            $
            {cryptoInfo.length === undefined
              ? cryptoInfo.market_data.current_price.usd
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : ""}{" "}
            USD{" "}
            <span className="hr-change-percent">
              {cryptoInfo.length === undefined ? (
                <span
                  style={{
                    color:
                      +cryptoInfo.market_data.market_cap_change_percentage_24h <
                      0
                        ? "red"
                        : "green",
                  }}
                >
                  %
                  {cryptoInfo.length === undefined
                    ? cryptoInfo.market_data.market_cap_change_percentage_24h
                    : ""}
                </span>
              ) : (
                ""
              )}
            </span>
          </h2>
          <HistoryChart id={search} />
        </div>
      </div>
      <SearchPageStats cryptoInfo={cryptoInfo} />
      <div className="mobile-stats">
        <MobileSearchPageStats cryptoInfo={cryptoInfo} />
      </div>
      <Trade cryptoInfo={cryptoInfo} />

      <div className="search-page-news">
        <RecentTransactions cryptoInfo={cryptoInfo} />
        <SearchPageNews cryptoInfoName={name} />
        <Description cryptoInfo={cryptoInfo} />
      </div>
    </div>
  );
}

export default SearchPage;
