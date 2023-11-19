import { TbMathMax } from "react-icons/tb";
import {
  FcPositiveDynamic,
  FcNegativeDynamic,
  FcLowPriority,
} from "react-icons/fc";
import { MdCurrencyExchange, MdOutlineScoreboard } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { FaTemperatureHigh } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
function MobileSearchPageStats(props) {
  const cryptoInfo = props.cryptoInfo;
  return (
    <div className="Mobile-stats-div ">
      <div className="stat">
        <div className="stat-title" style={{ display: "flex" }}>
          <TbMathMax style={{ marginRight: 10, fontSize: 22 }} /> Market Cap:{" "}
          {cryptoInfo.length === undefined
            ? cryptoInfo.market_data.market_cap.usd
            : ""}
        </div>
        <div className="stat-title" style={{ display: "flex" }}>
          <FcPositiveDynamic style={{ marginRight: 10, fontSize: 22 }} /> High:{" "}
          {cryptoInfo.length === undefined
            ? cryptoInfo.market_data.high_24h.usd
            : ""}
        </div>
        <div className="stat-title" style={{ display: "flex" }}>
          <FcNegativeDynamic
            style={{ color: "red", marginRight: 10, fontSize: 22 }}
          />{" "}
          Low:{" "}
          {cryptoInfo.length === undefined
            ? cryptoInfo.market_data.low_24h.usd
            : ""}
        </div>
        <div className="stat-title" style={{ display: "flex" }}>
          <MdCurrencyExchange style={{ marginRight: 10, fontSize: 22 }} /> 24 hr
          price change:{" "}
          {cryptoInfo.length === undefined
            ? cryptoInfo.market_data.price_change_24h_in_currency.usd
            : ""}
        </div>
      </div>
      <hr style={{ backgroundColor: "black" }} />
      <div className="stat">
        <div className="stat-title" style={{ display: "flex" }}>
          <FaRankingStar style={{ marginRight: 10, fontSize: 22 }} /> Coin Gecko
          rank:{" "}
          {cryptoInfo.length === undefined ? cryptoInfo.coingecko_rank : ""}{" "}
        </div>
        <div className="stat-title" style={{ display: "flex" }}>
          <MdOutlineScoreboard style={{ marginRight: 10, fontSize: 22 }} /> Coin
          Gecko score:{" "}
          {cryptoInfo.length === undefined ? cryptoInfo.community_score : ""}
        </div>
        <div className="stat-title" style={{ display: "flex" }}>
          <BsCashCoin style={{ marginRight: 10, fontSize: 22 }} /> Liquidity
          score:{" "}
          {cryptoInfo.length === undefined ? cryptoInfo.liquidity_score : ""}
        </div>
      </div>
      <hr style={{ backgroundColor: "black" }} />
      <div className="stat">
        <div className="stat-title" style={{ display: "flex" }}>
          <AiFillDollarCircle style={{ marginRight: 10, fontSize: 22 }} />{" "}
          Circulating supply:{" "}
          {cryptoInfo.length === undefined
            ? cryptoInfo.market_data.circulating_supply
            : ""}
        </div>
        <div className="stat-title" style={{ display: "flex" }}>
          <FcLowPriority style={{ marginRight: 10, fontSize: 22 }} /> Atl:{" "}
          {cryptoInfo.length === undefined
            ? cryptoInfo.market_data.atl.usd
            : ""}
        </div>
        <div className="stat-title" style={{ display: "flex" }}>
          <FaTemperatureHigh style={{ marginRight: 10, fontSize: 22 }} /> Ath:
          {cryptoInfo.length === undefined
            ? cryptoInfo.market_data.ath.usd
            : ""}
        </div>
      </div>
    </div>
  );
}

export default MobileSearchPageStats;
