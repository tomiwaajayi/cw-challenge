import axios from 'axios';

// Unsplash APIKEY
const accessKey = 'iGEDdqIrMOagEXLKKdciqlSQj7JKuy5UXnM2Ki4xu48';

// Backup API key
// const accessKey = 'T5rmM8iDNHj54SdQGvDqV-QAghuSOiY7pS2JT-STZdo';

// Unsplash Base URL
const apiEndpoint = 'https://api.unsplash.com/';

// Unsplash Search endpoint
const searchPhotoEndpoint = `${apiEndpoint}search/photos`;
// Unsplash Get random photos endpoint
const getRandomPhotosEndpoint = `${apiEndpoint}photos/random`;

// Search photos
export const searchPhotos = async (param) => {
	try {
		const res = await axios.get(searchPhotoEndpoint, {
			params: {
				client_id: accessKey,
				per_page: 8,
				order_by: 'latest',
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

// Get random Photos
export const getRandomPhotos = async () => {
	try {
		const res = await axios.get(getRandomPhotosEndpoint, {
			params: {
				client_id: accessKey,
				count: 8,
			},
		});

		if (res.status == 200) return res.data;
		else return null;
	} catch (err) {
		console.error(err);
		return null;
	}
};
