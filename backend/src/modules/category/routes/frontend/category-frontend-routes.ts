import { Router } from "express";
import { frontendCategoryController } from "../../controller/frontend/category-controller-frontend";

const categoryFrontEndRouter = Router();

categoryFrontEndRouter.get("/", frontendCategoryController.getCategories);
categoryFrontEndRouter.get("/:id", frontendCategoryController.getCategory);

export default categoryFrontEndRouter;
