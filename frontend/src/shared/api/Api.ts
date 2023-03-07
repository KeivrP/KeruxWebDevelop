import axios from "axios";
import { SERVER_URL } from "../constants/env.contants";

export const Api = axios.create({
  baseURL: `${SERVER_URL}/api`,
});
