import { useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "axios"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"

const Pet = ({ pets, setPets, pet }) => {
	const [like, setLike] = useState(false)
	let { id } = useParams()

	const handleLike = () => {
		setLike(!like)
	}
	const handleAdopt = (e) => {
		e.preventDefault()
		confirmAlert({
			title: "Confirm adoption",
			message: "Are you sure you want to do this?",
			buttons: [
				{
					label: "Yes",
					onClick: () => deleteItem(),
				},
				{
					label: "No",
				},
			],
		})
	}

	let navigate = useNavigate()

	const handleEdit = (e) => {
		e.preventDefault()
		navigate(`/edit/${pet._id}`)
	}

	const handleDelete = (e) => {
		e.preventDefault()
		confirmAlert({
			title: "Confirm to Delete",
			message: "Are you sure you want to do this?",
			buttons: [
				{
					label: "Yes",
					onClick: () => deleteItem(),
				},
				{
					label: "No",
				},
			],
		})
	}

	const deleteItem = () => {
		axios
			.delete(`http://localhost:8000/api/pets/delete/${pet._id}`)
			.then((res) => {
				setPets(pets.filter((p) => p._id !== pet._id))
				navigate("/")
			})
			.catch((err) => {
				console.log(err)
			})
	}
	return (
		<>
			<h3>{pet.name}</h3>
			{id ? (
				<>
					<p>Type: {pet.type}</p>
					<p>Description: {pet.description}</p>
					<p>
						Skills: {pet.skill1}, {pet.skill2}, {pet.skill3}
					</p>
				</>
			) : (
				<Link to={`/pet/${pet._id}`}>Details...</Link>
			)}

			<div className="like">
				<button
					onClick={(e) => handleLike()}
					disabled={!like ? true : false}
				>
					Like
				</button>
			</div>
			<div className="options">
				<button onClick={(e) => handleAdopt(e)}>Adopt {pet.name}</button>
				<button onClick={(e) => handleEdit(e)}>Edit Pet</button>
				<button onClick={(e) => handleDelete(e)}>Remove Pet</button>
			</div>
		</>
	)
}

export default Pet
