import { useContext } from "react"
import { PetContext } from "../context/PetContext"
import { Link } from "react-router-dom"
import Like from "./Like"
const Options = (pet) => {
	const { id } = useContext(PetContext)
	return (
		<>
			{!id ? (
				<p>
					<Link to={`/pet/${pet.pet._id}`}>Details</Link>
					<span> | </span>
					<Link to={`/edit/${pet.pet._id}`}>Edit</Link>
				</p>
			) : (
				<Like />
			)}
		</>
	)
}

export default Options
