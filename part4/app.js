const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const logger = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");

const app = express();

const mongoUrl = "mongodb://localhost/bloglist";
mongoose.connect(mongoUrl, { family: 4 });

app.use(express.json());

app.use("/api/blogs", blogsRouter);
