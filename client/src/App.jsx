import "./App.css";
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { Auth } from "./Auth/Auth";
import { Callback } from "./Callback";
import Dashboard from "./Components/Routes/dashboard";
import DashboardNav from "./Components/DashBoardNav";
import NavBar from "./Components/Navbar";
import { useState } from "react";
import Footer from "./Footer";
import Prices from "./Prices";
import Detail from "./Detail";
import Favorite from "./Favorite";
import SearchPage from "./Components/Routes/SearchPage";
import TopCryptos from "./Components/Routes/TopCryptos";
import CategoriesList from "./Components/Routes/CategoriesList";
import CryptoList from "./Components/Routes/CryptoList"
function App() {
  const authConst = Auth;
  const [search, setSearch] = useState("");

  console.log(search)
  return (
    <>
      <BrowserRouter>
        <NavBar auth={authConst} setSearch={setSearch} />
        <div className="body">
          <Routes>
            <Route path="/" element={<Home auth={authConst} />} />
            <Route
              path="/callback"
              element={<Callback auth={authConst} loc={location} />}
            />
            <Route
              path="/profile"
              element={
                authConst.isAuthenticated() ? (
                  <Profile auth={authConst} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route path="/prices" element={<Prices />} />
            <Route path="/coin/:id" element={<Detail auth={authConst} />} />
            <Route path="/favorite" element={<Favorite auth={authConst} />} />
          </Routes>
        </div>
        <div style={{ display: "flex" }}>
          <Routes>
            <Route
              element={
                <>
                  <DashboardNav search={search} />
                  <Outlet />
                </>
              }
            >
              <Route
                path="/dashboard"
                element={<Dashboard search={search} />}
              />
              <Route
                path="/search"
                element={<SearchPage search={search} auth={authConst} />}
              />
              <Route
                path="/topCryptos"
                element={<TopCryptos search={search} setSearch={setSearch} />}
              />
              <Route
                path="/categories"
                element={
                  <CategoriesList search={search} setSearch={setSearch} />
                }
              />
              <Route
                path="/cryptos"
                element={<CryptoList search={search} setSearch={setSearch} />}
              />
            </Route>
            <Route
              path="/dashboard"
              element={<DashboardNav search={search} />}
            />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
