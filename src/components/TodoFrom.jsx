import React, { useEffect, useState } from "react";
import { AddTodo, GetAllTodo } from "./Functions";

function TodoFrom({ accessToken, id, refreshTodoList }) {
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");
  const [message, setMessage] = useState("");

  const handleAddTodo = async () => {
    if (!title || !description) {
      setMessage("Title or Description can not be empty");
      return;
    }
    const data = await AddTodo(id, accessToken, title, description);
    console.log(data);
    refreshTodoList();

    if (data.message) {
      setTitle("");
      setDiscription("");
    }
  };
  return (
    <div className="flex flex-col lg:w-[40%] w-[80%] justify-center space-y-5 m-2 bg-slate-200 p-4 border rounded shadow-lg  ">
      <h2 className="font-bold text-center">Add Todo</h2>
      <input
        type="text"
        className="border border-gray-300 rounded p-2 mb-2"
        placeholder=" Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <textarea
        className="border border-gray-300 rounded p-2 "
        placeholder=" Description"
        rows="10"
        onChange={(e) => setDiscription(e.target.value)}
        value={description}
      ></textarea>
      <button
        onClick={handleAddTodo}
        className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br px-8 py-2  font-bold m-auto rounded"
      >
        Add
      </button>
      <p className="text-red-600 text-sm">{message}</p>
    </div>
  );
}

export default TodoFrom;
