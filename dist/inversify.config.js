"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPES = void 0;
const inversify_1 = require("inversify");
const repository_1 = require("./app/data/repository");
const profile_service_1 = require("./app/services/profile.service");
exports.TYPES = {
    Repository: "Repository",
    ProfileService: Symbol("ProfileService"),
};
const container = new inversify_1.Container();
container.bind(exports.TYPES.Repository).to(repository_1.Repository).inSingletonScope();
container
    .bind(exports.TYPES.ProfileService)
    .to(profile_service_1.ProfileService)
    .inRequestScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map