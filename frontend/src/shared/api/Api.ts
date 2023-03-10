import axios from "axios";
import { API_URL } from "../constants/env.contants";

export const Api = axios.create({
  baseURL: API_URL,
});
