import axios from "axios";

const API_URL = "http://localhost:8000/api/analyze/";

export async function analyzeQuery(query) {
  const response = await axios.post(API_URL, { query });
  return response.data;
}
