import { Request, Response } from "express";
import { Thought, User } from "../models/index.js";

// Get all Thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err: any) {
    return res.status(404).json({ message: err.message });
  }
}

// Get thought by Id
export const getThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try{
    const thought = await Thought.findById(thoughtId);
    if (!thought){
      return res.status(404).json({ message: 'Thought by that Id not found' });
    } else{
      return res.json(thought);
    }
  } catch (err: any){
    return res.status(500).json({ message: err.message });
  }
}

// Create a new Thought
export const createThought = async (req: Request, res: Response) => {
  const { thoughtText, username } = req.body;
  const { userId } = req.params;
  // console.log(userId);
  try {
    if (!thoughtText || !username){
      return res.status(400).json({ message: 'thoughtText and username is required.' });
    }

    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message: 'User by that id not found.' });
    }

    const newThought = await Thought.create({
      thoughtText,
      username
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {$push: { thoughts: newThought._id }},
      {new: true}
    ).populate('thoughts');

    return res.status(201).json({thought: newThought, user: updatedUser });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

// Update Thought
export const updateThought = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  const { newThought } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      newThought,
      { new: true }
    );

    if (!updatedThought){
      return res.status(404).json({ message: 'Thought does not exist.' });
    }
    return res.json(updatedThought);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

// Delete Thought
export const deleteThought = async (req: Request, res: Response) => {
  const { thoughtId } =req.params;
  try {
    const thought = await Thought.findByIdAndDelete(thoughtId);
    if (!thought){
      return res.status(404).json({ message: 'Thought does not exist.' });
    }

    await User.findByIdAndUpdate(
      { thoughts: thought._id },
      { $pull: { thoughts: thought._id } }
    );

    return res.json({ message: 'Thought deleted!' });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}

// Create a new Reaction
export const addReaction = async (req: Request, res: Response) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: req.body }},
      { new: true }
    );

    if (!thought){
      return res.status(404).json({ message: "Thought not found." });
    }
    return res.json(thought);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  } 
}

// Delete a Reaction
export const removeReaction = async (req: Request, res: Response) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId: reactionId }}},
      { new: true }
    );

    if (!thought){
      return res.status(404).json({ message: 'Thought does not exist.' });
    }

    return res.json(thought);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
}