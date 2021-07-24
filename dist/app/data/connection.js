"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnection = void 0;
const mongodb_1 = require("mongodb");
const connStr = "mongodb://localhost:27017";
const dbName = "inversify-express-example";
class MongoDBConnection {
    static getConnection(result) {
        if (this.isConnected) {
            return result(this.db);
        }
        else {
            this.connect((error, db) => {
                return result(this.db);
            });
        }
    }
    static connect(result) {
        mongodb_1.MongoClient.connect(connStr, (err, client) => {
            this.db = client.db(dbName);
            this.isConnected = true;
            return result(err, this.db);
        });
    }
}
exports.MongoDBConnection = MongoDBConnection;
MongoDBConnection.isConnected = false;
//# sourceMappingURL=connection.js.map