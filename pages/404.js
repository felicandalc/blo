import Link from 'next/link';

import s from '@/styles/Page404.module.scss';

const Page404 = () => {
	return (
		<section className={s['page-404']}>
			<iframe
				src="https://giphy.com/embed/3orif2hu7Es4jUyuXK"
				width="480"
				height="362"
				frameBorder="0"
				allowFullScreen></iframe>
			<h2>
				<strong>404</strong> | Parece que estás perdido...
			</h2>
			<Link href="/">
				<button className="button button--default-inverted">
					Volver
				</button>
			</Link>
		</section>
	);
};

export default Page404;
