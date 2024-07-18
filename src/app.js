import express from "express";
import morgan from "morgan";

// Import routes
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

export default app;
