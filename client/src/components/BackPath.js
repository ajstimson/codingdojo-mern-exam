import { Link } from "react-router-dom"

const BackPath = (props) => {
	return (
		<Link to={props.page === "home" ? "/form" : "/"}>
			{props.page === "home" ? "add a pet to the shelter" : "back to home"}
		</Link>
	)
}

export default BackPath
