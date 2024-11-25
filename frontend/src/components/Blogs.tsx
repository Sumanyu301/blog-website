import { BlogCard } from "./BlogCard";
import { Appbar } from "./NavBar";
import { useBlogs } from "../hooks";
export const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }
  return (
    <div>
      <Appbar></Appbar>
      <div className="flex flex-col items-center  min-h-screen">
        {blogs.map((blog) => (
          <BlogCard
            id={blog.id}
            authorName={blog.author.name || "ANONYMOUS"}
            title={blog.title}
            publishedDate="Sep 9 2024"
            content={blog.content}
          />
        ))}
      </div>
    </div>
  );
};
