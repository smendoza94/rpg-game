const { Schema, model } = require('mongoose');

const fighterSchema = new Schema({
	name: String,
	health: Number,
	attack: Number,
	enemiesDefeated: Number,
	isAlive: Boolean,
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
});

module.exports = model('Fighter', fighterSchema);
