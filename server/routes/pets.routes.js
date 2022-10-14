const PetsController = require("../controllers/pets.controller")

module.exports = (app, io) => {
	const controller = PetsController(io)
	app.get("/api/pets", controller.getAllPets)
	app.get("/api/pets/:id", controller.getSinglePet)
	app.post("/api/pets/new", controller.createPet)
	app.put("/api/pets/update/:id", controller.updatePet)
	app.delete("/api/pets/delete/:id", controller.deletePet)
}
