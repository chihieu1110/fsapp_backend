import express from "express";
import cors from "cors";
import { CONNECT_DB, CLOSE_DB } from "~/config/mongodb";
import AsyncExitHook from "async-exit-hook";
import { env } from "./config/environment";
import { APIs_V1 } from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { corsOptions } from "./config/cors";

const START_SERVER = () => {
  const app = express();
  //xu ly cors
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use("/v1", APIs_V1);

  app.use(errorHandlingMiddleware);

  if (env.BUILD_MODE === "production") {
    app.listen(process.env.PORT, () => {
      console.log(
        `Hi Production ${env.AUTHOR},Server is running at ${process.env.PORT}`
      );
    });
  } else {
    app.listen(env.LOCAL_DEV_APP_PORT, env.LOCAL_DEV_APP_HOST, () => {
      console.log(
        `Hi Local ${env.AUTHOR},Server is running at http://${env.LOCAL_DEV_APP_HOST}:${env.LOCAL_DEV_APP_PORT}`
      );
    });
  }

  AsyncExitHook(() => {
    console.log("closing db");
    CLOSE_DB();
    console.log("closed db");
  });
};

(async () => {
  try {
    await CONNECT_DB();
    START_SERVER();
  } catch (error) {
    console.error("Error starting the server", error);
    process.exit(0);
  }
})();
// CONNECT_DB()
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .then(START_SERVER())
//   .catch((error) => {
//     console.error("Error starting the server", error);
//     process.exit(0);
//   });
