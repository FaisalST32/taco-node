import mongo from 'mongodb';

const connStr = 'mongodb://localhost:27017';
const dbName = 'inversify-express-example';

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: mongo.Db;

  public static getConnection(result: (connection: any) => void) {
    if (this.isConnected) {
      return result(this.db);
    } else {
      this.connect((error, db: mongo.Db) => {
        return result(this.db);
      });
    }
  }

  private static connect(result: (error: any, db: mongo.Db) => void) {
    mongo.MongoClient.connect(connStr, (err, client) => {
      this.db = client.db(dbName);
      this.isConnected = true;
      return result(err, this.db);
    });
  }
}
