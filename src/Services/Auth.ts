import axios from "axios";

// Create a configured axios instance
export const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_BASE_URL || "http://localhost:5000/api/auth",
    headers: {
        "Content-Type": "application/json",
    },
});

// Since the backend accepts FormData for register (profile_image), and others use upload.none()
export const registerUserAPI = async (formData: FormData) => {
    return await authApi.post("/register", formData);
};

export const loginUserAPI = async (data: Record<string, string>) => {
    return await authApi.post("/login", data);
};

export const forgotPasswordAPI = async (data: Record<string, string>) => {
    return await authApi.post("/forgot-password/send-otp", data);
};

export const verifyOtpAPI = async (data: Record<string, string>) => {
    return await authApi.post("/forgot-password/verify-otp", data);
};

export const resetPasswordAPI = async (data: Record<string, string>) => {
    return await authApi.post("/forgot-password/reset-password", data);
};

export const changePasswordAPI = async (data: Record<string, string>, token: string) => {
    return await authApi.post("/change-password", data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
