import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {firestore, auth} from '../../lib/firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';

import s from './PostManager.module.scss';

import PostForm from './PostForm';

const PostManager = () => {
	const [preview, setPreview] = useState(false);

	const router = useRouter();
	const {slug} = router.query;

	const postRef = firestore
		.collection('users')
		.doc(auth.currentUser.uid)
		.collection('posts')
		.doc(slug);
	const [post] = useDocumentData(postRef);

	return (
		<>
			{post && (
				<>
					<article>
						<h2>{post.title}</h2>

						<PostForm
							postRef={postRef}
							defaultValues={post}
							preview={preview}
						/>
					</article>

					<aside className={s['aside']}>
						<h3>Herramientas</h3>
						<button
							className="button"
							onClick={() => setPreview(!preview)}>
							{preview ? 'Editar' : 'Previsualizar'}
						</button>
						<Link href={`/${post.username}/${post.slug}`}>
							<button className="button">Live view</button>
						</Link>
					</aside>
				</>
			)}
		</>
	);
};

export default PostManager;
