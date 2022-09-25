import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    word: { type: String, required: true},
    count: {type: Number, required:true },
    chinese: {type: String, require: true },
    rootWord: {type: String, require: true}
})

export const Word = mongoose.model("Word", WordSchema)