const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo :{
        type: String,
        required: true
    },
    finished: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Todo = mongoose.model('todoList', todoSchema);
module.exports = Todo;