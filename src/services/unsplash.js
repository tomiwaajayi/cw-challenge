import axios from 'axios';

// Unsplash APIKEY
const accessKey = 'D80CkdkXp-3fLCEnW7g-BSSwPq_Uf8fpP49cGIOYzAI';

// Unsplash Base URL
const apiEndpoint = 'https://api.unsplash.com/';

// Unsplash Search endpoint
const searchPhotoEndpoint = `${apiEndpoint}search/photos`;

export const searchPhotos = async (param) => {
	try {
		const res = await axios.get(searchPhotoEndpoint, {
			params: {
				client_id: accessKey,
				per_page: 8,
				...param,
			},
		});

		if (res.status == 200) return res.data;
		else return null;
	} catch (err) {
		console.error(err);
		return null;
	}
};
