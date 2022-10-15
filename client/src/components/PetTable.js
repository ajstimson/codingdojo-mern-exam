const PetsTable = ({ children }) => {
	return (
		<table className="table table-striped table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>{children}</tbody>
		</table>
	)
}

export default PetsTable
