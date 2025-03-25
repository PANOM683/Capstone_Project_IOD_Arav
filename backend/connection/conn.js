const mongoose = require("mongoose")

const conn = async () => {
    try {
    await mongoose.connect("mongodb://localhost:27017/Users")
    .then(() => {
        console.log("Connected");
    });
} catch (error) {
    res.status(400).json({ message: "NOt Connected" });
};
};
conn();