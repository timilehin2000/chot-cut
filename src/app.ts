import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/v1", router);

app.all("*", (req, res) => {
  res.status(404).json({
    status: false,
    error: "And Just Like That, You Completely Lost Your Way 😥",
    route: req.originalUrl,
  });
});

export default app;
