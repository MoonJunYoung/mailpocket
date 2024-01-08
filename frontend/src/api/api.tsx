import Cookies from "js-cookie";
import axios from "axios";

export let Token = () => Cookies.get("authToken");
const axiosData = () =>
  axios.create({
    baseURL: "https://mailpocket.site",
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

export const postSignInData = (data: postSignInDataType) => {
  return axiosData().post("/api/user/sign-in", data);
};

export const postSignUpData = (data: postSignUpDataType) => {
  return axiosData().post("/api/user/sign-up", data);
};
