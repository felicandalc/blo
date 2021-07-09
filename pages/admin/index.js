import {useContext, useState} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import {UserContext} from '../../lib/userContext';
import {firestore, auth, serverTimestamp} from '../../lib/firebase';

import {Metatags} from '../../components/Metatags';
import {AuthCheck} from '../../components/AuthCheck';
import {PostFeed} from '../../components/PostFeed';

const AdminPage = ({}) => {
	return (
		<section>
			<AuthCheck>
				<Metatags title="Admin page." />
				<PostsList />
				<CreateNewPost />
			</AuthCheck>
		</section>
	);
};

export default AdminPage;
