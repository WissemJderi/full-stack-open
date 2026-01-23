import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Link
      to={`/blogs/${blog.id}`}
      className=" border-2 border-[#F2A65A] p-4 my-2 cursor-pointer text-lg font-semibold"
    >
      {blog.title}
    </Link>
  );
};

export default Blog;
