//redux/result_rducer.js

import { createSlice } from "@reduxjs/toolkit";

export const resultReducer = createSlice({
    name: "result",
    initialState: {
        userId: null,
        username: null,
        role: null,
        token: null,
        result: [],
    },
    reducers: {
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        setAuth: (state, action) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.token = action.payload.token;
        },
        clearAuth: (state) => {
            state.userId = null;
            state.username = null;
            state.role = null;
            state.token = null;
        },
        pushResultAction: (state, action) => {
            state.result.push(action.payload);
        },
        updateResultAction: (state, action) => {
            const { trace, checked } = action.payload;
            state.result[trace] = checked;
        },
        resetResultAction: () => {
            return {
                userId: null,
                username: null,
                role: null,
                token: null,
                result: [],
            };
        },
    },
});

export const {
    setUserId,
    setAuth,
    clearAuth,
    pushResultAction,
    resetResultAction,
    updateResultAction,
} = resultReducer.actions;

export default resultReducer.reducer;
