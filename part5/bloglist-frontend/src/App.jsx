import { useState, useEffect, useRef, useReducer } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router";

// Services
import blogService from "./services/blogs";
import loginService from "./services/login";

// Components
import Notification from "./components/Notification";

import NotificationContext from "./context/NotificationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import UserContext from "./context/UserContext";
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import Home from "./components/Home";
import Users from "./components/Users";
import UserBlogs from "./components/UserBlogs";
import ViewBlog from "./components/ViewBlog";

const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  const createBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const likeBlogMutation = useMutation({
    mutationFn: ({ newBlog, id }) => blogService.addLike(newBlog, id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const removeBlogMutation = useMutation({
    mutationFn: (id) => blogService.removeBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs"]);
    },
  });

  const blogs = result.data;

  // Form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );
  const [user, userDispatch] = useReducer(userReducer, null);

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    createBlogMutation.mutate(blogObject);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      userDispatch({ type: "LOGIN", payload: user });
      setUsername("");
      setPassword("");
    } catch {
      notificationDispatch({
        type: "SET_NOTIFICATION",
        payload: { text: "wrong username of password", error: true },
      });
      setTimeout(() => {
        notificationDispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    userDispatch({ type: "LOGOUT" });
  };

  const handleLike = async (blog) => {
    const newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };
    likeBlogMutation.mutate({ newBlog, id: blog.id });
  };

  const handleRemove = (id, title, author) => {
    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      removeBlogMutation.mutate(id);
    }
  };
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "USER_FROM_LS", payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  if (user === null) {
    return (
      <UserContext.Provider value={{ user, userDispatch }}>
        <NotificationContext.Provider
          value={{ notification, notificationDispatch }}
        >
          <div>
            <h1>log in to application</h1>
            {notification ? <Notification /> : null}

            <form onSubmit={handleLogin}>
              <div>
                <label>
                  username
                  <input
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </label>
              </div>
              <div>
                <label>
                  password
                  <input
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </label>
              </div>
              <button type="submit">login</button>
            </form>
          </div>
        </NotificationContext.Provider>
      </UserContext.Provider>
    );
  }

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      <NotificationContext.Provider
        value={{ notification, notificationDispatch }}
      >
        <BrowserRouter>
          <div>
            <nav
              style={{
                backgroundColor: "gray",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "5px",
              }}
            >
              <Link to="/">blogs</Link>
              <Link to="/users">users</Link>
              <p>
                {`${user.name} logged in`}{" "}
                <button onClick={handleLogout}>logout</button>
              </p>
            </nav>
            <h2>blogs app</h2>
            {notification ? <Notification /> : null}
            {result.isLoading && <p>Loading blogs...</p>}
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  blogs={blogs}
                  blogFormRef={blogFormRef}
                  handleRemove={handleRemove}
                  addBlog={addBlog}
                  user={user}
                />
              }
            />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserBlogs />} />
            <Route
              path="/blogs/:id"
              element={<ViewBlog handleLike={handleLike} />}
            />
          </Routes>
        </BrowserRouter>
      </NotificationContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
