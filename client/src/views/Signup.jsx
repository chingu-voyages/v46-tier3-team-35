import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logoUrl } from "../constants/index";
import { ClipLoader } from "react-spinners";
import { signup } from "../service/user";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const body = {
      email: email,
      password: password,
      username: username,
    };

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("passwords do not match.");
      setIsLoading(false);
      return;
    }

    // Check if password length is at least 6 characters
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    try {
      await signup(body);
      toast.success("sign up successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    console.log("unimplemented");
  };

  return (
    <div className="flex flex-col justify-center flex-1 min-h-full pb-40 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" />
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/">
          <img className="w-auto mx-auto h-28" src={logoUrl} alt="logo" />
        </Link>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Sign up for a new account
        </h2>
      </div>

      <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="px-6 py-12 bg-white shadow sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSignUp}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="confirm"
                  name="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLoading ? (
                  <ClipLoader size={15} color={"#FFFFFF"} />
                ) : (
                  "Create new account"
                )}
              </button>
            </div>
          </form>

          <div>
            <div className="relative mt-10">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="px-6 text-gray-900 bg-white">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-1.5 text-gray-700 font-semibold text-lg border-2 border-gray-100 hover:bg-[#e9e9ea] hover:border-transparent"
                type="button"
                onClick={handleGoogleSignUp}
              >
                <img
                  src="https://res.cloudinary.com/yilin1234/image/upload/v1692507925/Google__G__Logo.svg_notatb.png"
                  alt="Google Logo"
                  className="w-5 h-5"
                />
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
            </div>
          </div>
        </div>

        <p className="mt-5 text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
