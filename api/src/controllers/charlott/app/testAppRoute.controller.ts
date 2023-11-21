import { Request, Response } from "express";

const testAppRoute = async (req: Request, res: Response) => {
  res.status(200).json({ msg: "🚀 Welcome to Charlott App data !" });
};

export default testAppRoute;
