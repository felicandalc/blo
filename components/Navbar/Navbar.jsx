import Link from 'next/link';

const Navbar = () => {
	const user = null;
	const username = null;

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/">
						<button>Home</button>
					</Link>
				</li>

				{username && (
					<>
						<li>
							<Link href="/admin">
								<button className="btn-blue">
									Write Posts
								</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`}>
								<img src={user?.photoURL} />
							</Link>
						</li>
					</>
				)}

				{!username && (
					<li>
						<Link href="/login">
							<button className="btn-blue">Log in</button>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
