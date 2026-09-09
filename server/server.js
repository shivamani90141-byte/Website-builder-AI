import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const app = express();

connectToDatabase().catch((err)=>{
  console.error(`[FATAL] MongoDB connection failed ${err.message}`) 
process.exit(1)
})

// app.use(cors({origin:process.env.ORIGINS.split(","),credentials: true}));
const origins = (process.env.ORIGINS || "").split(",").map((o)=>o.trim()).filter(Boolean)
if (origins.length === 0) {
 throw new Error("ORIGINS is not set")
}
+app.use(cors({origin:origins,credentials: true}));

app.use(cookieParser());
app.use(express.json());

app.get("/",(req,res)=>res.send("Serveris Live!"));
app.use('/api/auth',authRouter)

//centrallized error handler
// app.use((err,_req,res,_next)=>{
//     console.error(`[ERROR] ${err.message}`);
//     res.status(500).json({error: err.message})
// })
app.use((err,_req,res,_next)=>{
    console.error(`[ERROR] ${err.message}`);
    const status = err.status || err.statusCode || 500;
    res.status(status).json({
      error: status === 500 ? "Internal server error" : err.message,
    })
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`Server is running at http://localhost:${port}`)
})