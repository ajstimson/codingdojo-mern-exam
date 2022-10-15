import React, { useContext } from "react"
import { PetContext } from "../context/PetContext"
import Pet from "./Pet"
import PetsTable from "./PetTable"

const PetList = () => {
	const { id, pets } = useContext(PetContext)
	const PetsByType = () => {
		if (id) return
		const types = [...new Set(pets.map((item) => item.type))]
		return types.map((type, i) => {
			return (
				<React.Fragment key={i}>
					{pets
						.filter((pet) => pet.type === type)
						.map((pet) => (
							<tr key={pet._id}>
								<Pet
									type={type}
									pet={pet}
								/>
							</tr>
						))}
				</React.Fragment>
			)
		})
	}
	return (
		<div className={id ? "single" : "all"}>
			{pets ? (
				!id ? (
					<PetsTable>
						<PetsByType />
					</PetsTable>
				) : (
					<ul>
						<Pet pet={pets} />
					</ul>
				)
			) : (
				<h2>No pets found...</h2>
			)}
		</div>
	)
}

export default PetList
