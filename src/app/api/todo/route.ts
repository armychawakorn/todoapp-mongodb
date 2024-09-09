import { CreateConnection } from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server";
import TodoModel, { ITodo } from '@/models/todo';

export async function GET(req: NextRequest) {
    await CreateConnection();
    const todo = await TodoModel.find();
    return NextResponse.json({
        status: 'success',
        code: 200,
        message: 'Todos fetched successfully',
        todo
    });
}

export async function POST(req: NextRequest) {
    await CreateConnection();
    const new_todo: ITodo = await req.json();
    if (!new_todo.name || !new_todo.description || !new_todo.status || !new_todo.dueDate) {
        return NextResponse.json({
            status: 'error',
            code: 400,
            message: 'Missing required fields'
        });
    }
    const todo = new TodoModel(new_todo);
    await todo.save();
    return NextResponse.json({
        status: 'success',
        code: 201,
        todo
    });
}

export async function PUT(req: NextRequest) {
    await CreateConnection();
    const updated_todo: ITodo = await req.json();
    if (!updated_todo.name || !updated_todo.description || !updated_todo.status || !updated_todo.dueDate) {
        return NextResponse.json({
            status: 'error',
            code: 400,
            message: 'Missing required fields'
        });
    }
    const todo = await TodoModel.findOneAndUpdate({ name: updated_todo.name }, updated_todo, { new: true });
    return NextResponse.json({
        status: 'success',
        code: 200,
        message: 'Todo updated successfully',
        todo
    });
}

export async function DELETE(req: NextRequest) {
    await CreateConnection();
    const todo_name = req.nextUrl.searchParams.get('name');
    if (!todo_name) {
        return NextResponse.json({
            status: 'error',
            code: 400,
            message: 'Missing required fields'
        });
    }
    const todo = await TodoModel.findOneAndDelete({ name: todo_name });
    return NextResponse.json({
        status: 'success',
        code: 200,
        message: 'Todo deleted successfully',
        todo
    });
}