import {Toaster} from 'react-hot-toast';
import {useUserData} from '@/lib/hooks';
import {UserContext} from '@/lib/userContext';

import '@/styles/globals.scss';

import Navbar from '@/components/Navbar/Navbar';

function MyApp({Component, pageProps}) {
	const userData = useUserData();

	return (
		<UserContext.Provider value={userData}>
			<Navbar />
			<main className="main">
				<Component {...pageProps} />
			</main>
			<Toaster />
		</UserContext.Provider>
	);
}

export default MyApp;
