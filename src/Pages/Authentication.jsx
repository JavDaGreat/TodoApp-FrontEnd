import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../components/Functions";

function Authentication() {
  const [needAccount, setNeedAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");

  const [message, setMessage] = useState("");
  const Navigate = useNavigate();

  const handleLogin = async () => {
    const data = await login(username, password);
    if (data.message) {
      setMessage(data.message);
    } else {
      setMessage("");
      Navigate("/todo", {
        state: { accessToken: data.accessToken, id: data.id },
      });
    }
  };
  const handleInput = () => {
    setNeedAccount(!needAccount);
    setPassword("");
    setUsername("");
    setMessage("");
    setSuccess("");
    setEmail("");
  };

  const handleSignUp = async () => {
    setMessage("");
    setSuccess("");
    const data = await signUp(username, password, email);
    if (data.username) {
      setEmail("");
      setPassword("");
      setUsername("");
      setSuccess(
        `User : ${data.username} has been created click below to login`
      );
    } else {
      setMessage("User already exist");
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
      {!needAccount ? (
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Log In</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder=" Username"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none p-2"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 p-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="text-red-500 text-sm"> {message}</p>

          <button
            className="  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br p-2 font-bold text-white rounded-md mx-2 "
            onClick={handleLogin}
          >
            LOG IN
          </button>

          <a
            href="#"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-400"
          >
            FORGOT PASSWORD?
          </a>

          <p className="text-center text-lg">
            No account?
            <a
              href="#"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline p-1"
              onClick={handleInput}
            >
              Create One
            </a>
          </p>
        </section>
      ) : (
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Sign Up</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder=" Username"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              placeholder="Email"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <p className="text-red-600 text-sm">{message}</p>

          <button
            className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br p-2 font-bold rounded-md text-white mx-2"
            onClick={handleSignUp}
          >
            Sign UP
          </button>
          <p className="text-green-600 text-sm text-center">{success}</p>
          <p className="text-center text-lg">
            Have an account?
            <a
              href="#"
              className="font-medium text-indigo-500 underline-offset-4 hover:underline p-1"
              onClick={handleInput}
            >
              Login here
            </a>
          </p>
        </section>
      )}
    </div>
  );
}

export default Authentication;
