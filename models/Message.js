const { DateTime } = require('luxon');
const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
	{
		title: { type: String, required: [true, 'Please enter a title.'] },
		text: {
			type: String,
			required: [true, 'Please enter text for the title.'],
		},
		author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
		createdAt: { type: String },
		updatedAt: { type: String },
	},
	{
		timestamps: {
			currentTime: () => {
				return DateTime.now().toLocaleString(DateTime.DATE_MED);
			},
		},
	}
);

module.exports = model('Message', MessageSchema);
