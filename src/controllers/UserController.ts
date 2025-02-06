import { Request, Response } from "express";
import { User } from '../models/index.js';

// Get all Users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err: any) {
    res.status(500).json({
      message: err.message
    });
  }
}

// Get User by id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId).populate("thoughts").populate("friends");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User does not exist.' });
    }
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

// Post a User
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, thoughts, friends } = req.body;

  if (!username || !email) {
    res.status(400).json({ messae: 'Email and Username required.' });
  }

  try {
    const newUser = await User.create({ username, email, thoughts, friends });
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

// Update a user
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { runValidators: true, new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User with that id not found. ' });
    } else if (!user.username || !user.email) {
      res.status(400).json({ message: 'Username and email required.' });
    }

    res.json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({ message: 'User with that Id not found. ' });
    } else {
      res.json({ message: 'User deleted!' });
    }
  } catch (err: any) {
   res.status(500).json({ message: err.message });
  }
}

// Add a friend to a user
export const addFriend = async (req: Request, res: Response): Promise<void> => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "Uer not found." });
    }
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

// Remove a friend from a user
export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  const { userId, friendId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { friends: { friendId: friendId } } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User does not exist.' });
    }

    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}