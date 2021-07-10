import s from '../../styles/EditPost.module.scss';

import {Metatags} from '../../components/Metatags';
import {AuthCheck} from '../../components/AuthCheck';
import {PostManager} from '../../components/PostManager';

const AdminEditPostPage = ({}) => {
	return (
		<section className={s['edit-post-page']}>
			<AuthCheck>
				<Metatags title="Edición de post" />
				<PostManager />
			</AuthCheck>
		</section>
	);
};

export default AdminEditPostPage;
