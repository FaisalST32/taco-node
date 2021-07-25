// import express from "express";
//
// const app = express();
//
// app.listen(3000, () => {
//   console.log("listening on 3000");
// });
//
// app.get("/home", (req, res) => {
//   res.status(200).send("hello boy");
// });

import "reflect-metadata";
import express from "express";
import container from "./inversify.config";
import { InversifyExpressServer } from "inversify-express-utils";

import "./app/controllers/user.controller";
import "./app/controllers/profiles.controller";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as swagger from "swagger-express-ts";
import { seedData } from "./app/data/seed/seeder";
import dotenv from "dotenv";

dotenv.config();
console.log(process.env.TEST_VAR);

const app = express();

let server = new InversifyExpressServer(
  container,
  null,
  { rootPath: "/api" },
  app
);

server.setConfig((app) => {
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(
    swagger.express({
      definition: {
        info: {
          title: "TacoAPI",
          version: "1.0",
        },
        externalDocs: {
          url: "My url",
        },
        // Models can be defined here
      },
    })
  );
  app.use("/api-docs/swagger", express.static("swagger"));
  app.use(
    "/api-docs/swagger/assets",
    express.static("node_modules/swagger-ui-dist")
  );
});

let appConfigured = server.build();
let dbConnection = process.env.MONGO_CONNECTION_STRING;
// let dbConnection = "mongodb://localhost:27017/taco";
mongoose
  .connect(dbConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => seedData())
  .then(() => {
    let serve: any = appConfigured.listen(process.env.PORT || 3000, () =>
      console.log(`App running on ${serve.address().port}`)
    );
  });
