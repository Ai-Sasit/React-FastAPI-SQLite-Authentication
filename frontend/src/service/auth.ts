import Cookies from "js-cookie";
import api from "./api";

export const register = async (payload: any) => {
  await api
    .post("/register", payload)
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
  window.location.replace("/")
};

export const login = async(payload: any) => {
  let response = await api.post("/login", payload);
  let data: any = response.data;
  if (data.access_token){
    Cookies.set("token", data.access_token);
    window.location.replace("/")
  } else {
    alert(data.error);
  }
}

export const logout = () => {
  Cookies.remove("token");
}

export const getUser = async () => {
  let token :any = Cookies.get("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let res:any = await api.get(`/verify_token/`, { headers })
  return res.data
};

export const fetchAllUsers = async () => {
  let response = await api.get('/users');
  return response.data
}