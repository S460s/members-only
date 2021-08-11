const { DateTime } = require('luxon');
const { Schema, model } = require('mongoose');

const MessageSchema = new Schema(
	{
		title: { type: String, required: [true, 'Please enter a title.'] },
		text: {
			type: String,
			required: [true, 'Please enter text for the title.'],
		},
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	},
	{
		timestamps: {
			currentTime: () => {
				return DateTime.now().toLocaleString(DateTime.DATE_MED);
			},
		},
	}
);

const Message = model('Message', MessageSchema);
module.exports = Message;
