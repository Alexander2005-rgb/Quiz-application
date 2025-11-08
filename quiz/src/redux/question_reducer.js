//redux/question_reducer.js

import { createSlice } from "@reduxjs/toolkit";

/** create reducer */
export const questionReducer = createSlice({
    name: "questions",
    initialState: {
        queue: [],
        answers: [],
        trace: 0,
        quizId: null,
    },
    reducers: {
        startExamAction: (state, action) => {
            let { question, answers, quizId } = action.payload;
            return {
                ...state,
                queue: question,
                answers,
                quizId,
            };
        },
        moveNextAction: (state) => {
            return {
                ...state,
                trace: state.trace + 1,
            };
        },
        movePrevAction: (state) => {
            return {
                ...state,
                trace: state.trace - 1,
            };
        },
        resetAllAction: () => {
            return {
                queue: [],
                answers: [],
                trace: 0,
                quizId: null,
            };
        },
    },
});

export const {
    startExamAction,
    moveNextAction,
    movePrevAction,
    resetAllAction,
} = questionReducer.actions;

export default questionReducer.reducer;