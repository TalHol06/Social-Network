import mongoose, { Schema, Model, type Document } from 'mongoose';

interface IUser extends Document{
  username: string;
  email: string;
  thoughts: mongoose.Schema.Types.ObjectId[];
  friends?: mongoose.Schema.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (e: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e),
        message: 'Please enter a valid email',
      },
      trim: true
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual for friendCount
UserSchema.virtual('friendCount').get(function(this: IUser){
  return this.friends?.length || 0;
});

// Creates the User model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;