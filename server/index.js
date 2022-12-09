import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import multer from "multer";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRouts from "./routes/posts.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";

// configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//dotenv config
dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(helmet());
app.use(
  helmet.crossOriginResourcePolicy({
    policy: "cross-origin",
  })
);
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  fillename: (req, file, cb) => {
    cb(nul, file.orginalname);
  },
});

const upload = multer({ storage });

// Routes with files
app.post("/auth/register", upload.single("picutre"), register);
app.post("/posts", verifyToken, upload.single("picutre"), createPost);

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRouts);

// Mongo db database connecting
const PORT = process.env.PORT || 4040;
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}`);
      //Add data one time
      // User.insertMany(users);
      // Post.insertMany(posts);
    });
  })
  .catch((err) => {
    console.log(`Not connect: ${err.message}`);
  });
