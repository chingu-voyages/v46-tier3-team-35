import { NavLink } from "react-router-dom";
import { FaBitcoin } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { BiSolidCategory, BiSearch } from "react-icons/bi";
function mobileDashBoardNav() {
  return (
    <div>
      <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <li>
          <NavLink
            to="/search"
            style={{ width: "100%" }}
            className={({ isActive }) => (isActive ? "Active" : "non-Active")}
          >
            <BiSearch />
            Search Result
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cryptos"
            style={{ width: "100%" }}
            className={({ isActive }) => (isActive ? "Active" : "non-Active")}
          >
            <FaBitcoin />
            All Crypto
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/topCryptos"
            style={{ width: "100%" }}
            className={({ isActive }) => (isActive ? "Active" : "non-Active")}
          >
            <FaRankingStar />
            Top Cryptos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/categories"
            style={{ width: "100%" }}
            className={({ isActive }) => (isActive ? "Active" : "non-Active")}
          >
            <BiSolidCategory />
            Categories
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default mobileDashBoardNav;
