//models/resultSchema.js

import mongoose from "mongoose";
const { Schema } = mongoose; // destructure Schema from mongoose means mongoose.Schema



/** result model */
const resultModel = new Schema({ // create result schema
    username : { type : String },
    result : { type : Array, default : []}, // create result with [] default value
    attempts : { type : Number, default : 0}, // create attempts with 0 default value
    points : { type : Number, default : 0},
    achived : { type : String, default : ''}, // achived with '' default value
    createdAt : { type : Date, default : Date.now}
})

export default mongoose.model('result', resultModel);