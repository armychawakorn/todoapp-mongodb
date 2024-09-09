//make todo model mongoose schema

import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    name: String,
    description: String,
    status: Boolean,
    dueDate: String
});

export interface ITodo {
    name: string;
    description: string;
    status: boolean;
    dueDate: string;
}
export default model('todos', todoSchema);