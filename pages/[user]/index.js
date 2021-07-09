import {getUserWithUsername, postToJSON} from '../../lib/firebase';
import {UserProfile} from '../../components/UserProfile';
import {PostFeed} from '../../components/PostFeed';
import {Metatags} from '../../components/Metatags';

const ProfilePage = ({}) => {
	return (
		<section>
			<Metatags title="User profile page." />
			<UserProfile user={user} />
			<PostFeed posts={posts} />
		</section>
	);
};

export const getServerSideProps = async ({query}) => {
	const {username} = query;

	const userDoc = await getUserWithUsername(username);

	let user = null;
	let posts = null;

	if (userDoc) {
		user = userDoc.data();
		const postsQuery = userDoc.ref
			.collection('posts')
			.where('published', '==', true)
			.orderBy('createdAt', 'desc')
			.limit(5);
		posts = (await postsQuery.get()).docs.map(postToJSON);
	} else {
		return {
			notFound: true,
		};
	}

	return {
		props: {user, posts},
	};
};

export default ProfilePage;
