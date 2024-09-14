import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var blog = "";

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true }));

//This connects to the css file in the public directory
app.use(express.static('public'))

//This points to the public directory
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//Have to add a little more to this About Me section
app.get("/", (req, res) => {
  res.send("<h1>About Me</h1><p>My name is Morgan</p>");
});

//Maybe change this to another type of page
app.get('/about', function(req, res) {
  res.render('views/partials/pages/about.ejs');
})

//Output on the terminal to show server is up.
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
