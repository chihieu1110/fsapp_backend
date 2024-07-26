import express from "express";
import { StatusCodes } from "http-status-codes";
import { boardRoute } from "~/routes/v1/boardRoute";
import { columnRoute } from "~/routes/v1/columnRoute";
import { cardRoutes } from "~/routes/v1/cardRoute";

const Router = express.Router();
Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APi v1 is ready to use" });
});

Router.use("/boards", boardRoute);
Router.use("/columns", columnRoute);
Router.use("/cards", cardRoutes);

export const APIs_V1 = Router;
