import express from "express";
import auth from "../controllers/charlott/app/auth.controller";
import getConsumers from "../controllers/charlott/app/getConsumers.controller";

const charlottAppRouter = express.Router();

charlottAppRouter.post("/auth", auth);
charlottAppRouter.post("/consumers", getConsumers);

export default charlottAppRouter;
