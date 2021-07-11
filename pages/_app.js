import {Toaster} from 'react-hot-toast';
import {useUserData} from '@/lib/hooks';
import {UserContext} from '@/lib/userContext';

import '@/styles/globals.scss';

import {Navbar} from '@/components/Navbar';
import {Footer} from '@/components/Footer';

function MyApp({Component, pageProps}) {
	const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<main>
				<Component {...pageProps} />
			</main>
			<Toaster />
			<Footer />
		</UserContext.Provider>
	);
}

export default MyApp;
