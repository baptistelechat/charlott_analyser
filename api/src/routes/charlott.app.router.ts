import express from "express";
import getConsumerList from "../controllers/charlott/app/getConsumerList.controller";
import getSessionToken from "../controllers/charlott/app/getSessionToken.controller";
import testAppRoute from "../controllers/charlott/app/testAppRoute.controller";

const charlottAppRouter = express.Router();

charlottAppRouter.get("/", testAppRoute);

charlottAppRouter.post("/getSessionToken", getSessionToken);
charlottAppRouter.post("/getConsumerList", getConsumerList);

export default charlottAppRouter;
