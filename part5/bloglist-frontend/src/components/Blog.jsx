import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div
      style={{ border: "2px solid black", padding: "10px 5px", margin: "5px" }}
    >
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

export default Blog;
