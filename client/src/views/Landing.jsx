import { Link } from "react-router-dom";
import { logo } from "../constants/index";

function Landing({ auth }) {
  const isAuthenticated = auth.isAuthenticated();

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <img className="h-28 w-auto" src={logo} alt="logo" />
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              crypto app
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Your Comprehensive Crypto Price Dashboard.
            </p>
            {isAuthenticated === false ? (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={auth.login}
                >
                  Log In
                </button>
              </div>
            ) : (
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="dashboard"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  dashboard
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
