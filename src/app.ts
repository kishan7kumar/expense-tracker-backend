import express from "express";
import createHttpError from "http-errors";
import expenseRouter from "./routes/expenses";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import { DB, PORT, clientURL } from "./config";
import { errorHandler } from "./middleware/errorHandler";
import { Socket } from "socket.io";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "*",
  })
);

app.use("/expenses", expenseRouter);

app.use(() => {
  throw createHttpError(404, "Not found");
});

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connected successfully to MongoDB...");
  })
  .catch(() => {
    throw createHttpError(501, "Unable to connect to MongoDB!!!");
  });

app.set("port", PORT);

let http = require("http").Server(app);

declare global {
  var io: Socket;
}
global.io = require("socket.io")(http, {
  cors: {
    origin: clientURL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket: any) {
  console.log("User Connected....");
});

const server = http.listen(PORT, function () {
  console.log("listening on port" + PORT);
});

app.use(errorHandler);
