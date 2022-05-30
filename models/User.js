const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    hitPoints: {
        type: Number,
        default: 50
    },
    strength: {
        type: Number,
        default: 15
    },
    monstersDefeated: []
});

const User = model('User', UserSchema);
module.exports = User;