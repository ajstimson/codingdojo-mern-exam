import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Form from "./components/Form"
import Header from "./components/Header"
import Main from "./components/Main"
import PetList from "./components/PetList"
import Context from "./context/PetContext"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Header />
				<Routes>
					<Route
						path="/"
						exact
						element={
							<Main title="Pet Shelter">
								<Context>
									<PetList />
								</Context>
							</Main>
						}
					/>
					<Route
						path="/pet/:id"
						element={
							<Main title="Pet Details">
								<Context>
									<PetList />
								</Context>
							</Main>
						}
					/>
					<Route
						path="/form"
						element={
							<Main title="Add a Pet">
								<Form />
							</Main>
						}
					/>
					<Route
						path="/edit/:id"
						element={
							<Main title="Edit a Pet's Information">
								<Form />
							</Main>
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
