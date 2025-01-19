import express from "express";

//for env variables
import "dotenv/config";
const PORT = process.env.PORT;

import userRouter from "./routes/user.js";

const app = express();

//body parser middleware
app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
