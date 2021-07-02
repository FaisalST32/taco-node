import {
  Db,
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  MongoError,
  ObjectID,
  UpdateWriteOpResult,
  WithId,
} from "mongodb";
import { injectable } from "inversify";
import { MongoDBConnection } from "./connection";

@injectable()
export class Repository {
  public db: Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find<T>(
    collection: string,
    filter: Object,
    result: (error: MongoError, data: T[]) => void
  ): void {
    this.db
      .collection(collection)
      .find(filter)
      .toArray((error, find: T[]) => {
        return result(error, find);
      });
  }

  public findOneById<T>(
    collection: string,
    objectId: string,
    result: (error: MongoError, data: T) => void
  ): void {
    this.db
      .collection(collection)
      .find({ _id: new ObjectID(objectId) })
      .limit(1)
      .toArray((error: MongoError, find: T[]) => {
        return result(error, find[0]);
      });
  }

  public insert<T>(
    collection: string,
    model: T,
    result: (error: MongoError, data: WithId<T>) => void
  ): void {
    this.db
      .collection(collection)
      .insertOne(model, (error, insert: InsertOneWriteOpResult<WithId<T>>) => {
        return result(error, insert.ops[0]);
      });
  }

  public update<T>(
    collection: string,
    objectId: string,
    model: T,
    result: (error: MongoError, data: T) => void
  ): void {
    this.db
      .collection(collection)
      .updateOne(
        { _id: new ObjectID(objectId) },
        { $set: model },
        (error: MongoError, update: UpdateWriteOpResult) => result(error, model)
      );
  }

  public remove(
    collection: string,
    objectId: string,
    result: (error: MongoError, data: DeleteWriteOpResultObject) => void
  ): void {
    this.db
      .collection(collection)
      .deleteOne({ _id: new ObjectID(objectId) }, (error, remove) => {
        return result(error, remove);
      });
  }
}
