import {serverTimestamp} from '../../lib/firebase';
import {useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import toast from 'react-hot-toast';

import c from 'classnames';
import s from './PostForm.module.scss';

import {Hightlight} from '@/lib/highlight';
import {ImageUploader} from '@/components/ImageUploader';

const PostForm = ({defaultValues, postRef, preview}) => {
	const editor = c(s['post-form__editor'], {
		hidden: preview,
		visibile: !preview,
	});
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

		toast.success('Post editado!', {
			position: 'bottom-right',
			style: {background: '#333333', color: '#F5F5F5'},
		});
	};

	return (
		<form className={s['post-form']} onSubmit={handleSubmit(updatePost)}>
			{preview && (
				<div className={s['post-form__preview']}>
					<ReactMarkdown
						rehypePlugins={[rehypeRaw]}
						components={Hightlight}>
						{watch('content')}
					</ReactMarkdown>
				</div>
			)}

			<div className={editor}>
				<ImageUploader />

				<textarea
					{...register('content', {
						maxLength: {value: 20000, message: 'Mucho texto.'},
						minLength: {
							value: 10,
							message: 'Escribí un poco más.....',
						},
						required: {value: true, message: 'Campo requerido'},
					})}
					contentEditable></textarea>

				<label className="button button--default" htmlFor="published">
					<input
						id="published"
						type="checkbox"
						{...register('published')}
					/>
					Publicado
				</label>

				{formState.errors.content && (
					<p className="error">{formState.errors.content.message}</p>
				)}

				<button
					className="button button--default"
					type="submit"
					disabled={!isDirty || !isValid}>
					Guardar cambios
				</button>
			</div>
		</form>
	);
};

export default PostForm;
