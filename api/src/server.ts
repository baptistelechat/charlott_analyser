import chalk from "chalk";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import charlottRouter from "./routes/charlott.app.router";

dotenv.config();

// Express App
const app: Express = express();
const PORT = process.env.API_PORT;

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL as string
    ],
  })
);
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ limit: "50mb" }));
app.use((req: Request, res: Response, next: NextFunction) => {
  const reqColor = (method: string) => {
    switch (method) {
      case "GET":
        return "bgCyan";
      case "POST":
        return "bgGreen";
      case "DELETE":
        return "bgRed";
      case "PATCH":
        return "bgYellow";
      default:
        return "bgWhite";
    }
  };

  console.log(chalk[reqColor(req.method)](req.method, req.path));
  next();
});

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ msg: "🌍 Welcome to the app !" });
});

app.use("/api/charlott/app", charlottRouter);

// Listen requests
app.listen(PORT, () => {
  console.log(
    chalk.yellow(`⚡️[server]: Server is running at http://localhost:${PORT}`)
  );
});
