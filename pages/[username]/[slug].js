import {useDocumentData} from 'react-firebase-hooks/firestore';
import Link from 'next/link';
import {firestore, getUserWithUsername, postToJSON} from '@/lib/firebase';

import c from 'classnames';
import s from '@/styles/PostPage.module.scss';

import {PostContent} from '@/components/PostContent';
import {Metatags} from '@/components/Metatags';
import {HeartButton} from '@/components/HeartButton';
import {AuthCheck} from '@/components/AuthCheck';

const PostPage = ({path, post}) => {
	const postRef = firestore.doc(path);
	const [realtimePost] = useDocumentData(postRef);
	const classes = c(s['post-page'], 'box');

	const _post = realtimePost || post;

	return (
		<>
			<section className={classes}>
				<Metatags title={_post.title} />
				<PostContent post={_post} />

				<aside className={s['post-page__aside']}>
					<p className={s['post-page__aside__hearts-counter']}>
						<strong>{_post.heartCount || 0} 🤍</strong>
					</p>

					<AuthCheck
						fallback={
							<Link href="/login">
								<button className="button button__default-inverted">
									💗 Ingresar
								</button>
							</Link>
						}>
						<HeartButton postRef={postRef} />
					</AuthCheck>
				</aside>
			</section>
		</>
	);
};

export const getStaticProps = async ({params}) => {
	const {username, slug} = params;
	const userDoc = await getUserWithUsername(username);

	let post;
	let path;

	if (userDoc) {
		const postRef = userDoc.ref.collection('posts').doc(slug);
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
		const {slug, username} = doc.data();
		return {
			params: {username, slug},
		};
	});

	return {
		paths,
		fallback: 'blocking',
	};
};

export default PostPage;
