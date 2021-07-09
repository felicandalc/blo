import {useState} from 'react';
import {auth, storage, STATE_CHANGED} from '../../lib/firebase';

import {Spinner} from '../Spinner';

const ImageUploader = () => {
	const [uploading, setUploading] = useState(false);
	const [progress, setProgress] = useState(0);
	const [downloadURL, setDownloadURL] = useState(null);

	const uploadFile = async e => {
		const file = Array.from(e.target.files)[0];
		const extension = file.type.split('/')[1];

		const ref = storage.ref(
			`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`,
		);
		setUploading(true);

		const task = ref.put(file);

		task.on(STATE_CHANGED, snapshot => {
			const pct = (
				(snapshot.bytesTransferred / snapshot.totalBytes) *
				100
			).toFixed(0);
			setProgress(pct);

			task.then(() => ref.getDownloadURL())
				.then(url => {
					setDownloadURL(url);
					setUploading(false);
				})
				.catch(e => console.error(e));
		});
	};

	return (
		<div>
			<Spinner show={uploading} />
			{uploading && <h3>{progress}%</h3>}

			{!uploading && (
				<>
					<label className="btn">
						📸 Subir imagen
						<input
							type="file"
							onChange={uploadFile}
							accept="image/x-png,image/gif,image/jpeg"
						/>
					</label>
				</>
			)}

			{downloadURL && <code>{`![alt](${downloadURL})`}</code>}
		</div>
	);
};

export default ImageUploader;