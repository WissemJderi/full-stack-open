import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setBlogs, user, handleLike }) => {
  const [display, setDisplay] = useState(false);

  const removeBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.removeBlog(blog.id);
      setBlogs((blogs) => blogs.filter((currBlog) => currBlog.id !== blog.id));
    }
  };
  return (
    <div
      style={{ border: "2px solid black", padding: "10px 5px", margin: "5px" }}
    >
      {blog.title} {blog.author}{" "}
      <button
        onClick={() => {
          setDisplay(!display);
        }}
      >
        {display ? "hide" : "view"}
      </button>
      {display && (
        <>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user.name}</p>
          {user === blog.user.name && (
            <button onClick={removeBlog}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
