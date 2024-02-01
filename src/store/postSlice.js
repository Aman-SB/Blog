import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import appwriteService from "../appwrite/config";

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
    return appwriteService.getPosts();
});

const initialstate = {
    isLoading: false,
    posts: null,
    isError: false,
};

const postSlice = createSlice({
    name: "post",
    initialState: initialstate,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, actions) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, actions) => {
            state.isLoading = false;
            state.posts = actions.payload;
        });
        builder.addCase(fetchPosts.rejected, (state, actions) => {
            state.isError = true;
        });
    },
});

export const { getpost } = postSlice.actions;

export default postSlice.reducer;
