import Cookies from "js-cookie";
import axios from "axios";

export let Token = () => Cookies.get("authToken");
const axiosData = () =>
  axios.create({
    baseURL: "https://api.mailpocket.me",
    headers: {
      Authorization: Token(),
    },
  });

interface postAuthDataType {
  identifier: string;
  password: string;
}

interface SlackTokenType {
  code: string;
}

interface postSubscribeType {
  ids: number[];
}

export interface Params {
  in_mail: boolean;
  subscribe_status: string;
  sort_type: string;
  cursor?: string;
  category_id?: number;
}

// Read

export const getReadMailData = (data: string | null) => {
  return axiosData().get(`/mail?key=${data}`);
};

export const getUserData = () => {
  return axiosData().get("/user");
};

// Auth

export const postSignInData = (data: postAuthDataType) => {
  return axiosData().post("/user/sign-in", data);
};

export const postSignUpData = (data: postAuthDataType) => {
  return axiosData().post("/user/sign-up", data);
};

//slack

export const postSlackToken = (data: SlackTokenType) => {
  return axiosData().post("/channel", data);
};

export const getSlackToken = (data: any) => {
  return axiosData().get(`/${data}`);
};

// Channle

export const getChannelData = (query: string) => {
  return axiosData().get(query);
};
export const deleteChannelData = (data: number) => {
  return axiosData().delete(`/channel/${data}`);
};

// Subscribe

export const getNewsletterData = (query: string, params: Params) => {
  return axiosData().get(query, {
    params: params,
  });
};

export const putSubscribe = (data: postSubscribeType) => {
  return axiosData().put("/newsletter/subscribe", data);
};

export const getSubscribeData = (query: string) => {
  return axiosData().get(query);
};

// Mail
export const getMail = (newsletter_id: any) => {
  return axiosData().get(`/newsletter/${newsletter_id}/mail`);
};

export const getMailDetail = (s3_object_key: string) => {
  return axiosData().get(`/mail?key=${s3_object_key}`);
};

// read

export const readPageSubscribe = (newsletterId: number) => {
  return axiosData().post(`/newsletter/${newsletterId}/subscribe`);
};

export const readPageUnSubscribe = (newsletterId: number) => {
  return axiosData().delete(`/newsletter/${newsletterId}/subscribe`);
};

// mobilemypage

export const getMyPageNewsLetterDetail = (query: string) => {
  return axiosData().get(query);
};

export const getMyPageSubscribeData = (query: string) => {
  return axiosData().get(query);
};

// category

export const getCategorys = () => {
  return axiosData().get("/newsletter/categories");
};
