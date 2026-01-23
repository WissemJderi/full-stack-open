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
  comments: [String],
});

const Blog = mongoose.model("Blog", blogSchema);

const addCommentsArray = async () => {
  await Blog.updateMany(
    { comments: { $exists: false } },
    { $set: { comments: [] } },
  );
  console.log("Migration complete: added empty comments arrays");
  mongoose.connection.close();
};

addCommentsArray();
