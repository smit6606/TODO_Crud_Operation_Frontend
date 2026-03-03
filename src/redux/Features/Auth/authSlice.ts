import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    name?: string;
    user_name: string;
    email: string;
    phone_no?: string;
    gender?: string;
    about?: string;
    profile_image: string | null;
}

interface AuthState {
    mode: "login" | "signup" | "forgot" | "verifyOtp" | "changePassword";
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    rememberMe: boolean;
}

// Ensure sessionStorage access safely
const getSessionStorageItem = (key: string) => {
    try { return sessionStorage.getItem(key); } catch (e) { return null; }
};

const storedToken = getSessionStorageItem("token");
const storedUser = getSessionStorageItem("user");
const storedRememberMe = (() => {
    try { return localStorage.getItem("rememberMe") === "true"; }
    catch { return false; }
})();

const initialState: AuthState = {
    mode: "login",
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isAuthenticated: !!storedToken,
    rememberMe: storedRememberMe,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<AuthState["mode"]>) => {
            state.mode = action.payload;
        },
        setCredentials: (
            state,
            action: PayloadAction<{ user?: User; token: string; rememberMe?: boolean }>
        ) => {
            const { user, token, rememberMe } = action.payload;
            state.token = token;
            state.isAuthenticated = true;
            if (user) {
                state.user = user;
            }
            if (rememberMe !== undefined) {
                state.rememberMe = rememberMe;
            }

            // Strictly enforcing company-level session storage persistence for privacy
            sessionStorage.setItem("token", token);
            if (user) sessionStorage.setItem("user", JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            
            // Clean sweeping storage
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("reset_email");
            sessionStorage.removeItem("reset_token");
        },
        setRememberMe: (state, action: PayloadAction<boolean>) => {
            state.rememberMe = action.payload;
            localStorage.setItem("rememberMe", String(action.payload));
        }
    },
});

export const { setMode, setCredentials, logout, setRememberMe } = authSlice.actions;
export default authSlice.reducer;