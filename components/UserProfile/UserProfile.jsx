const UserProfile = ({user}) => {
	<div className="box-center">
		<img src={user.photoURL} />
		<p>
			<i>@{user.username}</i>
		</p>
		<h1>{user.displayName || 'Anónimo'}</h1>
	</div>;
};

export default UserProfile;
