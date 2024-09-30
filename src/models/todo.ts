//make todo model mongoose schema

import mongoose, { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    dueDate: String
});

export default mongoose.models.todos || model('todos', todoSchema);