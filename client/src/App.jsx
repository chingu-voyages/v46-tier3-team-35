import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { Nav } from "./Nav";
import { Auth } from "./Auth/Auth";
import { Callback } from "./Callback";
import Detail from "./Detail";
import Prices from "./Prices";

function App() {
  const authConst = Auth;

  return (
    <BrowserRouter>
      <Nav auth={authConst} />
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
          <Route
            path="/prices"
            element={
              authConst.isAuthenticated() ? <Prices /> : <Navigate to="/" />
            }
          />
          <Route path="/coin/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
