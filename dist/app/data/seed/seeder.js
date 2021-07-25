var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PassionModel } from "../models/profile.model";
const seedPassions = () => __awaiter(void 0, void 0, void 0, function* () {
    const dataSeeded = yield PassionModel.estimatedDocumentCount();
    if (dataSeeded)
        return;
    const passions = [
        {
            text: "Sky Diving",
        },
        {
            text: "Music",
        },
        {
            text: "Skiing",
        },
        {
            text: "Painting",
        },
        {
            text: "Gaming",
        },
        {
            text: "Dogs",
        },
        {
            text: "Cats",
        },
    ];
    return PassionModel.collection.insertMany(passions);
});
export const seedData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all([seedPassions()]);
    console.log("data seeded");
});
//# sourceMappingURL=seeder.js.map