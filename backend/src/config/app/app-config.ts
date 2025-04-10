import express from "express";

import { errorHandler } from "../../shared/middlewares/error/error-middleware";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export { app };
