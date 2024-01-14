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

interface postSignInDataType {
  identifier: string,
  password: string
}
interface postSignUpDataType {
  identifier: string,
  password: string
  name: string
}

interface SlackTokenType {
  code : string
}


export const postSignInData = (data: postSignInDataType) => {
  return axiosData().post("/api/user/sign-in", data);
};

export const postSignUpData = (data: postSignUpDataType) => {
  return axiosData().post("/api/user/sign-up", data);
};

export const postSlackToken = (data: SlackTokenType) => {
  return axiosData().post("/api/channel", data);
};

export const getChannelData = (query:string) => {
  return axiosData().get(query);
};
