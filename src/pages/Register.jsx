import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		if (loading) return;
		setError("");
		setMessage("");
		setLoading(true);
		try {
			const response = await fetch("http://localhost:3000/user/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ username: username.trim(), password }),
			});
			const data = response.headers.get("content-type")?.includes("application/json")
				? await response.json()
				: null;
			if (!response.ok) throw new Error(data?.message || data?.error || "Registration failed.");
			setPassword("");
			setMessage("Account created. You can log in now.");
		} catch (err) {
			if (err instanceof TypeError) {
				setError("Unable to connect to the server. Please check that the backend is running and try again.");
			} else {
				setError(err instanceof Error ? err.message : "Unable to register.");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="mx-auto max-w-md p-6">
			<h1 className="mb-4 text-2xl font-bold">Register</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="register-username" className="block">Username</label>
					<input id="register-username" type="text" autoComplete="username" required
						value={username} onChange={(event) => setUsername(event.target.value)}
						className="w-full rounded border p-2" />
				</div>
				<div>
					<label htmlFor="register-password" className="block">Password</label>
					<input id="register-password" type={showPassword ? "text" : "password"}
						autoComplete="new-password" required value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="w-full rounded border p-2" />
				</div>
				<label className="flex items-center gap-2">
					<input type="checkbox" checked={showPassword}
						onChange={(event) => setShowPassword(event.target.checked)} />
					Show password
				</label>
				{error && <p role="alert" className="text-red-700">{error}</p>}
				{message && <p role="status" className="text-green-700">{message} <Link to="/user/login" className="underline">Login</Link></p>}
				<button type="submit" disabled={loading}
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
					{loading ? "Registering..." : "Register"}
				</button>
			</form>
			<p className="mt-4">Already registered? <Link to="/user/login" className="text-blue-700 underline">Login</Link></p>
		</main>
	);
}
