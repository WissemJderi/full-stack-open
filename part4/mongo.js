const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://asqr43641_db_user:${password}@cluster0.5e9dlpf.mongodb.net/blogs?appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model("Blog", blogSchema);

const blog = new Blog({
  title: "This is the second blog",
  author: "Wissem",
  url: "https://fullstackopen.com/en/part4/structure_of_backend_application_in…",
  likes: 6,
});

blog.save().then((result) => {
  console.log("blog saved!");
  mongoose.connection.close();
});

Blog.find({}).then((result) => {
  result.forEach((blog) => {
    console.log(blog);
  });
  mongoose.connection.close();
});
