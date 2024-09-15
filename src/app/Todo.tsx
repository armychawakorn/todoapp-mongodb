import React from 'react'

export interface ITodo {
    _id?: string,
    name: string;
    description: string;
    status: boolean;
    dueDate: string;
}

export default function Todo({ todo, todoIndex, donHandler }: { todo: ITodo, todoIndex: number, donHandler: (todoIndex: number) => void }) {
    const timeConvert = (time: string) => {
        const date = new Date(time);
        return date.toLocaleString();
    }
    return (
        <div className='grid grid-cols-7 hover:bg-slate-800 p-2 items-center rounded-xl text-center'>
            <div className='col-span-1'>
                {todo.name}
            </div>
            <div className='col-span-2'>
                {todo.description}
            </div>
            <div className='col-span-1'>
                {todo.status ? 'เสร็จแล้ว' : 'ยังไม่เสร็จ'}
            </div>
            <div className='col-span-2'>
                {timeConvert(todo.dueDate)}
            </div>
            <div className='col-span-1'>
                <button className="bg-blue-500 text-white rounded-lg p-2 w-full" onClick={(() => {
                    donHandler(todoIndex);
                })}>ลบ</button>
            </div>
        </div>
    )
}
