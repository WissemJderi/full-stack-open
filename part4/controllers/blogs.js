const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blog);
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({ error: "userId missing or not valid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();
  response.status(201).json(result);
});

blogsRouter.delete("/:id", async (request, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "blog not found" });
    }

    if (blog.user.toString() !== decodedToken.id) {
      return response.status(403).json({ error: "permission denied" });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (err) {
    console.error("Error deleting blog:", err);
    if (err.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    }
    response.status(500).json({ error: "Internal server error" });
  }
});

blogsRouter.patch("/:id", async (request, response) => {
  const { likes } = req.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    { likes },
    { new: true, runValidators: true, context: "query" },
  );
  if (!updatedBlog) {
    return res.status(404).json({ error: "Blog not found" });
  }
  res.json(updatedBlog);
});

blogsRouter.put("/:id", async (request, response) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(400).json({ error: "user not found" });
    }

    const blog = await Blog.findById(request.params.id);
    if (!blog) {
      return response.status(404).send({ message: "Blog not found" });
    }

    if (blog.user.toString() !== user.id.toString()) {
      return response.status(403).json({
        error: "You are not authorized to update this blog",
      });
    }

    const { likes, author, title, url } = request.body;

    if (likes !== undefined) blog.likes = likes;
    if (author) blog.author = author;
    if (title) blog.title = title;
    if (url) blog.url = url;

    const updatedBlog = await blog.save();

    await updatedBlog.populate("user", "username name");

    response.status(200).json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);

    if (err.name === "JsonWebTokenError") {
      return response.status(401).json({ error: "token invalid" });
    }

    if (err.name === "ValidationError") {
      return response.status(400).json({ error: err.message });
    }

    response.status(500).json({ error: "Internal server error" });
  }
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const comment = request.body.comment;
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  blog.comments.push(comment);
  const newBlog = await blog.save();
  response.json(newBlog);
});
module.exports = blogsRouter;
