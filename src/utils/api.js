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

export const userChatHistory = async (data) => {
  try {
    const response = await axios.get(`/get-history/?email=${data}`)
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deletChatHistory = async (id,data) => {
  try {
    const response = await axios.delete(`/delete-history/?email=${data}&session=${id}`)
    return response;
  } catch (error) {
    return error.response;
  }
};

export const updateChatHistory = async (data) => {
  try {
    const response = await axios.post("/edit-history", data);
    return response;
  } catch (error) {
    return error.response;
  }
};