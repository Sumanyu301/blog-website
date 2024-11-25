import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  authorName,
  title,
  content,
  publishedDate,
  id,
}: BlogCardProps) => {
  return (
    
      <div className="w-[45%] bg-white p-8 border-b-2 m-4 cursor-pointer">
        <div className="flex items-center gap-1">
          <div className="inline-flex items-center justify-center w-7 h-7 text-sm text-white bg-slate-700 rounded-full">
            {authorName[0]}
          </div>
          <div className="text-gray-800 font-medium">{authorName}</div>
          <div className="text-slate-400">•</div>
          <div className="text-slate-400">{publishedDate}</div>
        </div>
        <Link to={`/blog/${id}`}>
        <div className="font-extrabold text-2xl mt-2">{title}</div>
        </Link>
        <div className="mt-2 text-gray-700 break-words">
          {content.slice(0, 150) + " ......."}
        </div>
        <div className=" text-slate-400 mt-4">
          {Math.ceil(content.length / 100) + "minutes"}
        </div>
      </div>

  );
};
