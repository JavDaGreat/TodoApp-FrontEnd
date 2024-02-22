const login = async (username, password) => {
  const resp = await fetch("https://todoapp-backend-dglj.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: username, pwd: password }),
  });
  const data = await resp.json();
  return data;
};
const signUp = async (username, password, email) => {
  const resp = await fetch(
    "https://todoapp-backend-dglj.onrender.com/register",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username, pwd: password, email }),
    }
  );
  const data = await resp.json();
  return data;
};

const AddTodo = async (id, accessToken, title, description) => {
  const resp = await fetch("https://todoapp-backend-dglj.onrender.com/todo", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, todo: { title, description } }),
  });
  const data = await resp.json();
  return data;
};

const GetAllTodo = async (accessToken, id) => {
  const resp = await fetch(
    `https://todoapp-backend-dglj.onrender.com/todo?id=${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (resp.status === 204) return;
  const data = await resp.json();

  return data;
};
const deleteTodo = async (id, accessToken, todoId) => {
  const resp = await fetch("https://todoapp-backend-dglj.onrender.com/todo", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, todoId }),
  });
  const data = await resp.json();
  return data;
};
const editTodo = async (id, title, description, todoId, accessToken) => {
  const resp = await fetch("https://todoapp-backend-dglj.onrender.com/todo", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, newTodo: { title, description }, todoId }),
  });
  const data = await resp.json();
  return data;
};

const forgetPassword = async (email) => {
  const resp = await fetch("https://todoapp-backend-dglj.onrender.com/forget", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await resp.json();
  return data;
};

const resetPassword = async (token, pwd) => {
  console.log(token, pwd);
  const resp = await fetch("https://todoapp-backend-dglj.onrender.com/reset", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, pwd }),
  });
  const data = await resp.json();
  return data;
};
export {
  AddTodo,
  GetAllTodo,
  deleteTodo,
  editTodo,
  login,
  signUp,
  forgetPassword,
  resetPassword,
};
