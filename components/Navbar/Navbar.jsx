import {useContext} from 'react';
import {useRouter} from 'next/router';
import {UserContext} from '@/lib/userContext';
import {auth} from '@/lib/firebase';
import Link from 'next/link';

import s from './Navbar.module.scss';
import FallbackIcon from '@/public/person-circle.svg';

const Navbar = () => {
	const {user, username} = useContext(UserContext);

	const router = useRouter();

	const signOut = () => {
		auth.signOut();
		router.reload();
	};

	return (
		<header>
			<nav className={s.navbar}>
				<ul className="box">
					<li>
						<Link href="/">
							<button className="button button--accent-inverted">
								Inicio
							</button>
						</Link>
					</li>

					{username && (
						<>
							<li>
								<button
									className="button button--default-inverted"
									onClick={signOut}>
									Sign Out
								</button>
							</li>
							<li>
								<Link href="/admin">
									<button className="button button--default">
										Escribir posts
									</button>
								</Link>
							</li>
							<li>
								<Link href={`/${username}`}>
									<img
										src={user.photoURL || FallbackIcon}
										alt="User photo."
									/>
								</Link>
							</li>
						</>
					)}

					{!username && (
						<li>
							<Link href="/login">
								<button>Ingresar</button>
							</Link>
						</li>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default Navbar;
