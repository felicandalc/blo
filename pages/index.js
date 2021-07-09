import {useState} from 'react';

import {firestore, fromMillis, postToJSON} from '../lib/firebase';
import CONFIG from '../config/index';

import Spinner from '../components/Spinner/Spinner';
import {PostFeed} from '../components/PostFeed';
import {Metatags} from '../../components/Metatags';

const Home = ({postsList}) => {
	const [posts, setPosts] = useState(postsList);
	const [loading, setLoading] = useState(false);

	const [postsEnd, setPostsEnd] = useState(false);

	const getMorePosts = async () => {
		setLoading(true);
		const last = posts[posts.length - 1];

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

		setPosts(posts.concat(newPosts));
		setLoading(false);

		if (newPosts.length < LIMIT) setPostsEnd(true);
	};

	return (
		<section>
			<Metatags title="Home page." />
			<PostFeed posts={posts} />

			{!loading && !postsEnd && (
				<button onClick={getMorePosts}>Cargar más posts</button>
			)}

			<Spinner show={loading} />

			{postsEnd && 'No hay más posts...'}
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
