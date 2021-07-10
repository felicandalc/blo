import {serverTimestamp} from '../../lib/firebase';
import {useForm} from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

import s from './PostForm.module.scss';

import {ImageUploader} from '../../components/ImageUploader';

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
		<form className={s['post-form']} onSubmit={handleSubmit(updatePost)}>
			{preview && (
				<div className={s['post-form__preview']}>
					<ReactMarkdown>{watch('content')}</ReactMarkdown>
				</div>
			)}

			<div className={preview ? 'hidden' : 'visible'}>
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

export default PostForm;
