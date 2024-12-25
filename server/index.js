import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import colors from "colors";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

// call db connection
connectDB();

const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.59.1:5173",
  "http://192.168.217.1:5173",
  "http://192.168.115.237:5173",
  "http://192.168.43.164:5173",
  "http://192.168.154.237:5173",
  "http://169.254.211.9:5173",
  "http://192.168.233.237:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// apis
app.use("/api/v1/user", userRoute);

app.get("/home", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hello i am comming from backend",
  });
});


const logResponse = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (body) {
    console.log(
      `[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`
    );
    console.log("Response:", body);
    originalSend.call(this, body); // Call the original `res.send`
  };

  next();
};

// Use the middleware
app.use(logResponse);


app.listen(port, () => {
  console.log(`Server Listen at PORT: ${port}`.yellow.bgBlue);
});
