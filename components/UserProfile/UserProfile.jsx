import s from './UserProfile.module.scss';

const UserProfile = ({user}) => (
	<article className={s['user-profile']}>
		<img className={s['user-profile__img']} src={user.photoURL} />
		<p className={s['user-profile__username']}>
			<i>@{user.username}</i>
		</p>
		<h2>{user.displayName || 'Anónimo'}</h2>
	</article>
);

export default UserProfile;
