import axios from "axios";

export const todoApi = axios.create({
    baseURL: "http://localhost:5000/api/task",
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchTodosAPI = async (token: string, priority?: string, status?: string) => {
    let url = "/";
    const params = new URLSearchParams();
    if (priority && priority !== "All") params.append("priority", priority);
    if (status && status !== "All") params.append("status", status);
    if (params.toString()) url += `?${params.toString()}`;

    return await todoApi.get(url, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const createTodoAPI = async (data: Record<string, string>, token: string) => {
    return await todoApi.post("/", data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updateTodoAPI = async (id: number, data: Record<string, string>, token: string) => {
    return await todoApi.put(`/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deleteTodoAPI = async (id: number, token: string) => {
    return await todoApi.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
