import React from 'react'

export interface ITodo {
    _id?: string,
    name: string;
    description: string;
    status: boolean;
    dueDate: string;
}

export default function Todo({ todo, DoneHandler, DeleteHandler }: { todo: ITodo, DoneHandler: (todo: ITodo) => void, DeleteHandler: (todo: ITodo) => void }) {
    const timeConvert = (time: string) => {
        const date = new Date(time);
        return date.toLocaleString();
    }
    return (
        <div className='grid grid-cols-7 hover:bg-slate-800 p-2 items-center rounded-xl text-center gap-2' style={{textDecoration: todo.status == false ? 'none' : 'line-through'}}>
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
                <div className="grid grid-rows gap-2">
                    {
                        todo.status == true ? <button className="bg-red-500 text-white rounded-lg p-2 w-full hover:bg-red-700" onClick={(() => {
                            DeleteHandler(todo);
                        })}>ลบ</button> : <button className="bg-blue-500 text-white rounded-lg p-2 w-full hover:bg-blue-700" onClick={(() => {
                            DoneHandler(todo);
                        })}>เสร็จแล้ว</button>
                    }
                </div>
            </div>
        </div>
    )
}
