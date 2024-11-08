import { Link } from "react-router-dom";
import { useState } from "react";
import { signupInput } from "@uynamus/medium-common";

export const SignUp = () => {
  const [postInputs, setPostInputs] = useState<signupInput>({
    email: "",
    name: "",
    password: "",
  });

//   If the user types "john@example.com" into the email field:
// The name would be "email".
// The value would be "john@example.com".
// The postInputs state updates to include { email: "john@example.com", name: "", password: "" }.

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-screen">
        <div className="flex w-full md:w-1/2 p-4 justify-center items-center">
          <div className="w-[80%] md:w-[60%]">
            <div className="text-4xl font-extrabold text-center">
              Create an account
            </div>
            <div className="text-gray-500 text-lg mt-2 text-center">
              <span>Already have an account?</span>
              <Link to={"/signin"} className="underline ml-2">
                Login
              </Link>
            </div>
            <div className="mt-5">
              <label className="font-medium">Username</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Username"
                className="mt-2 h-10 border border-gray-300 rounded shadow w-full p-4"
                onChange={handleInputChange}
                value={postInputs.name}
              />
            </div>
            <div className="mt-4">
              <label className="font-medium">Email</label>
              <input
                type="email"
                name="email"
                placeholder="abc@example.com"
                className="mt-2 h-10 border border-gray-300 rounded shadow w-full p-4"
                onChange={handleInputChange}
                value={postInputs.email}
              />
            </div>
            <div className="mt-4">
              <label className="font-medium">Password</label>
              <input
                type="password"
                name="password"
                className="mt-2 h-10 border border-gray-300 rounded shadow w-full p-4"
                onChange={handleInputChange}
                value={postInputs.password}
              />
            </div>
            <button className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow mt-4 w-full">
              Sign Up
            </button>
          </div>
        </div>
        <div className="hidden md:flex w-full md:w-1/2 bg-gray-200 p-4 justify-center items-center">
          <div className="w-[75%] text-center">
            <div className="text-3xl font-bold">
              "Don't focus on having a great blog. Focus on producing a blog
              that's great for your readers."
            </div>
            <div className="mt-2 text-lg font-semibold">Brian Clark</div>
            <div className="text-gray-500 font-serif">Serial Entrepreneur</div>
          </div>
        </div>
      </div>
    </>
  );
};
