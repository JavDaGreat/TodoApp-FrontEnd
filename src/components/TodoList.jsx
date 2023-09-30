import React, { useEffect, useState } from "react";
import { GetAllTodo, deleteTodo, editTodo } from "./Functions";

function TodoList({ accessToken, id, refreshTodoList }) {
  const [edit, setEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [todoId, setTodoId] = useState("");

  const fetchData = async () => {
    const data = await GetAllTodo(accessToken, id);
    setTodos(data);
  };

  console.log(todos);
  useEffect(() => {
    fetchData();
  }, [refreshTodoList]);

  const handleDelete = async (todoId) => {
    const data = await deleteTodo(id, accessToken, todoId);

    setTodos(data);
  };
  const handleTodoId = (EditTodoId) => {
    setTodoId(EditTodoId);
    setEdit(!edit);
  };

  const handleEdit = async () => {
    const data = await editTodo(id, title, description, todoId, accessToken);
    setEdit(!edit);
    setTodos(data);
  };
  const content = todos?.map((todo) => {
    return (
      <li
        key={todo._id}
        className="flex flex-col justify-center items-center flex-wrap bg-gray-100 w-56 break-words p-2 border rounded-lg shadow-lg"
      >
        <h3 className="font-bold">{todo.title}</h3>
        <p className=" break-words">{todo.description} </p>
        <div className="flex gap-4 p-3">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => handleTodoId(todo._id)}
          >
            Edit
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => handleDelete(todo._id)}
          >
            Remove
          </button>
        </div>
      </li>
    );
  });
  return (
    <div className="w-full p-2 m-2">
      <ul className="flex gap-4 flex-wrap ">
        {!edit ? (
          content
        ) : (
          <li className="flex flex-col justify-center items-center flex-wrap bg-gray-100 w-56 break-words p-2 border rounded-lg shadow-lg">
            <input
              type="text"
              placeholder=" Title"
              className=" m-2"
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder=" Descrption"
              className=" p-2 m-2"
              onChange={(e) => setDiscription(e.target.value)}
            />

            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              onClick={handleEdit}
            >
              Save
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
