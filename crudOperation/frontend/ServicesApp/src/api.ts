import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

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

API.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
