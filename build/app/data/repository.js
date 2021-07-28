var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import mongo from "mongodb";
import { injectable } from "inversify";
import { MongoDBConnection } from "./connection";
let Repository = class Repository {
    constructor() {
        MongoDBConnection.getConnection((connection) => {
            this.db = connection;
        });
    }
    find(collection, filter, result) {
        this.db
            .collection(collection)
            .find(filter)
            .toArray((error, find) => {
            return result(error, find);
        });
    }
    findOneById(collection, objectId, result) {
        this.db
            .collection(collection)
            .find({ _id: new mongo.ObjectID(objectId) })
            .limit(1)
            .toArray((error, find) => {
            return result(error, find[0]);
        });
    }
    insert(collection, model, result) {
        this.db
            .collection(collection)
            .insertOne(model, (error, insert) => {
            return result(error, insert.ops[0]);
        });
    }
    update(collection, objectId, model, result) {
        this.db
            .collection(collection)
            .updateOne({ _id: new mongo.ObjectID(objectId) }, { $set: model }, (error, update) => result(error, model));
    }
    remove(collection, objectId, result) {
        this.db
            .collection(collection)
            .deleteOne({ _id: new mongo.ObjectID(objectId) }, (error, remove) => {
            return result(error, remove);
        });
    }
};
Repository = __decorate([
    injectable(),
    __metadata("design:paramtypes", [])
], Repository);
export { Repository };
//# sourceMappingURL=repository.js.map