const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app.js");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Why FSO is great",
    author: "Author 1",
    url: "http://example.com/1",
    likes: 1,
  },
  {
    title: "Second blog",
    author: "Author 2",
    url: "http://example.com/2",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, initialBlogs.length);
});

test("the unique identifier property of the blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  assert.ok(response.body[0].id);
  assert.strictEqual(response.body[0]._id, undefined);
});

test("making an HTTP POST request to the /api/blogs URL successfully creates a new blog post", async () => {
  const newBlog = {
    title: "Why FSO is great",
    author: "Wissem",
    url: "https://fullstackopen.com/en/part4/testing_the_backend#exercises-4-8-4-12",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogs = await Blog.find({});
  assert.strictEqual(blogs.length, initialBlogs.length + 1);

  const titles = blogs.map((blog) => blog.title);
  assert(titles.includes("Why FSO is great"));
});

test("delete a blog", async () => {
  const initBlogs = await Blog.find({});
  const targetBlog = initBlogs[0];

  await api.delete(`/api/blogs/${targetBlog._id.toString()}`).expect(204);

  const blogsAfterDeletion = await Blog.find({});
  assert.strictEqual(blogsAfterDeletion.length, initBlogs.length - 1);

  const titles = blogsAfterDeletion.map((b) => b.title);
  assert(!titles.includes(targetBlog.title));
});

test("update the number of likes", async () => {
  const blogsAtStart = await Blog.find({});
  const blogToUpdate = blogsAtStart[0];

  const updatedData = { likes: blogToUpdate.likes + 10 };

  const response = await api
    .patch(`/api/blogs/${blogToUpdate._id.toString()}`)
    .send(updatedData)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 10);

  const blogAtEnd = await Blog.findById(blogToUpdate._id);
  assert.strictEqual(blogAtEnd.likes, blogToUpdate.likes + 10);
});
after(async () => {
  await mongoose.connection.close();
});
