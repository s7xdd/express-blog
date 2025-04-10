import { connectDb } from "./src/config/db/db-connect";
import { app } from "./src/config/app/app-config";

import authRouter from "./src/routes/front-end/auth/auth-router";
import userRouter from "./src/routes/front-end/user/user-router";
import { errorHandler } from "./src/middlewares/error/error-middleware";


app.use("/auth", authRouter);
app.use("/user-details", userRouter);

app.use(errorHandler);

connectDb().then((res) => {
  console.log(res);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
