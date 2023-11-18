import "./Search/SearchPage.css";
import { FaBitcoin } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { BiSolidCategory, BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";

function DashboardNav() {
  return (
    <div className="drawer lg:drawer-open" style={{ display: "flex" }}>
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer- NavLink lg:hidden"
        >
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side" style={{ width: 250 }}>
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
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
    </div>
  );
}

export default DashboardNav;
