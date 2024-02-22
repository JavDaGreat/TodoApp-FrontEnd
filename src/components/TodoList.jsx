import React from "react";
import { useState, useEffect } from "react";
import { GetAllTodo, deleteTodo, editTodo } from "./Functions";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function TodoList({ accessToken, id, refreshTodoList }) {
  const [open, setOpen] = useState(false);
  const [description, setDiscription] = useState("");
  const [title, setTitle] = useState("");
  const [todoId, setTodoId] = useState("");

  const [todos, setTodos] = useState([]);

  const fetchData = async () => {
    const data = await GetAllTodo(accessToken, id);
    setTodos(data);
  };
  useEffect(() => {
    fetchData();
  }, [refreshTodoList]);

  const handleEditInput = (todoTitle, todoDesc, todoId) => {
    setOpen(true);
    setTitle(todoTitle);
    setDiscription(todoDesc);
    setTodoId(todoId);
  };

  const handleEdit = async () => {
    const data = await editTodo(id, title, description, todoId, accessToken);
    setTodos(data);
    setOpen(false);
  };

  const handleDelete = async (todoId) => {
    const data = await deleteTodo(id, accessToken, todoId);

    setTodos(data);
  };

  const content = todos?.map((todo) => {
    return (
      <li
        key={todo._id}
        className=" flex flex-col flex-wrap justify-center items-center   bg-gray-100   p-2 border rounded-lg shadow-lg "
      >
        <h3 className="font-bold  whitespace-normal ">{todo.title}</h3>
        <p className="whitespace-normal">{todo.description} </p>
        <div className="flex gap-4 p-3">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() =>
              handleEditInput(todo.title, todo.description, todo._id)
            }
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
    <div className="w-full m-4 p-2 flex flex-wrap ">
      <ul className="flex gap-4 flex-wrap ">{content}</ul>

      <Modal open={open} onClose={() => setOpen(false)} center>
        <div className="flex flex-col gap-4 m-4 p-1 bg-gray-200 rounded-md shadow-lg w-96">
          <input
            type="text"
            placeholder=" Title"
            className=" m-2 p-1"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            type="text"
            placeholder=" Descrption"
            className=" p-2 m-2 p h-16"
            onChange={(e) => setDiscription(e.target.value)}
            value={description}
          />

          <button
            type="button"
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm  text-center p-2"
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default TodoList;
