const Main = (props) => {
	return (
		<main>
			<h1>{props.title}</h1>
			{props.children}
		</main>
	)
}

export default Main
