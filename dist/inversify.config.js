import { Container } from "inversify";
import { Repository } from "./app/data/repository";
import { ProfileService } from "./app/services/profile.service";
export const TYPES = {
    Repository: "Repository",
    ProfileService: Symbol("ProfileService"),
};
const container = new Container();
container.bind(TYPES.Repository).to(Repository).inSingletonScope();
container
    .bind(TYPES.ProfileService)
    .to(ProfileService)
    .inRequestScope();
export default container;
//# sourceMappingURL=inversify.config.js.map