import Link from 'next/link';

const Page404 = () => {
	return (
		<section>
			<h1>404 | Parece que estás perdido...</h1>
			<iframe
				src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
				width="480"
				height="362"
				frameBorder="0"
				allowFullScreen></iframe>
			<Link href="/">
				<button>Volver</button>
			</Link>
		</section>
	);
};

export default Page404;
