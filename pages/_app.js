import '../styles/globals.scss';

import Navbar from '../components/Navbar/Navbar';
import {Toaster} from 'react-hot-toast';

function MyApp({Component, pageProps}) {
	return (
		<>
			<Navbar />
			<main className="main">
				<Component {...pageProps} />
			</main>
			<Toaster />
		</>
	);
}

export default MyApp;
