import { API } from "../API";

export const loginService = async(user, password) => await API.post("/login", {
    user, password
})