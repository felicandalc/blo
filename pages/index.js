import toast from 'react-hot-toast';

import Link from 'next/link';
import Spinner from '../components/Spinner/Spinner';

export default function Home() {
	return (
		<div>
			<button onClick={() => toast.success('Hello!')}>Click me!</button>
		</div>
	);
}
