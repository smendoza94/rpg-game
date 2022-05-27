const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new Schema({
	userName: String,
	password: String,
});
// hooks
// in order to do something before data is saved to the database using mongoose we can make use of the 'pre' hook

// make use of '.pre' to listen to any save event on the userSchema –– in case save event happens we pass async function with a 'next' parameter
	// important we use funciton keyword becuase of use of 'this' keyword
// next(); is needed for the data to be actually saved
userSchema.pre('save', async function(next) {
	// 'this' = the user about to be saved in the database
	// or a user that's already in the database
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcrypt.hash(this.password, saltRounds);
	}
	next();
});
module.exports = model('User', userSchema);