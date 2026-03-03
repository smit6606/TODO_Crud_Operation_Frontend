import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/authSlice";
import todoReducer from "./Features/Todo/todoSlice";
import userReducer from "./Features/Users/userSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todos: todoReducer,
        users: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;