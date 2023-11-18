import "../src/App.css";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip as InfoTooltip } from "react-tooltip";
import { Link } from "react-router-dom";
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

const ranges = ["1d", "7d", "30d", "90d", "180d", "365d", "max"];

function Detail({ auth }) {
  const [profile, setProfile] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);
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
    setProfileEmail(profile.profile ? profile.profile.email : "");
  }, [profile]);

  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [coinInfo, setCoinInfo] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("1d");
  const [liked, setLiked] = useState(false);
  //coin converter
  const [usdAmount, setUsdAmount] = useState("");
  const [coinAmount, setCoinAmount] = useState("");

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
          `http://localhost:8000/favorite/check?name=${id}&userEmail=${profileEmail}`
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
  }, [profileEmail, id, timeRange]);

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
    labels: coinChartData.map((value) => moment(value.x).format("DD MMM YYYY")),
    datasets: [
      {
        fill: true,
        label: id + " (usd)",
        data: coinChartData.map((val) => val.y),
        borderColor: "rgb(17,185,129)",
        backgroundColor: "rgb(219,237,209)",
      },
    ],
  };

  const handleLike = async () => {
    try {
      await axios.post("http://localhost:8000/favorite/like", {
        name: id,
        image: coinInfo.image.large,
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
          name: id,
          userEmail: profileEmail,
        },
      });
      setLiked(false);
    } catch (error) {
      console.error("Error disliking the coin:", error);
    }
  };

  function formatToUSD(val) {
    if (val == null) {
      return "$0";
    }
    //Format the parameter to currency and add it to a new variable
    const formattedValue = val.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    //Trim the ending zeros from the currency
    const trimmedValue = formattedValue.replace(".00", "");
    //Return the final formatted value return trimmedValue
    return trimmedValue;
  }

  // Function to convert USD to the selected coin
  const convertUsdToCoin = (usd) => {
    if (!coinInfo) return 0;
    const conversionRate = coinInfo.market_data.current_price.usd;
    return (usd / conversionRate).toFixed(6); // Adjust decimal places as needed
  };

  // Function to convert the selected coin to USD
  const convertCoinToUsd = (coin) => {
    if (!coinInfo) return 0;
    const conversionRate = coinInfo.market_data.current_price.usd;
    return (coin * conversionRate).toFixed(2); // Adjust decimal places as needed
  };

  // Event handler for USD input changes
  const handleUsdAmountChange = (event) => {
    const usdValue = event.target.value;
    setUsdAmount(usdValue);
    setCoinAmount(convertUsdToCoin(usdValue));
  };

  // Event handler for coin input changes
  const handleCoinAmountChange = (event) => {
    const coinValue = event.target.value;
    setCoinAmount(coinValue);
    setUsdAmount(convertCoinToUsd(coinValue));
  };

  return (
    <div className="bg-gray-50" data-theme="light">
      <main>
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 pb-24 pt-6 sm:px-6 sm:pb-32 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            {/* coin data */}
            <div className="lg:max-w-lg lg:self-end">
              <Link to="/dashboard">
                <a className="previous round">&#8249;</a>
              </Link>
              <span className="mb-5 inline-flex items-center rounded-md bg-[#1E293B] px-2 py-1 text-xs font-semibold text-[#F1F5F9]">
                Rank # {coinInfo.coingecko_rank}
              </span>
              <div className="flex items-center">
                <img
                  className="h-10 mr-4"
                  src={coinInfo.image.large}
                  alt="coin logo"
                />
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 ">
                  {coinInfo.name}{" "}
                  <span className="ml-2 text-[#64748B] font-light text-xl">
                    {coinInfo.symbol.toUpperCase()}
                  </span>
                </h1>
              </div>

              <section aria-labelledby="information-heading" className="mt-4">
                <div className="flex items-center">
                  <span className="text-4xl text-gray-900 font-bold">
                    {formatToUSD(coinInfo.market_data.current_price.usd)}
                  </span>

                  <div className="ml-4 pl-4">
                    <Percentage
                      num={
                        coinInfo.market_data
                          .price_change_percentage_24h_in_currency.usd
                      }
                    />
                  </div>

                  <div className="flex items-center ml-20">
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

                <div className="mt-2">
                  <dl className="grid grid-cols-1">
                    <div className="px-4 sm:col-span-1 sm:px-0">
                      <dt className="flex items-center text-sm font-medium leading-6 text-[#64748B]">
                        <TooltipTrigger
                          id="Market Cap"
                          content={`Market Cap = Current Price x Circulating Supply\n\nRefers to the total market value of a cryptocurrency’s\n circulating supply. It is similar to the stock market’s\n measurement of multiplying price per share by shares\n readily available in the market (not held & locked by\n insiders, governments)`}
                        />
                        <span className="text-[#10172A]">
                          {formatToUSD(coinInfo.market_data.market_cap.usd)}
                        </span>
                      </dt>
                    </div>
                    <div className="px-4 sm:col-span-1 sm:px-0">
                      <dt className="flex items-center text-sm font-medium leading-6 text-[#64748B]">
                        <TooltipTrigger
                          id="Circulating Supply"
                          content={`The amount of coins that are circulating in the market and\n are tradeable by the public. It is comparable to looking at\n shares readily available in the market (not held & locked\n by insiders, governments).`}
                        />
                        <span className="text-[#10172A]">
                          {Math.floor(
                            coinInfo.market_data.circulating_supply
                          ).toLocaleString()}
                        </span>
                      </dt>
                    </div>
                    <div className="px-4 sm:col-span-1 sm:px-0">
                      <dt className="flex items-center text-sm font-medium leading-6 text-[#64748B]">
                        <TooltipTrigger
                          id="24h Trading Vol"
                          content={`A measure of a cryptocurrency trading volume across all\n tracked platforms in the last 24 hours. This is tracked on\n a rolling 24-hour basis with no open/closing times.`}
                        />
                        <span className="text-[#10172A]">
                          {formatToUSD(coinInfo.market_data.total_volume.usd)}
                        </span>
                      </dt>
                    </div>
                    <div className="px-4 sm:col-span-1 sm:px-0">
                      <dt className="flex items-center text-sm font-medium leading-6 text-[#64748B]">
                        <TooltipTrigger
                          id="Total Supply"
                          content={`The amount of coins that have already been created,\n minus any coins that have been burned (removed from\n circulation). It is comparable to outstanding shares in the\n stock market.\n\nTotal Supply = Onchain supply - burned tokens`}
                        />
                        <span className="text-[#10172A]">
                          {Math.floor(
                            coinInfo.market_data.total_supply
                          ).toLocaleString()}
                        </span>
                      </dt>
                    </div>
                    <div className="px-4 sm:col-span-1 sm:px-0">
                      <dt className="flex items-center text-sm font-medium leading-6 text-[#64748B]">
                        <TooltipTrigger
                          id="FDV"
                          content={`Fully Diluted Valuation (FDV) = Current Price x Total\nSupply\n\nFully Diluted Valuation (FDV) is the theoretical market\n capitalization of a coin if the entirety of its supply is in\n circulation, based on its current market price. The FDV\n value is theoretical as increasing the circulating supply of\n a coin may impact its market price. Also depending on the\n tokenomics, emission schedule or lock-up period of a\n coin's supply, it may take a significant time before its\n entire supply is released into circulation.`}
                        />
                        <span className="text-[#10172A]">
                          {formatToUSD(
                            coinInfo.market_data.fully_diluted_valuation.usd
                          )}
                        </span>
                      </dt>
                    </div>
                    <div className="px-4 sm:col-span-1 sm:px-0">
                      <dt className="flex items-center text-sm font-medium leading-6 text-[#64748B]">
                        <TooltipTrigger
                          id="Max Supply"
                          content={`The maximum number of coins coded to exist in the\n lifetime of the cryptocurrency. It is comparable to the\n maximum number of issuable shares in the stock market.\n\nMax Supply = Theoretical maximum as coded`}
                        />
                        <span className="text-[#10172A]">
                          {coinInfo.market_data.max_supply
                            ? Math.floor(
                                coinInfo.market_data.max_supply
                              ).toLocaleString()
                            : "∞"}
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
                {/* coin converter */}
                <div className="card bg-[#F1F5F9] shadow-xl mx-auto">
                  <div className="card-body">
                    <h2 className="card-title text-[#10172A]">
                      {coinInfo.name} Converter
                    </h2>
                    <div className="form-control">
                      <label className="input-group">
                        <span>{coinInfo.symbol.toUpperCase()}</span>
                        <input
                          type="number"
                          className="input input-bordered"
                          value={coinAmount}
                          onChange={handleCoinAmountChange}
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="input-group">
                        <span>USD</span>
                        <input
                          type="number"
                          className="input input-bordered"
                          value={usdAmount}
                          onChange={handleUsdAmountChange}
                        />
                      </label>
                    </div>
                    <div className="text-[#334154] font-semibold">
                      1 {coinInfo.symbol.toUpperCase()} = $
                      {coinInfo.market_data.current_price.usd.toLocaleString()}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* history chart */}
            <div className="lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                <div>
                  <label className="text-xl font-semibold">
                    {coinInfo.name} Price Chart ({coinInfo.symbol.toUpperCase()}
                    ){" "}
                  </label>
                  <div className="p-4">
                    <div className="join">
                      {ranges.map((range) => (
                        <label
                          key={range}
                          className={`btn join-item ${
                            timeRange === range ? "active" : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="timeRangeOptions"
                            checked={timeRange === range}
                            onChange={() => setTimeRange(range)}
                          />
                          {range}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <Line options={options} data={data} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Detail;

function Percentage({ num }) {
  // Check if num is a number and is not null or undefined
  if (typeof num === "number" && num !== null) {
    if (num <= 0) {
      return (
        <div className="flex items-center text-lg text-[#ff3131]">
          <ArrowTrendingDownIcon className="h-5 w-5 mr-1" />
          {num.toFixed(1)}%
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-lg text-[#04A73E]">
          <ArrowTrendingUpIcon className="h-5 w-5 mr-1" />
          {num.toFixed(1)}%
        </div>
      );
    }
  } else {
    // Return a placeholder or a default value when num is not a valid number
    return (
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">N/A</td>
    );
  }
}

function TooltipTrigger({ id, content }) {
  return (
    <>
      {id}
      <div
        style={{ cursor: "pointer" }}
        data-tooltip-id={id}
        data-tooltip-content={content}
        data-tooltip-place="top"
      >
        <QuestionMarkCircleIcon className="w-4 h-4 text-gray-500 mr-4" />
      </div>
      <InfoTooltip
        id={id}
        style={{
          backgroundColor: "white",
          color: "black",
          whiteSpace: "pre-line",
        }}
      />
    </>
  );
}