import c from 'classnames';
import s from '@/styles/EditPost.module.scss';

import {Metatags} from '@/components/Metatags';
import {AuthCheck} from '@/components/AuthCheck';
import {PostManager} from '@/components/PostManager';

const AdminEditPostPage = ({}) => {
	const classes = c(s['edit-post-page'], 'box');

	return (
		<section className={classes}>
			<AuthCheck>
				<Metatags title="Edición de post" />
				<PostManager />
			</AuthCheck>
		</section>
	);
};

export default AdminEditPostPage;
