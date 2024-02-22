import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp, forgetPassword } from "../components/Functions";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function Authentication() {
  const [needAccount, setNeedAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [forgetEmail, setForgetEmail] = useState("");
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
    if (!username || !password || !email) {
      setMessage("You need to fil every section to create a account");
    } else {
      const data = await signUp(username, password, email);
      console.log(data);
      if (data.username) {
        setEmail("");
        setPassword("");
        setUsername("");
        setSuccess(
          `User : ${data.username} has been created click below to login`
        );
      } else if (data.message) {
        setMessage("User already exist");
      } else {
        setMessage("ERROR TRY LATER");
      }
    }
  };

  const handleForgetPasswordSendEmail = async () => {
    setMessage("");
    setSuccess("");
    const data = await forgetPassword(forgetEmail);
    if (data.message) {
      setSuccess("Close this window and check your email");
    } else {
      setMessage("User dose not exist");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full justify-evenly items-center   ">
      <header>
        <h1 className="text-3xl p-1 m-1 font-bold text-center">
          Welcome to TaskHub
        </h1>
        <p className="text-md p-2 mb-4 text-center text-gray-500">
          Your Ultimate Task Management Solution
        </p>
      </header>
      {!needAccount ? (
        <section className="flex w-[30rem] flex-col space-y-10">
          <div className="text-center text-4xl font-medium">Log In</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder=" Username"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none p-2"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 p-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
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
            onClick={() => {
              setOpen(true), setSuccess(""), setSuccess("");
            }}
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
              value={username}
            />
          </div>
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="password"
              placeholder="Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="email"
              placeholder="Email"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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

      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setMessage(""), setSuccess("");
        }}
        center
      >
        <div className="flex flex-col gap-2 m-2 p-2 ">
          <p>To reset your Password you need to entre your Email </p>
          <input
            type="text"
            placeholder=" Email"
            className=" m-2 p-1 border border-gray-300"
            id="Email"
            onChange={(e) => setForgetEmail(e.target.value)}
            value={forgetEmail}
          />

          <button
            className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br px-8 py-2  font-bold m-auto rounded"
            onClick={handleForgetPasswordSendEmail}
          >
            Reset Password
          </button>
          <div>
            <p className="text-red-600 text-sm">{message}</p>
            <p className="text-green-600 text-sm">{success}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Authentication;
