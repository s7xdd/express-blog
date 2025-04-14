import express from "express";
import path from "path";

import { Server } from "socket.io";
import http from "http";

import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');


//SOCKET IO
const server = http.createServer(app);
const io = new Server(server);

//Passport JS
app.use(cookieParser("Hello world"));
app.use(
  session({
    secret: process.env.PASSPORT_SECRET_KEY!,
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

let count = 1;
const showlogs = (req: any, res: any, next: any) => {
  console.log("\n==============================");
  console.log(`------------>  ${count++}`);

  console.log(`\n req.session.passport -------> `);
  console.log(req.session.passport);

  console.log(`\n req.user -------> `);
  console.log(req.user);

  console.log("\n Session and Cookie");
  console.log(`req.session.id -------> ${req.session.id}`);
  console.log(`req.session.cookie -------> `);
  console.log(req.session.cookie);

  console.log("===========================================\n");

  next();
};

// app.use(showlogs);





app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

export { app, io, server };
