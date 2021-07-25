import { PassionModel } from "../models/profile.model";
const seedPassions = async () => {
    const dataSeeded = await PassionModel.estimatedDocumentCount();
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
};
export const seedData = async () => {
    await Promise.all([seedPassions()]);
    console.log("data seeded");
};
//# sourceMappingURL=seeder.js.map