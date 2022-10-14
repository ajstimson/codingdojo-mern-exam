import { useState, useEffect } from "react"
import Input from "./Input"
import Select from "react-select"
import axios from "axios"
import { useParams, useNavigate } from "react-router-dom"

const Form = () => {
	const [petNames, setPetNames] = useState([])
	const [errors, setErrors] = useState({ name: "", type: "", description: "" })

	const [value, setValue] = useState({
		name: "",
		type: "",
		description: "",
		available: false,
		skill1: "",
		skill2: "",
		skill3: "",
	})

	const { id } = useParams()

	useEffect(() => {
		id &&
			axios.get(`http://localhost:8000/api/pets/${id}`).then((res) => {
				setValue(res.data[0])
			})
		axios.get("http://localhost:8000/api/pets").then((res) => {
			res.data.forEach((pet) => {
				setPetNames((petNames) => [...petNames, pet.name])
			})
		})
	}, [id, errors])

	let navigate = useNavigate()
	const handleSubmit = (e) => {
		e.preventDefault()

		if (!id) {
			axios
				.post("http://localhost:8000/api/pets/new", value)
				.then((res) => {
					console.log(res)
					navigate("/")
				})
				.catch((err) => {
					Object.entries(err.response.data.errors).map((error) => {
						setErrors((errors) => ({ ...errors, [error[0]]: error[1].message }))
						return 0
					})
				})
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
		option: (provided, state) => ({
			...provided,
			borderBottom: "1px dotted plum",
			color: state.isSelected ? "#64c3a3" : "plum",
			fontWeight: state.isSelected ? "bold" : "normal",
			padding: 20,
		}),
		placeholder: (provided, state) => ({
			...provided,
			color: errors.type ? "red" : "plum",
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

	const handleChange = (e) => {
		console.log(e)
		setValue({ ...value, [e.target.name]: e.target.value })

		if (e.target.name === "name") {
			!id && petNames.indexOf(e.target.value) === 0
				? setErrors({ ...errors, name: "Name must be unique!" })
				: setErrors({ ...errors, name: "" })
		} else if (e.target.name === "description") {
			e.target.value.length > 0 && setErrors({ ...errors, description: "" })
		}
	}
	if (id && !value.name) return null
	return (
		<form onSubmit={(e) => handleSubmit(e)}>
			<Input
				type="text"
				label="Pet's Name"
				error={errors.name}
				name="name"
				defaultValue={value.name}
				onChange={(e) => handleChange(e)}
			/>
			<label>Type:</label>
			<Select
				options={selectOptions}
				onChange={(e) => setValue({ ...value, type: e.value })}
				styles={customStyles}
				placeholder={errors.type ? errors.type + "!" : "select..."}
				value={selectOptions.find((option) => option.value === value.type)}
			/>
			<Input
				type="text"
				label="Pet's Description"
				// error={errors.description}
				name="description"
				defaultValue={value.description}
				onChange={(e) => handleChange(e)}
			/>
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
			<button
				type="submit"
				disabled={
					errors.name || errors.type || errors.description ? true : false
				}
			>
				Submit
			</button>
		</form>
	)
}

export default Form
