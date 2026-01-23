import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url, likes: 0 });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <label>
        title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="title"
        />
      </label>
      <label>
        author
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          placeholder="author"
        />
      </label>
      <label>
        url
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          placeholder="url"
        />
      </label>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
