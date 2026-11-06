import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function UrlNotFound() {
	return <h1>404 Page/URL not found.</h1>;
}

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/user/login" element={<Login />} />
				<Route path="/user/register" element={<Register />} />

				<Route path="*" element={<UrlNotFound />} />
			</Routes>
		</BrowserRouter>
	);
}
