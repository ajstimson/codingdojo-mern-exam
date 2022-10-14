const Pet = require("../models/pets.model")

module.exports = (io) => ({
	createPet: (req, res) => {
		Pet.create(req.body)
			.then((result) => {
				res.json(result)
			})
			.catch((err) => {
				return res.status(400).send(err)
			})
	},
	getAllPets: (req, res) => {
		Pet.find()
			.then((pets) => res.json(pets))
			.catch((err) => res.json(err))
	},
	getSinglePet: (req, res) => {
		Pet.findById(req.params.id)
			.then((pet) => res.json([pet]))
			.catch((err) => res.json(err))
	},
	updatePet: (req, res) => {
		Pet.findByIdAndUpdate(req.params.id, req.body, {
			runValidators: true,
			new: true,
		})
			.then((pet) => res.json(pet))
			.catch((err) => res.json(err))
	},
	deletePet: async (req, res) => {
		try {
			const pet = await Pet.findByIdAndDelete(req.params.id)
			io.sockets.emit({ event: "deleted", id: req.params.id })
			res.json(pet)
		} catch (err) {
			console.log(err)
			return res.status(400).send(err)
		}
	},
})
