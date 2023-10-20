import instance from "../utils/axiosInstance";

//🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢( POST )🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢 🟢

export const login = async (body) => {
  const response = await instance.post("users/login", body);
  return response;
};

export const signup = async (body) => {
  await instance.post("users/register", body);
};

export const logout = async () => {
  const response = await instance.post("users/logout");
  return response;
};

//🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵( GET )🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵

export const restoreSession = async () => {
  const response = await instance.get("users/restoreSession");
  return response.data.userInfo;
};

//🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡( PUT )🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡 🟡

export async function updateUserProfile(userId, body) {
  await instance.put(`users/update/${userId}`, body);
}
