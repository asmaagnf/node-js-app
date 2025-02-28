//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));


//placeholders for added task
var task = ["buy a new udemy course", "practise with kubernetes"];
//placeholders for removed task
var complete = ["finish reading the book"];


//post route for adding new task 
app.post("/addtask", function (req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    task.push(newTask);
    res.redirect("/");
});


app.post("/removetask", function (req, res) {
    var completeTask = req.body.check;

    if (!completeTask) {
        return res.redirect("/"); // No tasks selected, just refresh
    }

    // Ensure completeTask is an array
    if (!Array.isArray(completeTask)) {
        completeTask = [completeTask]; // Convert single selection to array
    }

    completeTask.forEach(taskName => {
        const index = task.indexOf(taskName);
        if (index !== -1) {
            task.splice(index, 1);
            complete.push(taskName);
        }
    });

    res.redirect("/");
});


//render the ejs and display added task, completed task
app.get("/", function (req, res) {
    res.render("index", { task: task, complete: complete });
});


//set app to listen on port 3000
app.listen(3000, function () {
    console.log("server is running on port http://localhost:" + port);
});