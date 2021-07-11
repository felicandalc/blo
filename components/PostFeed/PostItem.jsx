import Link from 'next/link';

import c from 'classnames';
import s from './PostItem.module.scss';

const PostItem = ({post, admin = false}) => {
	const wordCount = post?.content.trim().split(/\s+/g).length;
	const minutesToRead = (wordCount / 100 + 1).toFixed(0);

	const pClasses = c(s['post-card--published'], s['post-card--state']);
	const uClasses = c(s['post-card--unpublished'], s['post-card--state']);

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
				<strong className={s['post-card__hearts']}>
					💗 {post.heartCount || 0}
				</strong>
			</footer>

			{admin && (
				<>
					<Link href={`/admin/${post.slug}`}>
						<h3>
							<button className="button button--default">
								Editar
							</button>
						</h3>
					</Link>

					{post.published ? (
						<p className={pClasses}>Publicado</p>
					) : (
						<p className={uClasses}>No publicado</p>
					)}
				</>
			)}
		</article>
	);
};

export default PostItem;
