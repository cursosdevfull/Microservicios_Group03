import mongoose, { Schema } from 'mongoose';

const schema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		email: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
});

export default mongoose.model('Auth', schema);
