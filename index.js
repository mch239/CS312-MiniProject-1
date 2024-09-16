import express from "express";
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

//middleware?
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false }));


//Path definition
const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, "index.ejs");
const homePath = join(__dirname, "views/home.ejs");
const blogDetailsPath = join(__dirname, "views/blogDetails.ejs");

//List of blogs initialized
let blogList = [];

//Have to use res.render as I am using ejs templates instead of raw HTML
app.get("/", (req, res) => {
  res.render(indexPath);
});

//Pages
app.get("/home", (req, res) => {
  res.render(homePath, {
    blogList: blogList,
  });
});


app.post("/home", (req, res) => {
  const blogTitle = req.body.blogTitle;
  const blogDescription = req.body.blogDes;
  blogList.push({
    id: generateID(),
    title: blogTitle,
    description: blogDescription, 
  });
  res.render(homePath, {
    blogList: blogList,
  });
  });

//Details of blog
app.get("/blogDetails/:id", (req, res) => {
  const blogId = req.params.id;
  const blogDetails = blogList.find((blog) => blog.id === parseInt(blogId));
  res.render(blogDetailsPath, {
    blogDetails: blogDetails,
  });
});

//Deleting blogs
app.post("/delete/:id", (req, res) => {
  const blogId = req.params.id;
  blogList = blogList.filter((blog) => blog.id !== parseInt(blogId));
  res.send(
    '<script>alert("Successfully Deleted Blog"); window.location="/home";</script>'
  );
  res.redirect("/home");
});

// Editting blog posts
app.get("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const blogDetails = blogList.find((blog) => blog.id === parseInt(blogId));
  res.render(indexPath, {
    isEdit: true,
    blogDetails: blogDetails,
  });
});


app.post("/edit/:id", (req, res) => {
  const blogId = req.params.id;
  const editBlog = blogList.findIndex((blog) => blog.id === parseInt(blogId));
  if (editBlog === -1) {
    res.send("<h1> What did we do? </h1>");
  }
  const updatedTitle = req.body.blogTitle;
  const updatedDescription = req.body.blogDes;

  const blogTitle = (blogList[editBlog].title = updatedTitle);
  const blogDescription = (blogList[editBlog].description = updatedDescription);
  [...blogList, { blogTitle: blogTitle, blogDescription: blogDescription }];

  res.render(homePath, {
    isEdit: true,
    blogList: blogList,
  });
});


//Output on the terminal to show server is up.
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

function generateID() {
  return Math.floor(Math.random() * 10000);
}



