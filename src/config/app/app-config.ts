import express from "express";

import { errorHandler } from "../../middlewares/error-middleware";

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


export { app };
