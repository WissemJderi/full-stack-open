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

  const inputStyle = "bg-white px-2";

  const labelStyle = "bg-[#BFC6C4] flex gap-4 p-2 font-semibold";

  return (
    <form className="flex flex-col my-6" onSubmit={addBlog}>
      <label className={labelStyle}>
        title
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className={inputStyle}
        />
      </label>

      <label className={labelStyle}>
        author
        <input
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className={inputStyle}
        />
      </label>

      <label className={labelStyle}>
        url
        <input
          type="text"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          className={inputStyle}
        />
      </label>
      <button
        type="submit"
        className="bg-[#F2A65A] p-2 font-semibold cursor-pointer"
      >
        create
      </button>
    </form>
  );
};

export default BlogForm;
