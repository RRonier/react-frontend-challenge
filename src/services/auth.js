import { API } from "../API";

export const loginService = ({loginData}) => API.post({loginData})