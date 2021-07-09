import {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {firestore, auth, serverTimestamp} from '../../lib/firebase';
import {useDocumentData} from 'react-firebase-hooks/firestore';
import {useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

import {Metatags} from '../../components/Metatags';
import {ImageUploader} from '../../components/ImageUploader';
import {AuthCheck} from '../../components/AuthCheck';

const AdminEditPostPage = ({}) => {
	return (
		<section>
			<AuthCheck>
				<Metatags title="Admin post page" />
				<PostManager />
			</AuthCheck>
		</section>
	);
};

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
						<p>ID: {post.slug}</p>

						<PostForm
							postRef={postRef}
							defaultValues={post}
							preview={preview}
						/>
					</article>

					<aside>
						<h3>Herramientas</h3>
						<button onClick={() => setPreview(!preview)}>
							{preview ? 'Editar' : 'Previsualizar'}
						</button>
						<Link href={`/${post.username}/${post.slug}`}>
							<button>Live view</button>
						</Link>
					</aside>
				</>
			)}
		</>
	);
};

const PostForm = ({defaultValues, postRef, preview}) => {
	const {register, handleSubmit, reset, watch, formState} = useForm({
		defaultValues,
		mode: 'onChange',
	});

	const {isValid, isDirty} = formState;

	const updatePost = async ({content, published}) => {
		await postRef.update({
			content,
			published,
			updatedAt: serverTimestamp(),
		});

		reset({content, published});

		toast.success('Post editado!');
	};

	return (
		<form onSubmit={handleSubmit(updatePost)}>
			{preview && (
				<div>
					<ReactMarkdown>{watch('content')}</ReactMarkdown>
				</div>
			)}

			<div>
				<ImageUploader />

				<textarea
					{...register('content', {
						maxLength: {value: 20000, message: 'Mucho texto.'},
						minLength: {
							value: 10,
							message: 'Escribí un poco más.....',
						},
						required: {value: true, message: 'Campo requerido'},
					})}></textarea>

				<fieldset>
					<input name="published" type="checkbox" {...register} />
					<label>Publicado</label>
				</fieldset>

				{formState.errors.content && (
					<p>{formState.errors.content.message}</p>
				)}

				<button type="submit" disabled={!isDirty || !isValid}>
					Guardar cambios
				</button>
			</div>
		</form>
	);
};

export default AdminEditPostPage;
