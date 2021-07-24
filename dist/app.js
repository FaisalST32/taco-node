"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const inversify_config_1 = __importDefault(require("./inversify.config"));
const inversify_express_utils_1 = require("inversify-express-utils");
require("./app/controllers/user.controller");
require("./app/controllers/profiles.controller");
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const swagger = __importStar(require("swagger-express-ts"));
const seeder_1 = require("./app/data/seed/seeder");
const app = express_1.default();
let server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.default, null, { rootPath: "/api" }, app);
server.setConfig((app) => {
    app.use(body_parser_1.default.urlencoded({
        extended: true,
    }));
    app.use(body_parser_1.default.json());
    app.use(swagger.express({
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
    }));
    app.use("/api-docs/swagger", express_1.default.static("swagger"));
    app.use("/api-docs/swagger/assets", express_1.default.static("node_modules/swagger-ui-dist"));
});
let appConfigured = server.build();
let dbConnection = "mongodb+srv://superadmin:31415926535@Db@taco.g9uoi.mongodb.net/taco";
// let dbConnection = "mongodb://localhost:27017/taco";
mongoose_1.default
    .connect(dbConnection, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(() => seeder_1.seedData())
    .then(() => {
    let serve = appConfigured.listen(3000, () => console.log(`App running on ${serve.address().port}`));
});
//# sourceMappingURL=app.js.map