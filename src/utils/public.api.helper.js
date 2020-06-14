import { publicAxiosInstance } from "./api";

export async function handleUserLogin(params) {
  return await publicAxiosInstance.post("auth/login", params);
}

export async function handleUserRegistration(params) {
  return await publicAxiosInstance.post("auth/register", params);
}
