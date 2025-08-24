import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

let baseURL = "http://localhost:8000/api"; // fallback for web/ios

if (Platform.OS === "android") {
  // If running on emulator
  baseURL = "http://10.0.2.2:8000/api";
}

// If running on physical device, use dev server host IP from Expo
const debuggerHost = Constants.expoConfig?.hostUri || Constants.manifest2?.extra?.expoGo?.debuggerHost;

if (debuggerHost) {
  const host = debuggerHost.split(":").shift(); // extract IP from e.g. "192.168.0.105:8081"
  baseURL = `http://${host}:8000/api`;
}

const API = axios.create({
  baseURL,
  timeout: 5000,
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

export default API;
