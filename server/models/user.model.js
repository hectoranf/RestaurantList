const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		role: {
			type: String,
			enum: ['VISITOR', 'ADMIN'],
			default: 'VISITOR',
		},
		favouriteRestaurants: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Restaurant',
			},
		],
	},
	{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
