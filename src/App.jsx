import { useState } from "react";
import Authentication from "./Pages/Authentication";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Todo from "./Pages/Todo";
import Reset from "./Pages/Reset";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
  },
  {
    path: "/todo",
    element: <Todo />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
]);

function App() {
  const [count, setCount] = useState(0);

  return <RouterProvider router={router} />;
}

export default App;
