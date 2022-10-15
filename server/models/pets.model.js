const mongoose = require("mongoose")

const PetSchema = new mongoose.Schema(
	{
		name: {
			type: String,
		},
		type: {
			type: String,
		},
		description: {
			type: String,
		},
		available: Boolean,
		skill1: String,
		skill2: String,
		skill3: String,
		likes: Number,
	},
	{ timestamps: true }
)

const Pet = mongoose.model("Pet", PetSchema)

module.exports = Pet
