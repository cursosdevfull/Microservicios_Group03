import mongoose, { Schema } from 'mongoose';

const schema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},

	itemCount: {
		type: Number,
		required: true,
	},

	transaction: {
		type: String,
		required: true,
	},

	status: {
		type: String,
		required: true,
	},
});

export default mongoose.model('Delivery', schema);
