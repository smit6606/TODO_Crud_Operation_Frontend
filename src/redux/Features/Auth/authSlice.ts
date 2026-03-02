import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
    id: number;
    user_name: string;
    email: string;
    profile_image: string | null;
}

interface AuthState {
    mode: "login" | "signup" | "forgot" | "verifyOtp" | "changePassword";
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    rememberMe: boolean;
}

// Ensure localStorage access safely (useful for SSR setups if adapted)
const getLocalStorageItem = (key: string) => {
    try { return localStorage.getItem(key); } catch (e) { return null; }
};

const storedToken = getLocalStorageItem("token");
const storedUser = getLocalStorageItem("user");
const storedRememberMe = getLocalStorageItem("rememberMe") === "true";

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

            // Strictly enforcing company-level local storage persistence
            localStorage.setItem("token", token);
            if (user) localStorage.setItem("user", JSON.stringify(user));
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            
            // Clean sweeping storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
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