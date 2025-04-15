import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "https://loanai.askgig.com";

export const botResponse = async (data) => {
  try {
    const response = await axios.post("/bot-response", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userLogin = async (data) => {
  try {
    const response = await axios.post("/email-register", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
