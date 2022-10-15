import { useContext } from "react"
import { PetContext } from "../context/PetContext"
import Options from "./Options"

const Pet = ({ type, pet }) => {
	const { id } = useContext(PetContext)

	return (
		<>
			{!id ? (
				<>
					<td>{pet.name}</td>
					<td>{type}</td>
					<td>
						<Options pet={pet} />
					</td>
				</>
			) : (
				<>
					{pet[0] ? (
						<>
							<li>
								<span>Pet type:</span> <span>{pet[0].type}</span>
							</li>
							<li>
								<span>Description:</span> <span>{pet[0].description}</span>
							</li>
							<li>
								<span>Skills:</span>{" "}
								<span>
									{pet[0].skill1} {pet[0].skill2} {pet[0].skill3}
								</span>
							</li>
							<li>
								<Options />
							</li>
						</>
					) : (
						<li>Loading...</li>
					)}
				</>
			)}
		</>
	)
}

export default Pet
