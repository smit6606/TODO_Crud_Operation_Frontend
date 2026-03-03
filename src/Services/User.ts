import axios from "axios";

export const userApi = axios.create({
    baseURL: "http://localhost:5000/api/user",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchAllUsersAPI = async (token: string) => {
    return await userApi.get("/", {
        headers: { Authorization: `Bearer ${token}` }
    });
};
