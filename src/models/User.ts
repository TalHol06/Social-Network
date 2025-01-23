import mongoose, { Schema, Model, type Document } from 'mongoose';

interface IUser extends Document{
  id: number,
  username: string;
  email: string;
  thoughts: Schema.Types.ObjectId[];
  friends?: Schema.Types.ObjectId[];
  friendCount: number;
}

const UserSchema = new Schema<IUser>(
  {
    id: {
      autoIncrement: true
    },
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
      validator: function(e){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e);
      },
      message: 'PLease enter a valid email',
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
    // id: false
  }
);

// Virtual for friendCount
UserSchema.virtual('friendCount').get(function(this: IUser){
  return this.friends.length;
});

// Creates the User model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);
export default User;