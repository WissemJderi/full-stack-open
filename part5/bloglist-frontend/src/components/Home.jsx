import Blog from "./Blog";
import BlogForm from "./BlogForm";
import Togglable from "./Togglable";

const Home = ({
  blogs,
  blogFormRef,
  addBlog,
  handleRemove,
  handleLike,
  user,
}) => {
  return (
    <div>
      <h1>create new</h1>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user.name}
              handleLike={() => handleLike(blog)}
              handleRemove={handleRemove}
            />
          ))}
    </div>
  );
};

export default Home;
