import { Thought, User } from "../models/index.js";
export const getThoughts = async (_req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    }
    catch (err) {
        console.log(err);
    }
};
// Get thought by Id
export const getThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought by that Id not found' });
        }
        else {
            res.json(thought);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Create a new Thought
export const createThought = async (req, res) => {
    const { thoughtText, username } = req.body;
    const { userId } = req.params;
    try {
        if (!thoughtText || !username) {
            res.status(400).json({ message: 'thoughtText and username is required.' });
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User by that id not found.' });
        }
        const newThought = await Thought.create({
            thoughtText,
            username
        });
        const updatedUser = await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } }, { new: true }).populate('thoughts');
        res.status(201).json({ thought: newThought, user: updatedUser });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update Thought
export const updateThought = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            res.status(404).json({ message: 'Thought does not exist.' });
        }
        res.json(updatedThought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Delete Thought
export const deleteThought = async (req, res) => {
    const { thoughtId, userId } = req.params;
    try {
        const thought = await Thought.findByIdAndDelete(thoughtId);
        if (!thought) {
            res.status(404).json({ message: 'Thought does not exist.' });
        }
        await User.findByIdAndUpdate(userId, { $pull: { thoughts: thoughtId } }, { new: true });
        res.json({ message: 'Thought deleted!' });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Create a new Reaction
export const addReaction = async (req, res) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $push: { reactions: req.body } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: "Thought not found." });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Delete a Reaction
export const removeReaction = async (req, res) => {
    const { thoughtId, reactionId } = req.params;
    try {
        const thought = await Thought.findByIdAndUpdate(thoughtId, { $pull: { reactions: { _id: reactionId } } }, { new: true });
        if (!thought) {
            res.status(404).json({ message: 'Thought does not exist.' });
        }
        res.json(thought);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
//# sourceMappingURL=ThoughtsController.js.map