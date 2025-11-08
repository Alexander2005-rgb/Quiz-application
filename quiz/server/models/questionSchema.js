//models/questionSchema.js

import mongoose from "mongoose"; // import mongoose library
const { Schema } = mongoose; // destructure Schema from mongoose means mongoose.Schema

/** question model */
const questionModel = new Schema({
    quizId: { type: String, required: true }, // associate questions with a specific quiz
    questions: { type : Array, default: []}, // create question with [] default value
    answers : { type : Array, default: []}, // create answers with [] default value
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Question', questionModel); // export question model