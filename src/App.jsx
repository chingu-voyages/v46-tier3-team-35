import { useEffect, useState } from 'react'
import ApiFetch from './Api'
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { Profile } from "./Profile";
import { Nav } from "./Nav";
import { Auth } from "./Auth/Auth";
import { Callback } from "./Callback";

function App() {
  const authConst = Auth;
  
  return (
    <BrowserRouter>
      <ApiFetch/>
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;