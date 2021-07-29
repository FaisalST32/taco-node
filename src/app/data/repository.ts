import mongo from 'mongodb';
import { injectable } from 'inversify';
import { MongoDBConnection } from './connection';

@injectable()
export class Repository {
  public db: mongo.Db;

  constructor() {
    MongoDBConnection.getConnection((connection) => {
      this.db = connection;
    });
  }

  public find<T>(
    collection: string,
    filter: Object,
    result: (error: mongo.MongoError, data: T[]) => void
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
    result: (error: mongo.MongoError, data: T) => void
  ): void {
    this.db
      .collection(collection)
      .find({ _id: new mongo.ObjectID(objectId) })
      .limit(1)
      .toArray((error: mongo.MongoError, find: T[]) => {
        return result(error, find[0]);
      });
  }

  public insert<T>(
    collection: string,
    model: T,
    result: (error: mongo.MongoError, data: mongo.WithId<T>) => void
  ): void {
    this.db
      .collection(collection)
      .insertOne(
        model,
        (error, insert: mongo.InsertOneWriteOpResult<mongo.WithId<T>>) => {
          return result(error, insert.ops[0]);
        }
      );
  }

  public update<T>(
    collection: string,
    objectId: string,
    model: T,
    result: (error: mongo.MongoError, data: T) => void
  ): void {
    this.db
      .collection(collection)
      .updateOne(
        { _id: new mongo.ObjectID(objectId) },
        { $set: model },
        (error: mongo.MongoError, update: mongo.UpdateWriteOpResult) =>
          result(error, model)
      );
  }

  public remove(
    collection: string,
    objectId: string,
    result: (
      error: mongo.MongoError,
      data: mongo.DeleteWriteOpResultObject
    ) => void
  ): void {
    this.db
      .collection(collection)
      .deleteOne({ _id: new mongo.ObjectID(objectId) }, (error, remove) => {
        return result(error, remove);
      });
  }
}
