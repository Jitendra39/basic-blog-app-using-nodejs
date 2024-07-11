const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const mongoose = require("mongoose");
const userRoute = require('./routes/user');
const blogRoute = require("./routes/blog.js");
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog.js');
const { checkForAuthenticationCookie } = require('./middleware/authentication');

const port = process.env.PORT || 8000;

//$env:MONGO_URL = "mongodb://localhost:27017/boggers"

//'mongodb://localhost:27017/boggers'
mongoose.connect(process.env.MONGO_URL).then(() =>{
    useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 45000 
  console.log("mongodb is connected")
})

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false}))
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve('./public')))

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.get('/', async(req,res) =>{

  const allBlogs = await Blog.find({})

  res.render("home",{
    user: req.user,
    blogs: allBlogs
  });
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
