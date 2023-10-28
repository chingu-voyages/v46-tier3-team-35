import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Percentage from "./components/Percentage";
import MiniChart from "./components/MiniChart";

function Prices() {
  const [currencies, setCurrencies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pageInput, setPageInput] = useState(currentPage);
  const [order, setOrder] = useState("market_cap_desc");

  const coinsPerPage = 10;
  const totalPages = 1000;

  const sortOptions = [
    { value: "market_cap_desc", label: "Market Cap (High to Low)" },
    { value: "market_cap_asc", label: "Market Cap (Low to High)" },
    { value: "volume_desc", label: "Volume (High to Low)" },
    { value: "volume_asc", label: "Volume (Low to High)" },
  ];

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const endpoint = "https://api.coingecko.com/api/v3/coins/markets";
        const params = {
          vs_currency: "usd",
          order: order,
          per_page: "10",
          page: currentPage.toString(),
          sparkline: "true",
          price_change_percentage: "1h,24h,7d",
          locale: "en",
        };
        const { data } = await axios.get(endpoint, { params });
        setCurrencies(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [currentPage, order]);

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

  const handlePageJump = () => {
    const pageNumber = parseInt(pageInput);
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setPageInput(""); // clear the input field
    } else {
      alert("Please enter a valid page number");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[#4A4A4A] sm:pl-6"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#4A4A4A]"
                    >
                      <div className="flex items-center">Coin</div>
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#4A4A4A]"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#4A4A4A]"
                    >
                      1h
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#4A4A4A]"
                    >
                      24h
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#4A4A4A]"
                    >
                      7d
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#4A4A4A]"
                    >
                      24h Volume
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-[#4A4A4A]"
                    >
                      Mkt Cap
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Last 7 Days
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currencies.map((coin) => (
                    <tr key={coin.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {coin.market_cap_rank}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex items-center">
                          <img
                            className="h-5"
                            src={coin.image}
                            alt={coin.symbol}
                          />
                          <Link
                            to={`/coin/${coin.id}`}
                            className="ml-2 font-semibold text-[#333333]"
                          >
                            {coin.name}
                          </Link>
                          <small className="ml-2 text-[#64748B]">
                            {coin.symbol.toUpperCase()}
                          </small>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#212529]">
                        {formatToUSD(coin.current_price)}
                      </td>
                      <Percentage
                        num={coin.price_change_percentage_1h_in_currency}
                      />
                      <Percentage
                        num={coin.price_change_percentage_24h_in_currency}
                      />
                      <Percentage
                        num={coin.price_change_percentage_7d_in_currency}
                      />

                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#212529]">
                        {formatToUSD(coin.total_volume)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-[#212529]">
                        {formatToUSD(coin.market_cap)}
                      </td>
                      <td>
                        <MiniChart
                          sparkline={coin.sparkline_in_7d}
                          priceChange={
                            coin.price_change_percentage_7d_in_currency
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">Sort by:</span>
                    <select
                      onChange={(e) => setOrder(e.target.value)}
                      value={order}
                      className="rounded-md border bg-white py-1 px-2 text-sm"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {" "}
                        {(currentPage - 1) * coinsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {" "}
                        {currentPage * coinsPerPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {" "}
                        {totalPages * totalPages}
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div className="flex items-center">
                    <span className="mr-2 text-sm text-gray-700">
                      Jump to page:
                    </span>
                    <input
                      type="number"
                      className="w-14 px-2 py-1 text-sm border rounded-md text-white"
                      value={pageInput}
                      onChange={(e) => setPageInput(e.target.value)}
                    />
                    <button
                      onClick={handlePageJump}
                      className="ml-2 text-sm text-blue-600 hover:underline"
                    >
                      Go
                    </button>
                  </div>

                  <div>
                    <nav
                      className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          setCurrentPage((prevPage) =>
                            Math.max(1, prevPage - 1)
                          )
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() =>
                          setCurrentPage((prevPage) => prevPage + 1)
                        }
                        disabled={currentPage === totalPages * coinsPerPage}
                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Prices;
