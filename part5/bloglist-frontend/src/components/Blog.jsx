import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [display, setDisplay] = useState(false);
  const { user, userDispatch } = useContext(UserContext);

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
          {user.name === blog.user.name && (
            <button
              onClick={() => {
                handleRemove(blog.id, blog.title, blog.author);
              }}
            >
              remove
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
