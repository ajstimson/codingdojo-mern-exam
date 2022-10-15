import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Form from "./components/Form"
import Main from "./components/Main"
import PetList from "./components/PetList"
import Context from "./context/PetContext"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						exact
						element={
							<Context>
								<Main
									page="home"
									title="These pets are looking for a good home"
								>
									<PetList />
								</Main>
							</Context>
						}
					/>
					<Route
						path="/pet/:id"
						element={
							<Context>
								<Main
									page="pet"
									title="Details about:"
								>
									<PetList />
								</Main>
							</Context>
						}
					/>
					<Route
						path="/form"
						element={
							<Context>
								<Main
									page="new"
									title="Know a pet needing a home?"
								>
									<Form />
								</Main>
							</Context>
						}
					/>
					<Route
						path="/edit/:id"
						element={
							<Context>
								<Main
									page="edit"
									title="Edit"
								>
									<Form />
								</Main>
							</Context>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
