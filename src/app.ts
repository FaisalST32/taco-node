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

import 'reflect-metadata';
import express from 'express';
import container from './inversify/inversify.config';
import { InversifyExpressServer } from 'inversify-express-utils';

import './app/controllers/auth.controller';
import './app/controllers/profiles.controller';
import './app/controllers/actions.controller';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import * as swagger from 'swagger-express-ts';
import { seedData } from './app/data/seed/seeder';
import dotenv from 'dotenv';
import { logWithTimer } from './app/utils/logging.utils';
import { JwtAuthProvider } from './app/providers/auth.provider';

logWithTimer('starting application');

dotenv.config();

const app = express();

let server = new InversifyExpressServer(
  container,
  null,
  { rootPath: '/api' },
  app,
  JwtAuthProvider
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
          title: 'TacoAPI',
          version: '1.0',
        },
        externalDocs: {
          url: 'My url',
        },
        // Models can be defined here
      },
    })
  );
  logWithTimer('adding swagger config');
  app.use('/api-docs/swagger', express.static('swagger'));
  app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
  );
});

let appConfigured = server.build();
let dbConnection = process.env.MONGO_CONNECTION_STRING;
// let dbConnection = "mongodb://localhost:27017/taco";
logWithTimer('initializing mongoose');
mongoose
  .connect(dbConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    logWithTimer('seeding data');
    return seedData();
  })
  .then(() => {
    logWithTimer('starting server');
    let serve: any = appConfigured.listen(process.env.PORT || 5000, () => {
      logWithTimer(`App running on ${serve.address().port}`);
    });
  });
