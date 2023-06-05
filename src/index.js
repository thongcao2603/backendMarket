import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB";
import authRouter from "./routes/authRoute";
import categoryRouter from "./routes/categoryRoute";
import productRouter from "./routes/productRoute";
import bodyParser from "body-parser";
const app = express();
const port = process.env.PORT || 8080;

connectDB();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/product", productRouter);

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
