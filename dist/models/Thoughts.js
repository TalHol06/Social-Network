import mongoose, { Schema } from 'mongoose';
const reactionSchema = new Schema({
    reactionBody: {
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
}, {
    toJSON: {
        getters: true
    },
    id: false
});
const ThoughtsSchema = new Schema({
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
}, {
    toJSON: {
        virtuals: true,
    },
    id: false,
});
ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions?.length || 0;
});
const Thought = mongoose.model('Thought', ThoughtsSchema);
export default Thought;
//# sourceMappingURL=Thoughts.js.map