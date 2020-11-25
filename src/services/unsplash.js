// Import Axios - HTTP Cliennt
import axios from 'axios';

// Prod. APIKEY
// const accessKey = 'iGEDdqIrMOagEXLKKdciqlSQj7JKuy5UXnM2Ki4xu48';

// Local API key
const accessKey = 'T5rmM8iDNHj54SdQGvDqV-QAghuSOiY7pS2JT-STZdo';

// Unsplash Base URL
const apiEndpoint = 'https://api.unsplash.com/';

// Unsplash Search endpoint
const searchPhotoEndpoint = `${apiEndpoint}search/photos`;

// Search photos
export const searchPhotos = async (param) => {
	try {
		const res = await axios.get(searchPhotoEndpoint, {
			// Search Parameters
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
