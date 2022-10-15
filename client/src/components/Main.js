import { useState, useEffect, useContext } from "react"
import { PetContext } from "../context/PetContext"
import axios from "axios"
import { confirmAlert } from "react-confirm-alert"
import "react-confirm-alert/src/react-confirm-alert.css"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse } from "@fortawesome/free-solid-svg-icons"
import BackPath from "./BackPath"

const Main = (props) => {
	const { id, pets, setPets } = useContext(PetContext)
	const [pet, setPet] = useState({})
	let navigate = useNavigate()

	useEffect(() => {
		id && setPet(pets.filter((pet) => pet._id === id)[0])
	}, [id, pet, pets])

	const title = pet && pet.name ? `${props.title} ${pet.name}` : props.title

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
	if (id && !pet) return
	return (
		<main>
			<header>
				<div className="title">
					<h1>Pet Shelter</h1>
					<h2>{title}</h2>
				</div>
				<div className="content-right">
					<BackPath page={props.page} />
					{props.page === "pet" && (
						<div className="actions">
							<button onClick={(e) => handleAdopt(e)}>
								<FontAwesomeIcon
									icon={faHouse}
									style={{ color: "#001629" }}
								/>{" "}
								Adopt {pet.name}
							</button>
						</div>
					)}
				</div>
			</header>
			{props.children}
		</main>
	)
}

export default Main
