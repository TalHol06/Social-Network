import { User } from '../models/index.js';
// Get all Users
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().populate("thoughts").populate("friends");
        return res.json(users);
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
// Get User by id
export const getUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate("thoughts").populate("friends");
        if (user) {
            return res.json(user);
        }
        else {
            return res.status(404).json({ message: 'User does not exist.' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
// Post a User
export const createUser = async (req, res) => {
    const { username, email, thoughts, friends } = req.body;
    if (!username || !email) {
        return res.status(400).json({ messae: 'Email and Username required.' });
    }
    try {
        const newUser = await User.create({ username, email, thoughts, friends });
        return res.status(201).json(newUser);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
// Update a user
export const updateUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, { $set: req.body }, { runValidators: true, new: true });
        if (!user) {
            return res.status(404).json({ message: 'User with that id not found. ' });
        }
        else if (!user.username || !user.email) {
            return res.status(400).json({ message: 'Username and email required.' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(400).json({ message: err.message });
    }
};
// Delete a user
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User with that Id not found. ' });
        }
        else {
            return res.json({ message: 'User deleted!' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
// Add a friend to a user
export const addFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, { $push: { friends: friendId } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Uer not found." });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
// Remove a friend from a user
export const removeFriend = async (req, res) => {
    const { userId, friendId } = req.params;
    try {
        const user = await User.findByIdAndUpdate(userId, { $pull: { friends: { friendId: friendId } } }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist.' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
//# sourceMappingURL=UserController.js.map