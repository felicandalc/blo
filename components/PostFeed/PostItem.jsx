import Link from 'next/link';

const PostItem = ({post, admin = false}) => {
	const wordCount = post?.content.trim().split(/\s+/g).length;
	const minutesToRead = (wordCount / 100 + 1).toFixed(0);

	return (
		<div>
			<Link href={`/${post.username}`}>
				<a>
					<strong>By @{post.username}</strong>
				</a>
			</Link>

			<Link href={`/${post.username}/${post.slug}`}>
				<h2>
					<a>{post.title}</a>
				</h2>
			</Link>

			<footer>
				<span>
					{wordCount} words. {minutesToRead} min read
				</span>
				<span>💗 {post.heartCount || 0} Hearts</span>
			</footer>

			{/* If admin view, show extra controls for user */}
			{admin && (
				<>
					<Link href={`/admin/${post.slug}`}>
						<h3>
							<button>Edit</button>
						</h3>
					</Link>

					{post.published ? <p>Live</p> : <p>Unpublished</p>}
				</>
			)}
		</div>
	);
};

export default PostItem;
