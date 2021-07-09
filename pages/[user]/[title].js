import {firestore, getUserWithUsername, postToJSON} from '../../lib/firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';

import {PostContent} from '../../components/PostContent';
import {Metatags} from '../../components/Metatags';

const PostPage = ({path}) => {
	const postRef = firestore.doc(path);
	const [realtimePost] = useDocumentData(postRef);

	const post = realtimePost || props.post;

	return (
		<>
			<section>
				<Metatags title="Post page." />
				<PostContent post={post} />

				<aside>
					<p>
						<strong>{post.heartCount || 0} 🤍</strong>
					</p>
				</aside>
			</section>
		</>
	);
};

export const getStaticProps = async ({params}) => {
	const {username, title} = params;
	const userDoc = await getUserWithUsername(username);

	let post;
	let path;

	if (userDoc) {
		const postRef = userDoc.ref.collection('posts').doc(title);
		post = postToJSON(await postRef.get());

		path = postRef.path;
	}

	return {
		props: {post, path},
		revalidate: 5000,
	};
};

export const getStaticPaths = async () => {
	const snapshot = await firestore.collectionGroup('posts').get();

	const paths = snapshot.docs.map(doc => {
		const {title, username} = doc.data();
		return {
			params: {username, title},
		};
	});

	return {
		paths,
		fallback: 'blocking',
	};
};

export default PostPage;
