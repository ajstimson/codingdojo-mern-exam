import { createContext, useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { io } from "socket.io-client"

export const PetContext = createContext()

const Context = ({ children }) => {
	const [pets, setPets] = useState([])
	const { id } = useParams()

	useEffect(() => {
		axios
			.get(
				id
					? `http://localhost:8000/api/pets/${id}`
					: "http://localhost:8000/api/pets"
			)
			.then((res) => {
				setPets(res.data)
			})
			.catch((err) => {
				console.log(err)
			})
	}, [id, setPets])

	const ENDPOINT = "http://localhost:8000/"
	const { current: socket } = useRef(io(ENDPOINT))
	useEffect(() => {
		socket.onAny((res) => {
			console.log("test", res)
			if (res.event === "deleted") {
				setPets((pets) => pets.filter((pet) => pet._id !== res.id))
			}
		})
	}, [socket, setPets])
	return (
		<PetContext.Provider
			value={{
				pets: id ? pets.filter((pet) => id === pet._id) : pets,
				setPets,
			}}
		>
			{children}
		</PetContext.Provider>
	)
}

export default Context
