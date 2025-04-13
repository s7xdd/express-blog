import express from "express";
import path from "path";

import { Server } from 'socket.io';
import http from 'http';


import cookieParser from "cookie-parser";
import session from 'express-session';
import passport from 'passport';



require("dotenv").config();

const app = express();


//SOCKET IO
const server = http.createServer(app);
const io = new Server(server);





//Passport JS
app.use(cookieParser("Hello world"))
app.use(session({
    secret: process.env.PASSPORT_SECRET_KEY!,
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport.initialize());
app.use(passport.session());







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));



export { app, io, server };
