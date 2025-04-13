import { connectDb } from "./src/config/db/db-connect";

import { app, io, server } from "./src/config/app/app-config";

import { errorHandler } from "./src/shared/middlewares/error/error-middleware";
import frontEndRouter from "./src/app/frontend-router";
import adminRouter from "./src/app/admin-router";
import socketIoRouter from "./src/app/socket-io-router";

app.use("/api/v1", frontEndRouter);
app.use("/admin/v1", adminRouter);





//SOCKET IO
app.use("/socket-io", socketIoRouter)

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
    console.log('message: ' + msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});





app.use(errorHandler);

connectDb().then((res) => {
  console.log(res);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
