import axios from "axios";

const user = JSON.parse(window.localStorage.getItem("user"));
const token = user?.token;

const config = {
  headers: { Authorization: `Bearer ${token}` },
};
axios.defaults.headers.common = { Authorization: `Bearer ${token}` };
// const baseUrl = "https://api-deploy-production-5c13.up.railway.app/login";
// const baseUrlSign = "https://api-deploy-production-5c13.up.railway.app/sign-up";
// const baseVerify = "https://api-deploy-production-5c13.up.railway.app/verify";
// const baseRecover = "https://api-deploy-production-5c13.up.railway.app/recover";
// const baseContact = "https://api-deploy-production-5c13.up.railway.app/contact";
// const SendFileURL =
//   "https://api-deploy-production-5c13.up.railway.app/send-file";

const baseUrl = "http://localhost:3000/login";
const baseAssistantLogin = "http://localhost:3000/login-assistant";
const baseUrlSign = "http://localhost:3000/sign-up";
const baseVerify = "http://localhost:3000/verify";
const baseRecover = "http://localhost:3000/recover";
const baseContact = "http://localhost:3000/message-contact";
const SendFileURL = "http://localhost:3000/new-quote";
const login = async (credentials) => {
  // const { data } = await axios.post(baseUrl, credentials);
  // return data;

  return {
    "name": "鹏飞",
    "username": "张",
    "email": "tjuzhangpf@126.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUxNjFmYmYwLTJhMDAtNDY5NS05ZjQ0LTQ1ZTU0MDlkZjhlMiIsInBhc3N3b3JkIjoiMTIzNDU2IiwiaWF0IjoxNzE4ODkzMjQyLCJleHAiOjE3MTkxNTI0NDJ9.wbEeqMKsafzIRNvAb2A8b_L36NOKIql7KbYlSkwS_FE"
  }
};
const Assistantlogin = async (credentials) => {
  const { data } = await axios.post(baseAssistantLogin, credentials);
  return data;
};
const signup = async (credentials) => {
  const { data } = await axios.post(baseUrlSign, credentials);
  return data;
};
const verifyCode = async (credentials) => {
  const { data } = await axios.post(baseVerify, credentials);
  return data;
};
const recoverPassword = async (credentials) => {
  const { data } = await axios.post(baseRecover, credentials);
  return data;
};
const contactMessage = async (credentials) => {
  const { data } = await axios.post(baseContact, credentials);
  return data;
};

const sendFile = async (credentials) => {
  const { data } = await axios.post(SendFileURL, credentials);
  return data;
};
const sendChanges = async (credentials) => {
  const { data } = await axios.post(
    "http://localhost:3000/assistant-changes",
    credentials
  );
  return data;
};
const createQuote = async (credentials) => {
  const { data } = await axios.post(
    "http://localhost:3000/new-quote",
    credentials
  );
  return data;
};
const customQuote = async (credentials) => {
  const { data } = await axios.post(
    "http://localhost:3000/send-quote",
    credentials
  );
  return data;
};
const updateFileSetting = async (credentials) => {
  const { data } = await axios.patch(
    "http://localhost:3000/update-file",
    credentials
  );
  return data;
};
const getUsersQuotes = async (email) => {
  const { data } = await axios.get(
    `http://localhost:3000/customer-quote?email=${email}`
  );
  return data;
};
const getSingleQuote = async (id) => {
  const { data } = await axios.get(`http://localhost:3000/quote/${id}`);
  return data;
};
const getAssistantQuotes = async ({ email }) => {
  const { data } = await axios.get(
    `http://localhost:3000/assistant-quote?email=${email}`
  );
  return data;
};
const getOrderes = async (email) => {
  const { data } = await axios.get(
    `http://localhost:3000/my-orders?id=${email}`
  );
  return data;
};
const completedQuotes = async ({ email, status }) => {
  const { data } = await axios.get(
    `http://localhost:3000/customer-quote?status=${status}&email=${email}`
  );
  return data;
};
const completedOrders = async ({ status, email }) => {
  const { data } = await axios.get(
    `http://localhost:3000/customer-quote?status=${status}&email=${email}`
  );
  return data;
};
export default {
  login,
  Assistantlogin,
  signup,
  verifyCode,
  recoverPassword,
  contactMessage,
  sendFile,
  sendChanges,
  createQuote,
  customQuote,
  getUsersQuotes,
  getSingleQuote,
  getAssistantQuotes,
  getOrderes,
  completedQuotes,
  completedOrders,
  updateFileSetting,
};
