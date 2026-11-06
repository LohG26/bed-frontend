import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		if (loading) return;
		setLoading(true);
		setError("");
		setMessage("");

		try {
			const response = await fetch("http://localhost:3000/user/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				body: JSON.stringify({ username: username.trim(), password }),
			});
			const data = response.headers.get("content-type")?.includes("application/json")
				? await response.json()
				: null;
			if (!response.ok || data?.success === false) {
				throw new Error(data?.message || data?.error || "Login failed.");
			}
			window.dispatchEvent(new Event("auth-change"));
			setPassword("");
			setMessage("Login successful.");
		} catch (err) {
			if (err instanceof TypeError) {
				setError("Unable to connect to the server. Please check that the backend is running and try again.");
			} else {
				setError(err instanceof Error ? err.message : "Unable to log in.");
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<main className="mx-auto max-w-md p-6">
			<h1 className="mb-4 text-2xl font-bold">Login</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label htmlFor="login-username" className="block">Username</label>
					<input id="login-username" type="text" autoComplete="username" required value={username}
						onChange={(event) => setUsername(event.target.value)}
						className="w-full rounded border p-2" />
				</div>
				<div>
					<label htmlFor="login-password" className="block">Password</label>
					<input id="login-password" type={showPassword ? "text" : "password"}
						autoComplete="current-password" required value={password}
						onChange={(event) => setPassword(event.target.value)}
						className="w-full rounded border p-2" />
				</div>
				<label className="flex items-center gap-2">
					<input type="checkbox" checked={showPassword}
						onChange={(event) => setShowPassword(event.target.checked)} />
					Show password
				</label>
				{error && <p role="alert" className="text-red-700">{error}</p>}
				{message && <p role="status" className="text-green-700">{message}</p>}
				<button type="submit" disabled={loading}
					className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
					{loading ? "Logging in..." : "Login"}
				</button>
			</form>
			<p className="mt-4">No account? <Link to="/user/register" className="text-blue-700 underline">Register</Link></p>
		</main>
	);
}
