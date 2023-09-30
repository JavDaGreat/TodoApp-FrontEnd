import React, { useState } from "react";
import TodoFrom from "../components/TodoFrom";
import TodoList from "../components/TodoList";
import { useLocation } from "react-router-dom";
import SignOut from "../components/SignOut";

function Todo() {
  const { state } = useLocation();
  const [refreshTodoList, setRefreshTodoList] = useState(false);

  const refreshTodoListHandler = () => {
    setRefreshTodoList(!refreshTodoList);
  };

  return (
    <>
      {state?.accessToken ? (
        <div className="flex flex-col  items-center h-screen w-full p-2">
          <nav className="self-start m-2 p-2">
            <SignOut />
          </nav>
          <TodoFrom
            accessToken={state.accessToken}
            id={state.id}
            refreshTodoList={refreshTodoListHandler}
          />
          <TodoList
            accessToken={state.accessToken}
            id={state.id}
            refreshTodoList={refreshTodoList}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-bold text-3xl text-center mt-10">Unauthorized</h1>
          <a href="/" className="text-blue-700 hover:underline">
            Back to Login Page
          </a>
        </div>
      )}
    </>
  );
}

export default Todo;
