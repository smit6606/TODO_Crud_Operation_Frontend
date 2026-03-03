import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodosAPI, createTodoAPI, updateTodoAPI, deleteTodoAPI } from "../../../Services/api";

export interface Todo {
    id: number;
    title: string;
    description: string;
    status: string;
    priority: string;
    createdAt: string;
}

interface TodoState {
    data: Todo[];
    loading: boolean;
    error: string | null;
}

const initialState: TodoState = {
    data: [],
    loading: false,
    error: null,
};

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (
        params: { priority?: string; status?: string; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await fetchTodosAPI(params.token, params.priority, params.status);
            return response.data; // Assumes backend returns { success: true, count: X, data: [...] }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch tasks");
        }
    }
);

export const createTodo = createAsyncThunk(
    "todos/createTodo",
    async (
        payload: { taskData: Record<string, string>; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await createTodoAPI(payload.taskData, payload.token);
            return response.data; // Assumes response.data returns { success: true, data: { ...newTodo } }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to create task");
        }
    }
);

export const updateTodo = createAsyncThunk(
    "todos/updateTodo",
    async (
        payload: { id: number; taskData: Record<string, string>; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await updateTodoAPI(payload.id, payload.taskData, payload.token);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to update task");
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async (
        payload: { id: number; token: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await deleteTodoAPI(payload.id, payload.token);
            return { id: payload.id, ...response.data };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Failed to delete task");
        }
    }
);

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Todos
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create Todo
            .addCase(createTodo.fulfilled, (state, action) => {
                if(action.payload.data) {
                    state.data.push(action.payload.data);
                }
            })
            // Update Todo
            .addCase(updateTodo.fulfilled, (state, action) => {
                if(action.payload.data) {
                    const index = state.data.findIndex((t) => t.id === action.payload.data.id);
                    if (index !== -1) {
                        state.data[index] = action.payload.data;
                    }
                }
            })
            // Delete Todo
            .addCase(deleteTodo.fulfilled, (state, action) => {
                // Return payload contains { id, ...response.data }
                state.data = state.data.filter((t) => t.id !== action.payload.id);
            });
    },
});

export default todoSlice.reducer;
