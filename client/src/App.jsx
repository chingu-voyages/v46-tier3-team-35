import { Route, Routes } from "react-router-dom";
import { Auth } from "./Auth/Auth";
import { Callback } from "./Callback";
import PrivateRoutes from "./views/PrivateRoutes";
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard";
import Price from "./views/Price";
import Search from "./views/Search";
import Favorites from "./views/Favorites";
import Profile from "./views/Profile";

function App() {
  const authConst = Auth;

  return (
    <Routes>
      <Route path="/" element={<Landing auth={authConst} />} />
      <Route
        path="/callback"
        element={<Callback auth={authConst} loc={location} />}
      />
      <Route element={<PrivateRoutes auth={authConst} />}>
        <Route path="/dashboard" element={<Dashboard auth={authConst} />}>
          <Route path="price" element={<Price />} />
          <Route path="search" element={<Search />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="profile" element={<Profile auth={authConst} />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
