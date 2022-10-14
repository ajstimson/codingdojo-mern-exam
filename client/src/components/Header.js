import { Link } from "react-router-dom"

const Header = () => {
	return (
		<nav>
			<div className="nav-wrapper">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/form">Add a Pet</Link>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Header
