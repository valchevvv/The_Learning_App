import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import mongoose from "mongoose";
const app = express();
app.use(cors());
dotenv.config();


const port = process.env.PORT || 1337;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";

// Defines stucture model of course //
const CourseModel = mongoose.model("course",{
  courseName:String,
  description:String,
  lessonsCount:Number,
  state:Boolean,
  dateAdded:String,
})

app.use(express.json());

app.use("/courses", async (req,res) => {
    let data = await CourseModel.find({});
    res.json(data);
})


// Get all available courses //
app.use("/changeState", async (req,res) => {
    const id = req.query.id;
    var data = await CourseModel.findOne({_id:id});
    await CourseModel.updateOne({_id:id}, {state:!data.state}).catch((error) => {
        if(error) console.log(error);
    })
    res.status(200);
})

// Adds course to the database //
app.use("/add", (req, res) => {
    const courseName = req.query.courseName;
    const description = req.query.description;
    const lessonsCount = req.query.lessonsCount;
    const dateAdded = req.query.dateAdded;

    const courseModel = new CourseModel({
        courseName:courseName,
        description:description,
        lessonsCount:lessonsCount,
        state:true,
        dateAdded:dateAdded
    });
    courseModel.save();

    res.status(200);
})

// Removes course from the database //
app.use("/remove", (req,res) => {
    const id = req.query.id;
    CourseModel.deleteOne({_id:id}).catch((error) => {
        if(error) console.log(error);
    })

    res.status(200);
})

// Edits already existing course //
app.use("/edit", (req,res) => {
    const id = req.query.id;
    const courseName = req.query.courseName;
    const description = req.query.description;
    const lessonsCount = req.query.lessonsCount;
    const dateAdded = req.query.dateAdded;

    CourseModel.findOneAndUpdate({"_id":id}, {courseName:courseName, description:description, lessonsCount:lessonsCount, dateAdded:dateAdded}).catch((error) => {
        if(error) console.log(error);
    })

    res.status(200);
})

// Runs the back-end //
app.listen(port, () => {
  console.log(`Back-end is running on port: ${port}`);
  try{
    mongoose.connect(DATABASE_URL);
    console.log("Database connected successfully !");
  }catch(error){
    console.log(error);
  }
})