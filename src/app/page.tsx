'use client';
import { useEffect, useState } from "react";
import Todo, { ITodo } from "./Todo";

export default function Home() {
  const [currentTodo, setCurrentTodo] = useState<ITodo>({
    name: '',
    description: '',
    status: false,
    dueDate: ''
  });
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all todos
  useEffect(() => {
    fetch('/api/v1/todo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      const todos: ITodo[] = data.data;
      setTodos(todos);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  // Add new todo
  function AddHandler() {
    const todo = {
      ...currentTodo,
      status: false
    }
    fetch('/api/v1/todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json()).then(data => {
      setTodos([...todos, data.data]);
      setCurrentTodo({
        name: '',
        description: '',
        status: false,
        dueDate: ''
      });
    }).catch(err => {
      console.log(err);
    });
  }

  // Update todo status
  function DoneHandler(todo: ITodo) {
    fetch('/api/v1/todo', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    }).then(res => res.json()).then(data => {
      const effectedTodo_Id = data.data._id;
      const newTodos = todos.map(todo => {
        if (todo._id === effectedTodo_Id) {
          return data.data;
        }
        return todo;
      });
      setTodos(newTodos);
    })
  }

  // Delete todo
  function DeleteHandler(todo: ITodo) {
    fetch('/api/v1/todo', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: todo._id
      })
    }).then(res => res.json()).then(data => {
      const effectedTodo_Id = data.data._id;
      const newTodos = todos.filter(todo => todo._id !== effectedTodo_Id);
      setTodos(newTodos);
    }).catch(err => {
      console.log(err);
    });
  }
  return (
    <>
      <div className="grid sm:grid-cols-4 my-8">
        <div className="border border-gray-400 p-8 rounded-lg sm:col-start-2 sm:col-span-2">
          <p className="text-2xl font-bold text-center">Todo App</p>
          <div className="flex justify-center">
            <div className="grid gap-y-2.5 w-full">
              <div className="grid grid-cols-1 gap-x-1 w-half">
                <label className="content-center text-end col-span-1 px-2">ชื่อเรื่อง: </label>
                <input type="text" id="name" className="border border-gray-400 rounded-lg p-2 col-span-1 text-stone-950" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    name: event.target.value
                  });
                }} value={currentTodo.name} />
              </div>
              <div className="grid grid-cols-1 gap-x-1">
                <label className="content-center text-end col-span-1 px-2">รายละเอียด: </label>
                <input type="text" id="description" className="border border-gray-400 rounded-lg p-2 col-span-1 text-stone-950" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    description: event.target.value
                  });
                }}
                  value={currentTodo.description} />
              </div>
              <div className="grid grid-cols-1 gap-x-1">
                <label className="content-center text-end col-span-1 px-2">วันครบกำหนด: </label>
                <input type="datetime-local" id="date" className="border border-gray-400 rounded-lg p-2 col-span-1 text-center text-stone-950" onChange={(event) => {
                  setCurrentTodo({
                    ...currentTodo,
                    dueDate: event.target.value
                  });
                }}
                  value={currentTodo.dueDate} />
              </div>
              <div className="grid grid-cols-1 gap-x-1">
                <button className="bg-blue-500 text-white rounded-lg p-2 w-full col-span-1 lg:col-span-3" onClick={AddHandler}>เพิ่ม</button>
              </div>
            </div>
          </div>
          <div className="grid gap-y-4 py-4">
            <div className="grid grid-cols-7 gap-x-2 text-center font-bold">
              <div className="col-span-1">ชื่อเรื่อง</div>
              <div className="col-span-2">รายละเอียด</div>
              <div className="col-span-1">สถานะ</div>
              <div className="col-span-2">วันครบกำหนด</div>
              <div className="col-span-1">จัดการ</div>
            </div>
          </div>
          <hr />
          <div className="grid gap-y-4">
            {
              loading ? <p className="text-center">Loading...</p> : todos.length === 0 ? <p className="text-center">No todos</p> : todos.map((todo, index) => {
                return <Todo key={index} todo={todo} DoneHandler={DoneHandler} DeleteHandler={DeleteHandler} />
              })
            }
          </div>
        </div>
      </div>
    </>
  );
}
