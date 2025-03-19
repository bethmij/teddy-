import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/app/api/v1",
  withCredentials: true 
});


const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const payload = JSON.parse(atob(token.split('.')[1])); 
  const expirationTime = payload.exp * 1000; 
  const currentTime = Date.now();
  
  return expirationTime < currentTime;
};



const getStorage = {
  get: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  set: (key: string, value: string) => {
    return Promise.resolve(localStorage.setItem(key, value));  
  },
  remove: (key: string) => {
    return Promise.resolve(localStorage.removeItem(key));  
  }
};

api.interceptors.request.use(
  async (config) => {
    let token = await getStorage.get("token");

    if (token && isTokenExpired(token)) {
 
      const newToken = await requestRefresh();
      await getStorage.set("token", newToken);
      token = newToken;  
    }

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;  
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const requestRefresh = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/app/api/v1/auth/refreshToken", 
      {}, 
      { 
        withCredentials: true,
        headers: { "Content-Type": "application/json" } 
      }
    );
    
    if (response.data && response.data.token) {

      localStorage.setItem("token", response.data.token);
      
      return response.data.token;
    } else {
      throw new Error("Invalid response from refresh token");
    }
  } catch (error) {
    console.error("Token refresh failed:", error);

    localStorage.removeItem("token");
    window.location.href = "/auth"; 
    throw error;
  }
};

export default api;