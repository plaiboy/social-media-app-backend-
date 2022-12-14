import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan'
import multer from 'multer';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path'
import { fileURLToPath } from 'url';
import authRoute from "./routes/auth.js"
import userRoute from "./routes/users.js";
import postRoute from "./routes/posts.js"
import {register } from './controllers/authController.js'
import {createPost}  from "./controllers/postController.js";
import { verifyToken } from './middleware/authmiddleware.js';

// configuration
const __filename  = fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);
dotenv.config()
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    fiename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload= multer({ storage })


// routes with files 
app.post("/auth/register", upload.single("picture", verifyToken ,register));
app.post("/posts", verifyToken, upload.single("picture"),createPost);
// routes

app.use('/auth', authRoute);
app.use("/users ", userRoute);
app.use("/posts", postRoute);

// DATABASE
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() =>{
    app.listen(PORT, () => console.log(`server is running at ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`))
