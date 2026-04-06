import express from "express";
import rateRouter from "./controllers/rate.controller";

const app = express();

app.use(express.json());
app.use("/rates", rateRouter);

export default app;