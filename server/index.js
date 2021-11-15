import dotenv from "dotenv";
dotenv.config();
import express from "express";

import pinRoute from "./routes/pins.js";
import userRoute from "./routes/users.js";
import connectDb from "./config/db.js";

connectDb();
const app = express();

// middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

// routes
app.use("/api/pin", pinRoute);
app.use("/api/user", userRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
