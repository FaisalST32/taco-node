import mongo from "mongodb";
const connStr = "mongodb://localhost:27017";
const dbName = "inversify-express-example";
export class MongoDBConnection {
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
        mongo.MongoClient.connect(connStr, (err, client) => {
            this.db = client.db(dbName);
            this.isConnected = true;
            return result(err, this.db);
        });
    }
}
MongoDBConnection.isConnected = false;
//# sourceMappingURL=connection.js.map