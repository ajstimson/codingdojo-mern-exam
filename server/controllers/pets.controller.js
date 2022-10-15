const Pet = require("../models/pets.model")

module.exports = (io) => ({
	createPet: async (req, res) => {
		try {
			const pet = await Pet.create(req.body)
			const pets = await Pet.find()
			io.sockets.emit({ event: "added", pets: pets })
			res.json(pets)
		} catch (err) {
			console.log(err)
			return res.status(400).send(err)
		}
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
	updatePet: async (req, res) => {
		try {
			const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
				runValidators: true,
				new: true,
			})
			const pets = await Pet.find()
			io.sockets.emit({ event: "updated", pets: pets })
			res.json(pets)
		} catch (err) {
			console.log(err)
			return res.status(400).send(err)
		}
		// Pet.findByIdAndUpdate(req.params.id, req.body, {
		// 	runValidators: true,
		// 	new: true,
		// })
		// 	.then((pet) => res.json(pet))
		// 	.then((pet) => console.log(pet))
		// 	.catch((err) => res.json(err))
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
