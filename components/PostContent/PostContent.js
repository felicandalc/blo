import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import s from './PostContent.module.scss';

const PostContent = ({post}) => {
	const createdAt =
		typeof post?.createdAt === 'number'
			? new Date(post.createdAt)
			: post.createdAt.toDate();

	return (
		<article className={s['post-content']}>
			<h1 className={s['post-content__title']}>{post?.title}</h1>

			<ReactMarkdown className={s['post-content__body']}>
				{post?.content}
			</ReactMarkdown>

			<footer>
				<span className={s['post-content__description']}>
					Autor:{' '}
					<Link href={`/${post.username}/`}>
						<a>@{post.username}</a>
					</Link>{' '}
					<span className={s['post-content__description__date']}>
						| {createdAt.toISOString()}
					</span>
				</span>
			</footer>
		</article>
	);
};

export default PostContent;
