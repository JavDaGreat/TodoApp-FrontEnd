import React, { useState } from "react";
import { resetPassword } from "../components/Functions";

function Reset() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showHomeButton, setShowHomeButton] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    setMessage("");
    const data = await resetPassword(token, password);

    if (data.message) {
      setShowHomeButton(true);
      setMessage(data.message);
    } else {
      setMessage("Invalid token or user not exist");
    }
  };
  return (
    <div className="flex h-screen w-full justify-center items-center">
      {!showHomeButton ? (
        <section className="flex w-[30rem] flex-col space-y-10 ">
          <div className="text-center text-4xl font-medium">RESET PASSWORD</div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500">
            <input
              type="text"
              placeholder=" Token"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none p-2"
              onChange={(e) => setToken(e.target.value)}
            />
          </div>

          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 p-2">
            <input
              type="text"
              placeholder="New Password"
              className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p className="text-red-500 text-sm"> {message}</p>

          <button
            className="  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br p-2 font-bold text-white rounded-md mx-2 "
            onClick={handleResetPassword}
          >
            Reset
          </button>
        </section>
      ) : (
        <section className="flex flex-col justify-center items-center">
          <p className="text-green-600 text-lg p-2 m-2 text-center">
            {message}
          </p>
          <a
            href="/"
            className="  bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br p-2 font-bold text-white rounded-md  "
          >
            Back To Login Page
          </a>
        </section>
      )}
    </div>
  );
}
export default Reset;
