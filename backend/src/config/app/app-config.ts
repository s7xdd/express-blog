import express from "express";
import path from "path";

import { errorHandler } from "../../shared/middlewares/error/error-middleware";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

export { app };
