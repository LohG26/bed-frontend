import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	const [authenticated, setAuthenticated] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function checkAuthentication() {
			try {
				const response = await fetch("http://localhost:3000/users/me", {
					credentials: "include",
				});
				const data = await response.json();
				if (!response.ok) throw new Error("Unable to check your login status.");
				if (active) setAuthenticated(Boolean(data.authenticated));
			} catch {
				if (active) setAuthenticated(false);
			}
		}

		checkAuthentication();
		window.addEventListener("auth-change", checkAuthentication);
		return () => {
			active = false;
			window.removeEventListener("auth-change", checkAuthentication);
		};
	}, []);

	async function handleLogout() {
		setLoggingOut(true);
		setError("");
		try {
			const response = await fetch("http://localhost:3000/users/logout", {
				method: "POST",
				credentials: "include",
			});
			if (!response.ok) throw new Error("Unable to log out. Please try again.");
			setAuthenticated(false);
			window.dispatchEvent(new Event("auth-change"));
		} catch (err) {
			setError(err instanceof TypeError
				? "Unable to connect to the server."
				: err instanceof Error ? err.message : "Unable to log out.");
		} finally {
			setLoggingOut(false);
		}
	}

	return (
		<nav className="flex h-14 w-screen items-center bg-blue-600 px-2">
			<Link to="/" className="mx-2.5 font-bold text-white hover:text-orange-500">Home</Link>
			{authenticated ? (
				<button type="button" onClick={handleLogout} disabled={loggingOut}
					className="mx-2.5 font-bold text-white hover:text-orange-500 disabled:opacity-50">
					{loggingOut ? "Logging out..." : "Logout"}
				</button>
			) : (
				<>
					<Link to="/users/login" className="mx-2.5 font-bold text-white hover:text-orange-500">Login</Link>
					<Link to="/users/register" className="mx-2.5 font-bold text-white hover:text-orange-500">Register</Link>
				</>
			)}
			{error && <span role="alert" className="ml-auto mr-4 text-white">{error}</span>}
		</nav>
	);
}
