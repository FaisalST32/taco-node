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

import "./app/controllers/profile.controller";
import bodyParser from "body-parser";

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
});

let appConfigured = server.build();
let serve: any = appConfigured.listen(3000, () =>
  console.log(`App running on ${serve.address().port}`)
);
