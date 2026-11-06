function NavbarLink({ destination, text }) {
	return (
		<a href={destination} className="text-white hover:text-orange-500 mx-2.5 font-bold">
			{text}
		</a>
	);
}

export default function Navbar() {
	return (
		<section className="h-14 w-screen bg-blue-600 flex items-center">
			<NavbarLink destination="/" text="Home" />
			<NavbarLink destination="/users/login" text="Login" />
			<NavbarLink destination="/users/register" text="Register" />
		</section>
	);
}
