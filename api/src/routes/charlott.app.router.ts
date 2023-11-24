import express from "express";
import auth from "../controllers/charlott/app/auth.controller";
import getConsumerList from "../controllers/charlott/app/getConsumerList.controller";

const charlottAppRouter = express.Router();

charlottAppRouter.post("/auth", auth);
charlottAppRouter.post("/getConsumerList", getConsumerList);

export default charlottAppRouter;
