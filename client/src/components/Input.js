const Input = ({ type, label, name, value, defaultValue, onChange }) => {
	return (
		<div className="input-container">
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				defaultValue={defaultValue}
				value={value}
				onChange={onChange}
			/>
			{/* {error && <p className="text-danger">{error}</p>} */}
		</div>
	)
}

export default Input
