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
      <h1 className="text-4xl text-center m-6">blogs app</h1>

      <div className="border-4 border-[#6F8F72] m-6 p-10">
        <h2 className="text-center text-2xl font-semibold">create new</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        {blogs &&
          blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <div className="flex flex-row gap-2">
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user.name}
                  handleLike={() => handleLike(blog)}
                  handleRemove={handleRemove}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
