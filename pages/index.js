import {useState} from 'react';
import {firestore, fromMillis, postToJSON} from '@/lib/firebase';
import CONFIG from '@/config/index';

import c from 'classnames';
import s from '@/styles/pages/Home.module.scss';

import {Spinner} from '@/components/Spinner';
import {PostFeed} from '@/components/PostFeed';
import {Metatags} from '@/components/Metatags';

const Home = ({posts}) => {
	const [_posts, setPosts] = useState(posts);
	const [loading, setLoading] = useState(false);

	const [postsEnd, setPostsEnd] = useState(false);

	const classes = c(s.home, 'box');

	const getMorePosts = async () => {
		setLoading(true);
		const last = _posts[_posts.length - 1];

		const cursor =
			typeof last.createdAt === 'number'
				? fromMillis(last.createdAt)
				: last.createdAt;

		const query = firestore
			.collectionGroup('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.startAfter(cursor)
			.limit(CONFIG.POSTS_LIMIT);

		const newPosts = (await query.get()).docs.map(doc => doc.data());

		setPosts(_posts.concat(newPosts));
		setLoading(false);

		if (newPosts.length < CONFIG.POSTS_LIMIT) setPostsEnd(true);
	};

	return (
		<section className={classes}>
			<Metatags title="Inicio" />
			<PostFeed posts={_posts} />

			{!loading && !postsEnd && (
				<button
					className="button button__default"
					onClick={getMorePosts}>
					Cargar más posts
				</button>
			)}

			<Spinner show={true} />

			{postsEnd && (
				<p className={s['home__no-more']}>No hay más posts...</p>
			)}
		</section>
	);
};

export const getServerSideProps = async () => {
	const postsQuery = firestore
		.collectionGroup('posts')
		.where('published', '==', true)
		.orderBy('createdAt', 'desc')
		.limit(CONFIG.POSTS_LIMIT);

	const posts = (await postsQuery.get()).docs.map(postToJSON);

	return {
		props: {posts},
	};
};

export default Home;
