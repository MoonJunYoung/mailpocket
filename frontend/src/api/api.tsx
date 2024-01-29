import Cookies from "js-cookie";
import axios from "axios";

export let Token = () => Cookies.get("authToken");
const axiosData = () =>
  axios.create({
    baseURL: "https://mailpocket.site/",
    headers: {
      Authorization: Token(),
    },
  });

interface postAuthDataType {
  identifier: string,
  password: string
}


interface SlackTokenType {
  code: string
}

interface postSubscribeType {
  ids: string[]
}


// Read

export const getReadMailData = (data: string | null) => {
  return axiosData().get(`/api/mail?key=${data}`);
};

// Auth

export const postSignInData = (data: postAuthDataType) => {
  return axiosData().post("/api/user/sign-in", data);
};

export const postSignUpData = (data: postAuthDataType) => {
  return axiosData().post("/api/user/sign-up", data);
};

//slack

export const postSlackToken = (data: SlackTokenType) => {
  return axiosData().post("/api/channel", data);
};

export const getSlackToken = (data: any) => {
  return axiosData().get(`/api/${data}`);
};


// Channle

export const getChannelData = (query: string) => {
  return axiosData().get(query);
};

// Subscribe

export const getNewsletterData = (query: string) => {
  return axiosData().get(query);
};

export const putSubscribe = (data: postSubscribeType) => {
  return axiosData().put("/api/newsletter/subscribe", data);
};

export const getSubscribeData = (query: string) => {
  return axiosData().get(query);
};

