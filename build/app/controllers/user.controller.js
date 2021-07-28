var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { controller, httpGet, httpPost, request, requestParam, response, } from "inversify-express-utils";
import { ProfileService } from "../services/profile.service";
import { inject } from "inversify";
import { TYPES } from "../../inversify.config";
import { ApiOperationGet, ApiOperationPost, ApiPath, SwaggerDefinitionConstant, } from "swagger-express-ts";
let UserController = class UserController {
    constructor(profileService) {
        this._profileService = profileService;
    }
    async index(req, res) {
        const allUsers = await this._profileService.getAllUsers();
        res.status(200).send(allUsers);
    }
    async getById(id, res) {
        const profileData = await this._profileService.getUserById(id);
        res.status(200).send(profileData);
    }
    async addUser(req, res) {
        const userAdded = await this._profileService.addUser(req.body);
        res.status(201).send(userAdded);
    }
};
__decorate([
    ApiOperationGet({
        description: "Get all users",
        responses: {
            200: {
                description: "Success",
                type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            },
        },
    }),
    httpGet("/"),
    __param(0, request()),
    __param(1, response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
__decorate([
    ApiOperationGet({
        description: "Get user by id",
        responses: {
            200: {
                description: "Success",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            },
        },
        path: "/{id}",
        parameters: {
            path: {
                id: {
                    name: "id",
                    type: "string",
                },
            },
        },
    }),
    httpGet("/:id"),
    __param(0, requestParam("id")),
    __param(1, response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    ApiOperationPost({
        description: "Save a new user",
        responses: {
            200: {
                description: "Success",
                type: SwaggerDefinitionConstant.Response.Type.OBJECT,
            },
        },
        parameters: {
            body: {
                name: "user to add",
                properties: {
                    name: { type: "string" },
                    bio: { type: "string" },
                    age: { type: "number" },
                },
            },
        },
    }),
    httpPost("/"),
    __param(0, request()),
    __param(1, response()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
UserController = __decorate([
    ApiPath({
        path: "/api/profile",
        name: "Profile",
    }),
    controller("/users"),
    __param(0, inject(TYPES.ProfileService)),
    __metadata("design:paramtypes", [ProfileService])
], UserController);
export { UserController };
//# sourceMappingURL=user.controller.js.map