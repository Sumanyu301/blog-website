import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Appbar } from "./NavBar";
export const Blog = () => {
  let { id } = useParams();
  const { blog, loading } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-lg">No blog found</div>
      </div>
    );
  }

  return (
    <>
      <Appbar></Appbar>
      <div className="max-w-4xl mx-auto my-12 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-flex items-center justify-center w-10 h-10 text-lg text-white bg-slate-700 rounded-full">
            {blog.author.name[0]}
          </div>
          <div>
            <div className="text-gray-800 font-medium">{blog.author.name}</div>
          </div>
        </div>
        <p className="text-gray-700 leading-relaxed">{blog.content}</p>
      </div>
    </>
  );
};
