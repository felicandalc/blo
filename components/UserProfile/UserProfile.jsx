import Image from 'next/image';

import s from './UserProfile.module.scss';

import FallbackIcon from '@/public/person-circle.svg';

const UserProfile = ({user}) => (
	<article className={s['user-profile']}>
		<Image src={user.photoURL || FallbackIcon} alt="User photo." />
		<p className={s['user-profile__username']}>
			<i>@{user.username}</i>
		</p>
		<h2>{user.displayName || 'Señor misterio'}</h2>
	</article>
);

export default UserProfile;
