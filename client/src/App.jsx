import React, { useEffect, useState, useCallback } from "react";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

import { Home } from "./Home";
import { Profile } from "./Profile";
import { Nav } from "./Nav";
import { Auth } from "./Auth/Auth";
import { Callback } from "./Callback";
import Detail from "./Detail";
import Prices from "./Prices";
import Favorite from "./Favorite";

function App() {
  const authConst = Auth;
  const [profile, setProfile] = useState(null);

  const loadUserProfile = useCallback(() => {
    authConst.getProfile((profile, error) => setProfile({ profile, error }));
  }, [authConst]);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Nav auth={authConst} />
      <div className="body">
        <Routes>
          <Route path="/" element={<Home auth={authConst} />} />
          <Route
            path="/callback"
            element={<Callback auth={authConst} loc={window.location} />}
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
          <Route
            path="/coin/:id"
            element={
              authConst.isAuthenticated() ? (
                <Detail email={profile.profile.email} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/favorite"
            element={
              authConst.isAuthenticated() ? (
                <Favorite email={profile.profile.email} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
