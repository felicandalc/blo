import {useContext, useState} from 'react';
import {useRouter} from 'next/router';
import {useCollection} from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import {UserContext} from '@/lib/userContext';
import {firestore, auth, serverTimestamp} from '@/lib/firebase';

import c from 'classnames';
import s from '@/styles/pages/AdminPage.module.scss';

import {Metatags} from '@/components/Metatags';
import {AuthCheck} from '@/components/AuthCheck';
import {PostFeed} from '@/components/PostFeed';

const AdminPage = ({}) => {
	const classes = c(s['admin-page'], 'box');

	return (
		<section className={classes}>
			<AuthCheck>
				<Metatags title="Admin page" />
				<PostList />
				<CreateNewPost />
			</AuthCheck>
		</section>
	);
};

const PostList = () => {
	const ref = firestore
		.collection('users')
		.doc(auth.currentUser.uid)
		.collection('posts');
	const query = ref.orderBy('createdAt');
	const [querySnapshot] = useCollection(query);

	const posts = querySnapshot?.docs.map(doc => doc.data());

	return (
		<>
			<h2>Editar posts</h2>
			<PostFeed posts={posts} admin />
		</>
	);
};

const CreateNewPost = () => {
	const router = useRouter();
	const {username} = useContext(UserContext);
	const [title, setTitle] = useState('');

	const slug = encodeURI(kebabCase(title));

	const isValid = title.length > 3 && title.length < 100;

	const createPost = async e => {
		e.preventDefault();
		const uid = auth.currentUser.uid;
		const ref = firestore
			.collection('users')
			.doc(uid)
			.collection('posts')
			.doc(slug);

		const data = {
			title,
			slug,
			uid,
			username,
			published: false,
			content: `# ${title}`,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
			heartCount: 0,
		};

		await ref.set(data);

		toast.success('Post creado');

		router.push(`/admin/${slug}`);
	};

	return (
		<form onSubmit={createPost} className={s['admin-page__form']}>
			<input
				value={title}
				onChange={e => setTitle(e.target.value)}
				className={s['admin-page__form__input']}
				placeholder="Post title"
			/>
			<button
				type="submit"
				disabled={!isValid}
				className="button button__default">
				Crear nuevo post
			</button>
		</form>
	);
};

export default AdminPage;
