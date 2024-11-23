import { BlogCard } from "./BlogCard";
import { Appbar } from "./NavBar";
export const Blogs = () => {
  return (
    <div>
      <Appbar></Appbar>
    <div className="flex flex-col items-center  min-h-screen">
      <BlogCard
        authorName="sexa"
        title="babyshark"
        publishedDate="Sep 9 2024"
        content="wvjqdwqkdbkwqkdwkqjdbwqjkdbwjqkdbkqdqkjdddddddddddddqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq dwqffwqqfwwqfqwwqfwqfwqfwqfq qwdwqdqwdqwdqwdqwwwwwwwwwwwwwwwwwwww"
      />
      <BlogCard
        authorName="sexa"
        title="babyshark"
        publishedDate="Sep 9 2024"
        content="wvjqdwqkdbkwqkdwkqjdbwqjkdbwjqkdbkqdqkjdddddddddddddqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq dwqffwqqfwwqfqwwqfwqfwqfwqfq qwdwqdqwdqwdqwdqwwwwwwwwwwwwwwwwwwww"
      />
      <BlogCard
        authorName="sexa"
        title="babyshark"
        publishedDate="Sep 9 2024"
        content="wvjqdwqkdbkwqkdwkqjdbwqjkdbwjqkdbkqdqkjdddddddddddddqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq dwqffwqqfwwqfqwwqfwqfwqfwqfq qwdwqdqwdqwdqwdqwwwwwwwwwwwwwwwwwwww"
      />
    </div>
    </div>
  );
};
