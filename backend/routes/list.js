const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// It will add task to the Email through POST method
// POST: localhost:3000/api/v2/addTask

router.post("/addTask", async (req, res) => {
    try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const list = new List({ title, body, user: existingUser });
        await list.save().then(() => res.status(200).json({ list }));
        existingUser.list.push(list);
        existingUser.save();
    }
    } catch (error) {
    console.error(error);
    }

});


// updateTask 
// PUT: localhost:3000/api/v2/updateTask
// This will update the task through PUT method by putting an ID.
// use mongoDB list database ID

router.put("/updateTask/:id", async (req, res) => {
    try {
    const { title, body, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        const list =await List.findByIdAndUpdate(req.params.id, { title, body });
        list.save().then(() => res.status(200).json({ message: "Task Updated" }));
    }
    } catch (error) {
    console.error(error);
    }

});


// delete
// add some array by the POST method (addTask) then delete by ID
// DELETE: localhost:3000/api/v2/deleteTask

router.delete("/deleteTask/:id", async (req, res) => {
    try {
    const { email } = req.body;
    const existingUser = await User.findOneAndUpdate({ email }, { $pull: { list: req.params.id } });
    if (existingUser) {
        await List.findByIdAndDelete(req.params.id).then(() => res.status(200).json({ message: "Task Deleted" }));
    };
    } catch (error) {
    console.error(error);
    }
});


// get Task
// GET: localhost:3000/api/v2/getTask/user ID from MongoDB

router.get("/getTask/:id", async (req, res) => {
    const lists = await List.find({ user: req.params.id }).sort({createdAt: -1 });
    if (lists.length !== 0) {
       res.status(200).json({ list: lists });
    }
    else {
        res.status(200).json({"message": "No Task"})
    }
});




module.exports = router;  