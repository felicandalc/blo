import {useContext} from 'react';
import {UserContext} from '../../lib/userContext';

import Link from 'next/link';

const Navbar = () => {
	const {username} = useContext(UserContext);

	return (
		<nav className="navbar">
			<ul>
				<li>
					<Link href="/">
						<button>Inicio</button>
					</Link>
				</li>

				{username && (
					<>
						<li>
							<Link href="/admin">
								<button>Escribir posts</button>
							</Link>
						</li>
						<li>
							<Link href={`/${username}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									className="bi bi-person-circle"
									viewBox="0 0 16 16">
									<path d="M11 6a3 3 0 11-6 0 3 3 0 016 0z"></path>
									<path
										fillRule="evenodd"
										d="M0 8a8 8 0 1116 0A8 8 0 010 8zm8-7a7 7 0 00-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 008 1z"></path>
								</svg>
							</Link>
						</li>
					</>
				)}

				{!username && (
					<li>
						<Link href="/login">
							<button className="btn-blue">Ingresar</button>
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
