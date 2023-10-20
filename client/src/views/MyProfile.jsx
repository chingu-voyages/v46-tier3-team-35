import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { updateUserProfile } from "../service/user";
import { PhotoIcon, ArrowUpOnSquareIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

function MyProfile() {
  const user = useSelector((state) => state.user.value);

  const [username, setUsername] = useState(user.username);
  const [about, setAbout] = useState(user.about);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  function handleImageChange(e) {
    const { files } = e.target;
    if (files && files.length !== 0) {
      setImage(files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    }
  }

  async function handleImageUpload() {
    try {
      const data = new FormData();
      if (image) {
        data.append("file", image);
        data.append("upload_preset", "social_media_app");
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/da4jbx5r9/image/upload",
          data
        );
        return response.data.secure_url;
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image.");
    }
  }

  async function handleOnUpdate(e) {
    e.preventDefault();
    setIsLoading(true);

    let profilePicture = user.profilePicture;

    // If there is a new image, upload it
    if (image) {
      profilePicture = await handleImageUpload();
      if (!profilePicture) return; // Return if image upload failed
    }

    const body = {
      username: username,
      profilePicture: profilePicture,
      about: about,
    };

    try {
      await updateUserProfile(user.id, body);
      toast.success("User profile updated. refresh to see the changes.");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="p-10">
      <ToastContainer position="bottom-right" />
      <form onSubmit={handleOnUpdate}>
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          profile
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          this information will be displayed publicly so be careful what you
          share.
        </p>
        <img className="h-24 mt-5" src={user.profilePicture} alt="profile" />
        <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              username
            </label>
            <div className="mt-2">
              <input
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                name="username"
                id="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="about"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              about
            </label>
            <div className="mt-2">
              <textarea
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                id="about"
                name="about"
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                required
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              write a few sentences about yourself.
            </p>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              profile Image
            </label>
            <div className="flex mt-3 text-sm leading-6 text-gray-600">
              <label
                htmlFor="profileImage"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                upload an image{" "}
                <ArrowUpOnSquareIcon
                  className="-mr-0.5 h-5 w-5"
                  aria-hidden="true"
                />
                <input
                  className="sr-only"
                  id="profileImage"
                  type="file"
                  name="profileImage"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="flex justify-center px-6 py-10 mt-4 border border-dashed rounded-lg border-gray-900/25">
              <div className="text-center">
                {imagePreview ? (
                  <img src={imagePreview} alt="preview" width="300" />
                ) : (
                  <PhotoIcon
                    className="w-12 h-12 mx-auto text-gray-300"
                    aria-hidden="true"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end mt-6 gap-x-6">
          <button
            type="submit"
            className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isLoading ? <ClipLoader size={15} color={"#FFFFFF"} /> : "update"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MyProfile;
