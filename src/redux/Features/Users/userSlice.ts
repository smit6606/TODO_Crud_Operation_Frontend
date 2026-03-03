import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAllUsersAPI } from "../../../Services/api";

export interface UserProfile {
    id: number;
    user_name: string;
    name: string;
    email: string;
    gender: string;
    about: string;
    profile_image: string | null;
}

interface UserState {
    data: UserProfile[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (token: string, { rejectWithValue }) => {
        try {
            const response = await fetchAllUsersAPI(token);
            return response.data; 
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch users");
        }
    }
);

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default userSlice.reducer;
