import Link from 'next/link';

import s from './PostItem.module.scss';

const PostItem = ({post, admin = false}) => {
	const wordCount = post?.content.trim().split(/\s+/g).length;
	const minutesToRead = (wordCount / 100 + 1).toFixed(0);

	return (
		<article className={s['post-card']}>
			<Link href={`/${post.username}`}>
				<a>
					<strong>
						Escrito por{' '}
						<span className={s['post-card__author']}>
							@{post.username}
						</span>
					</strong>
				</a>
			</Link>

			<Link href={`/${post.username}/${post.slug}`}>
				<h2>
					<a>{post.title}</a>
				</h2>
			</Link>

			<footer>
				<span>
					{wordCount} palabras. {minutesToRead} minutos de lectura.
				</span>
				<strong>💗 {post.heartCount || 0} Hearts</strong>
			</footer>

			{/* If admin view, show extra controls for user */}
			{admin && (
				<>
					<Link href={`/admin/${post.slug}`}>
						<h3>
							<button>Editar</button>
						</h3>
					</Link>

					{post.published ? <p>Publicado</p> : <p>No publicado</p>}
				</>
			)}
		</article>
	);
};

export default PostItem;
