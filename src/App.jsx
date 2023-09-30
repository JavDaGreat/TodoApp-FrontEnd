import { useState } from "react";
import Authentication from "./Pages/Authentication";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todo from "./Pages/Todo";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
