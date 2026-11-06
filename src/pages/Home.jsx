import { useEffect, useState } from "react";

export default function Home() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;

		async function loadCurrentUser() {
			setLoading(true);
			try {
				const response = await fetch("http://localhost:3000/users/me", {
					credentials: "include",
				});
				const data = await response.json();
				if (!response.ok) throw new Error(data?.message || "Unable to load your account.");
				if (active) {
					setUser(data.authenticated ? { id: data.userId, username: data.username } : null);
					setError("");
				}
			} catch (err) {
				if (active) {
					setError(err instanceof TypeError
						? "Unable to connect to the server. Please try again later."
						: err instanceof Error ? err.message : "Unable to load your account.");
				}
			} finally {
				if (active) setLoading(false);
			}
		}

		loadCurrentUser();
		window.addEventListener("auth-change", loadCurrentUser);
		return () => {
			active = false;
			window.removeEventListener("auth-change", loadCurrentUser);
		};
	}, []);

	return (
		<main className="mx-auto max-w-2xl p-6">
			<h1 className="mb-4 text-2xl font-bold">Home</h1>
			{loading && <p role="status">Loading your account...</p>}
			{error && <p role="alert" className="text-red-700">{error}</p>}
			{!loading && !error && user && (
				<section className="rounded border p-4" aria-label="Your account">
					<p><span className="font-semibold">User ID:</span> {user.id}</p>
					<p><span className="font-semibold">Username:</span> {user.username}</p>
				</section>
			)}
			{!loading && !error && !user && <p>Please log in to see your user ID and username.</p>}
		</main>
	);
}
