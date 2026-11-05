function NavbarLink({ destination, text }) {
	return (
		<a href={destination} className="text-white hover:text-orange-500">
			{text}
		</a>
	);
}

export default function Navbar() {
	return (
		<section className="h-20 w-screen bg-blue-600">
			<NavbarLink destination="/" text="Home" />
			<NavbarLink destination="/users/login" text="Login" />
		</section>
	);
}
