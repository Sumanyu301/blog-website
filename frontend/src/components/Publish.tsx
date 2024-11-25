import axios from "axios";
import { Appbar } from "./NavBar";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handlePublish = async (event:any) => {
    event.preventDefault(); // Prevents default form submission behavior

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate(`/blog/${response.data.id}`); // Redirects to the new blog
    } catch (error) {
      console.error("Failed to publish blog:", error);
      alert("Something went wrong while publishing the blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Appbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Publish Your Blog</h1>
        <form
          onSubmit={handlePublish}
          className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              type="text"
              placeholder="Enter the blog title"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Content
            </label>
            <textarea
              onChange={(e) => setContent(e.target.value)}
              id="content"
              rows={6}
              placeholder="Write your blog content here"
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            ></textarea>
          </div>
          <button
            type="submit" // Submits the form
            className="w-full py-2 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};
