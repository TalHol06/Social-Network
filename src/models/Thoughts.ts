import mongoose, { Schema, Model, type Document } from 'mongoose';

interface IReaction{
  reactionText: string;
  username: string;
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    id: false
  }
);

interface IThoughts extends Document{
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions?: mongoose.Schema.Types.ObjectId[];
}


const ThoughtsSchema = new Schema<IThoughts>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    username: {
      type: String,
      required: true
    },
    reactions: {
      type: [reactionSchema],
      default: [],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

ThoughtsSchema.virtual('reactionCount').get(function (this: IThoughts){
    return this.reactions?.length || 0;
});

ThoughtsSchema.methods.getDateCreated = function(): Date{
  return this.createdAt;
}

const Thought: Model<IThoughts> = mongoose.model<IThoughts>('Thought', ThoughtsSchema);
export default Thought;