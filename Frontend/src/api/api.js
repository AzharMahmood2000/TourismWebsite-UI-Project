const API_BASE_URL = "http://localhost:5000";

export const getToken = () => {
  const userInfo = localStorage.getItem("userInfo");

  if (!userInfo) {
    return null;
  }

  try {
    const user = JSON.parse(userInfo);
    return user.token;
  } catch (error) {
    return null;
  }
};

export const authHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const publicHeaders = () => {
  return {
    "Content-Type": "application/json",
  };
};

export default API_BASE_URL;