import express from "express";
import path from "path";

import { Server } from 'socket.io';
import http from 'http';

require("dotenv").config();

const app = express();

const server = http.createServer(app);
const io = new Server(server);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));



export { app, io, server };
