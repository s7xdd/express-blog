import { connectDb } from "./src/config/db/db-connect";
import { app } from "./src/config/app/app-config";

import { errorHandler } from "./src/shared/middlewares/error/error-middleware";
import frontEndRoutes from "./src/routes/frontend-router";
import adminRoutes from "./src/routes/admin-router";

app.use("/api/v1", frontEndRoutes);
app.use("/admin/v1", adminRoutes);

app.use(errorHandler);

connectDb().then((res) => {
  console.log(res);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
