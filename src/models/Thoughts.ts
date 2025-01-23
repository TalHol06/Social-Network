import { Schema, Model, type Document } from 'mongoose';

interface IThoughts extends Document{
  thoughtText: string;
  createdAt: Date;
  username: string;
  reactions?: Schema.Types.ObjectId[];
  reactionCount: number;
}

interface IReaction extends Document{

}

const ThoughtsSchema = new Schema<IThoughts>(
  {
    thoughtText: {
      type: String,
      required: true,
      length: 1-280
    },
    createdAt: {
      type: Date,
      default: Date.now()

    },
    username: {
      type: String,
      required: true
    },
    reactions: {
      type: []
    }
  }
)