import { Link } from "react-router-dom";

export const Nav = ({ auth }) => {
  const { isAuthenticated, login, logout } = auth;
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated() && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        <li>
          <button onClick={isAuthenticated() ? logout : login}>
            {isAuthenticated() ? "Log Out" : "Log In"}
          </button>
        </li>
      </ul>
    </nav>
  );
};
