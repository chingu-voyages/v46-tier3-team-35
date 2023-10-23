import { Link } from "react-router-dom";

export const Home = ({ auth }) => {
  return (
    <div>
      <h1>Home</h1>
      {auth.isAuthenticated() ? (
        <Link to="/profile">View profile</Link>
      ) : (
        <button onClick={auth.login}>Log In</button>
      )}
    </div>
  );
};
