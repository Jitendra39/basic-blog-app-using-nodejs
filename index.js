const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog.js');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog.js');
const { checkForAuthenticationCookie } = require('./middleware/authentication');

mongoose.set('debug', true);

const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  connectTimeoutMS: 60000,
  socketTimeoutMS: 45000
}).then(() => {
  console.log("MongoDB is connected");
}).catch(err => {
  console.error("Error connecting to MongoDB:", err);
});

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));

app.use('/user', userRoute);
app.use('/blog', blogRoute);

app.get('/', async (req, res) => {
  try {
    const allBlogs = await Blog.find({});
    res.render("home", {
      user: req.user,
      blogs: allBlogs
    });
  } catch (err) {

  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
