import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.post("/today", (req, res) => {
    console.log(req.body);
    res.render("index.ejs");
});




app.post("/work", (req, res) => {
    res.render("index.ejs");
});

let todayTask = [];
let deprecatedTask = [];

app.post("/todays", (req, res) => {
    console.log(req.body);
    todayTask.push(req.body['newTasks']);
    res.redirect("/tasks");
    //res.render("index.ejs" , {todayTasks: todayTask ,deprecatedTasks : deprecatedTask} );
});

app.get("/tasks", (req, res) => {
    res.render("index.ejs", { todayTasks: todayTask, deprecatedTasks: deprecatedTask });
});


app.post("/post1", (req, res) => {
 //const isChecked = req.body.isChecked === 'true'; // Convert string to boolean
 console.log(req.body);

 let currlist=[];
 const toBeDeleted = req.body['hid'];

for(let i=0;i<todayTask.length;i++){
    if(i!=toBeDeleted){
        currlist.push(todayTask[i]);
    }

    
}

deprecatedTask.push(todayTask[toBeDeleted]);

todayTask=currlist;
currlist=[];
res.redirect("/post11");
//res.render("index.ejs" , {todayTasks: todayTask , deprecatedTasks: deprecatedTask} );
 
});

app.get("/post11", (req, res) => {
    res.render("index.ejs", { todayTasks: todayTask, deprecatedTasks: deprecatedTask });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});