import {useContext, useState, useEffect, useCallback} from 'react';
import {UserContext} from '../lib/userContext';
import {auth, googleAuthProvider, firestore} from '../lib/firebase';
import debounce from 'lodash.debounce';

import s from '../styles/Login.module.scss';

const Login = () => {
	const {user, username} = useContext(UserContext);

	return (
		<section className={s.login}>
			{user ? (
				!username ? (
					<UsernameForm />
				) : (
					<SignOutButton />
				)
			) : (
				<SignInButton />
			)}
		</section>
	);
};

const SignInButton = () => {
	const signInWithGoogle = async () => {
		await auth
			.signInWithPopup(googleAuthProvider)
			.catch(e => console.error(e.message));
	};

	return (
		<button className={s.google} onClick={signInWithGoogle}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="currentColor"
				className="bi bi-google"
				viewBox="0 0 16 16">
				<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
			</svg>
			<span>Ingresar con Google</span>
		</button>
	);
};

const SignOutButton = () => {
	return (
		<button className={s['sign-out']} onClick={() => auth.signOut()}>
			Salir
		</button>
	);
};

const UsernameForm = () => {
	const [formValue, setFormValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const [loading, setLoading] = useState(false);

	const {user, username} = useContext(UserContext);

	const onSubmit = async e => {
		e.preventDefault();

		const userDoc = firestore.doc(`users/${user.uid}`);
		const usernameDoc = firestore.doc(`usernames/${formValue}`);

		const batch = firestore.batch();
		batch.set(userDoc, {
			username: formValue,
			photoURL: user.photoURL,
			displayName: user.displayName,
		});
		batch.set(usernameDoc, {uid: user.uid});

		await batch.commit().catch(e => console.error(e));
	};

	const onChange = e => {
		const val = e.target.value.toLowerCase();
		const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

		if (val.length < 3) {
			setFormValue(val);
			setLoading(false);
			setIsValid(false);
		}

		if (re.test(val)) {
			setFormValue(val);
			setLoading(true);
			setIsValid(false);
		}
	};

	useEffect(() => {
		checkUsername(formValue);
	}, [formValue]);

	const checkUsername = useCallback(
		debounce(async username => {
			if (username.length >= 3) {
				const ref = firestore.doc(`usernames/${username}`);
				const {exists} = await ref.get();
				setIsValid(!exists);
				setLoading(false);
			}
		}, 500),
		[],
	);

	return (
		!username && (
			<section>
				<h3>Cree su nombre de usuario</h3>
				<form onSubmit={onSubmit}>
					<input
						name="username"
						placeholder="Usuario"
						value={formValue}
						onChange={onChange}
					/>
					<UsernameMessage
						username={formValue}
						isValid={isValid}
						loading={loading}
					/>
					<button type="submit" disabled={!isValid}>
						Crear
					</button>
				</form>
			</section>
		)
	);
};

const UsernameMessage = ({username, isValid, loading}) => {
	if (loading) {
		return <p>Validando...</p>;
	} else if (isValid) {
		return <p>¡{username} está disponible!</p>;
	} else if (username && !isValid && username.length < 3) {
		return <p>El usuario debe contener al menos 3 caracteres.</p>;
	} else if (username && !isValid) {
		return <p>Dicho usuario está en uso...</p>;
	} else {
		return <p></p>;
	}
};

export default Login;
