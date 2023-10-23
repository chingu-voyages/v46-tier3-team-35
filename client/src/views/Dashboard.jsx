import { useState } from "react";
import {
  UserCircleIcon,
  CurrencyDollarIcon,
  MagnifyingGlassIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { Link, Outlet } from "react-router-dom";
import { logo } from "../constants/index";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Dashboard({ auth }) {
  const [currentTab, setCurrentTab] = useState("");

  const navigation = [
    {
      name: "price",
      href: "price",
      icon: CurrencyDollarIcon,
      current: currentTab === "price",
    },
    {
      name: "search",
      href: "search",
      icon: MagnifyingGlassIcon,
      current: currentTab === "search",
    },
    {
      name: "favorites",
      href: "favorites",
      icon: HeartIcon,
      current: currentTab === "favorites",
    },

    {
      name: "profile",
      href: "profile",
      icon: UserCircleIcon,
      current: currentTab === "profile",
    },
  ];

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/">
              <img className="h-16 w-auto" src={logo} alt="logo" />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li
                      key={item.name}
                      onClick={() => setCurrentTab(item.name)}
                    >
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
          <button
            className="mb-4 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={auth.logout}
          >
            Log Out
          </button>
        </div>
      </div>
      <main className="lg:pl-72">
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
