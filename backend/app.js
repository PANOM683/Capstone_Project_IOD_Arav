const express = require("express");
const app = express();
require ("./connection/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello"); 
});


app.use("/api/v1", auth);
app.use("/api/v2", list);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})