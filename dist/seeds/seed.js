import { Thought } from '../models/index.js';
import db from '../config/connection.js';
const thoughts = [
    {
        thoughtText: "Just started learning MongoDB!",
        username: "JaneDoe123",
        reactions: [
            {
                reactionBody: "Same here!",
                username: "JohnDoe123"
            }
        ]
    }
];
const seedThoughts = async () => {
    try {
        await db();
        await Thought.insertMany(thoughts);
        console.log('Seeding successful!');
    }
    catch (err) {
        console.error(`Error: `, err);
    }
};
seedThoughts();
//# sourceMappingURL=seed.js.map