const Input = ({ type, label, error, name, value, defaultValue, onChange }) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				name={name}
				defaultValue={defaultValue}
				value={value}
				onChange={onChange}
				className={"form-control" + (error ? " danger" : "")}
			/>
			{error && <p className="text-danger">{error}</p>}
		</div>
	)
}

export default Input
