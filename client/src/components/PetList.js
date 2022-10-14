import { useContext } from "react"
import Pet from "./Pet"
import { PetContext } from "../context/PetContext"

const PetList = () => {
	const { pets, setPets } = useContext(PetContext)

	const PetsByType = () => {
		const types = [...new Set(pets.map((item) => item.type))]
		return types.map((type, i) => {
			return (
				<div key={i}>
					<h2>{type}</h2>
					{pets
						.filter((pet) => pet.type === type)
						.map((pet) => (
							<Pet
								key={pet._id}
								pets={pets}
								setPets={setPets}
								pet={pet}
							/>
						))}
				</div>
			)
		})
	}

	return (
		<div>
			{pets ? (
				pets.length ? (
					<PetsByType />
				) : (
					<Pet
						pets={pets}
						setPets={setPets}
						pet={pets}
					/>
				)
			) : (
				<h2>No pets found...</h2>
			)}
		</div>
	)
}

export default PetList
