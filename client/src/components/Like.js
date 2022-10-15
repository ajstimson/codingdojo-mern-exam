import { useState, useContext } from "react"
import { PetContext } from "../context/PetContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faThumbsUp, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

const Like = () => {
	const [liked, setLiked] = useState(false)
	const { pets } = useContext(PetContext)

	const handleLike = () => {
		setLiked(!liked)
		pets[0].likes = pets[0].likes + 1
		axios
			.put(`http://localhost:8000/api/pets/update/${pets[0]._id}`, pets[0])
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	return (
		<div className="likes">
			<button
				onClick={(e) => handleLike()}
				disabled={liked ? true : false}
			>
				{!liked ? (
					<FontAwesomeIcon
						icon={faThumbsUp}
						style={{ color: "#001629" }}
					/>
				) : (
					<FontAwesomeIcon
						icon={faCircleCheck}
						style={{ color: "#001629" }}
					/>
				)}{" "}
				{liked ? "Liked " : "Like "} {pets[0].name}
			</button>
			<span>{`${pets[0].likes} like(s)`}</span>
		</div>
	)
}

export default Like
