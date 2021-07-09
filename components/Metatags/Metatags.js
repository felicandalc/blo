import Head from 'next/head';

const Metatags = ({
	title = 'Blog demo using NextJS and Firebase.',
	description = 'Simple blog demo that relies on NextJS (SSG + SSR + ISG) and Firebase DB + Authentication.',
}) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@nn" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
		</Head>
	);
};

export default Metatags;
