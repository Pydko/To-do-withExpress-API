import express from "express";
import mongoose from "mongoose";
import { missionRouter } from "./routes/missionRouter.mjs";
import cors from "cors";

mongoose.connect("mongodb://localhost:27017/mydb")
.then(()=> console.log("DB CONNECTED"))
.catch((err)=> console.log("SOMETHING WENT WRONG",err));

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/todos",missionRouter);



const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT} listening`);
});