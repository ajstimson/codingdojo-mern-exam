import { useState, useEffect, useContext } from "react"
import { PetContext } from "../context/PetContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faUpload } from "@fortawesome/free-solid-svg-icons"
import Input from "./Input"
import Select from "react-select"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Form = () => {
	const { id, pets } = useContext(PetContext)
	// const [petNames, setPetNames] = useState([])
	// const [errors, setErrors] = useState({ name: "", type: "", description: "" })

	const [value, setValue] = useState({
		name: "",
		type: "",
		description: "",
		available: false,
		skill1: "",
		skill2: "",
		skill3: "",
		likes: 0,
	})

	useEffect(() => {
		id &&
			axios.get(`http://localhost:8000/api/pets/${id}`).then((res) => {
				setValue(res.data[0])
			})
		// pets.forEach((pet) => {
		// 	!petNames.includes(pet.name) &&
		// 		setPetNames((petNames) => [...petNames, pet.name])
		// })
	}, [pets, id])

	let navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault()

		if (!id) {
			// if (petNames.includes(value.name)) {
			// 	setErrors({ ...errors, name: "Name must be unique!" })
			// 	return
			// } else {
			axios
				.post("http://localhost:8000/api/pets/new", value)
				.then((res) => {
					console.log(res)
					navigate("/")
				})
				.catch((err) => {
					// Object.entries(err.response.data.errors).map((error) => {
					// 	setErrors((errors) => ({
					// 		...errors,
					// 		[error[0]]: error[1].message,
					// 	}))
					// 	return 0
					// })
					console.log(err)
				})
			//}
		} else {
			axios
				.put(`http://localhost:8000/api/pets/update/${id}`, value)
				.then((res) => {
					navigate(`/pet/${id}`)
				})
				.catch((err) => {
					console.log(err)
				})
		}
	}

	const customStyles = {
		control: (provided, state) => ({
			...provided,
			backgroundColor: "plum",
			color: "#000c16",
			marginBottom: "2.5rem",
		}),
		option: (provided, state) => ({
			...provided,
			borderBottom: "1px dotted plum",
			backgroundColor: state.isFocused ? "plum" : "#64c3a3",
			color: "#000c16",
			fontWeight: state.isSelected ? "bold" : "normal",
			padding: 20,
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: "#000c16",
		}),
		dropdownIndicator: (provided, state) => ({
			...provided,
			color: "#000c16",
		}),
		indicatorSeparator: (provided, state) => ({
			...provided,
			backgroundColor: "#000c16",
		}),
	}

	const selectOptions = [
		{ value: "cat", label: "Cat" },
		{ value: "dog", label: "Dog" },
		{ value: "bird", label: "Bird" },
		{ value: "rodent", label: "Rodent" },
		{ value: "snake", label: "Snake" },
		{ value: "reptile", label: "Reptile" },
		{ value: "other", label: "Other" },
	]

	if (id && !value.name) return null
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<div className="row-content">
				<Input
					type="text"
					label="Pet's Name"
					//error={errors.name}
					name="name"
					value={value.name}
					onChange={(e) => setValue({ ...value, name: e.target.value })}
				/>
				<label>Type:</label>
				<Select
					options={selectOptions}
					onChange={(e) => setValue({ ...value, type: e.value })}
					styles={customStyles}
					placeholder="select..."
					value={selectOptions.find((option) => option.value === value.type)}
				/>
				<Input
					type="text"
					label="Pet's Description"
					//error={errors.description}
					name="description"
					value={value.description}
					onChange={(e) => setValue({ ...value, description: e.target.value })}
				/>
				<button type="submit">
					{id ? (
						<FontAwesomeIcon
							icon={faPencil}
							style={{ color: "#001629" }}
						/>
					) : (
						<FontAwesomeIcon
							icon={faUpload}
							style={{ color: "#001629" }}
						/>
					)}{" "}
					{id ? "Edit Pet" : "Add Pet"}
				</button>
			</div>
			<div className="row-content">
				<h3>Skills (optional):</h3>
				<Input
					type="text"
					label="Pet's Skill 1"
					name="petSkill1"
					value={value.skill1}
					onChange={(e) => setValue({ ...value, skill1: e.target.value })}
				/>
				<Input
					type="text"
					label="Pet's Skill 2"
					name="petSkill2"
					value={value.skill2}
					onChange={(e) => setValue({ ...value, skill2: e.target.value })}
				/>
				<Input
					type="text"
					label="Pet's Skill 3"
					name="petSkill3"
					value={value.skill3}
					onChange={(e) => setValue({ ...value, skill3: e.target.value })}
				/>
			</div>
		</form>
	)
}

export default Form
