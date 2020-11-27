// Import Axios - HTTP Cliennt
import axios from 'axios';

// Prod. APIKEY
const accessKey = 'T5rmM8iDNHj54SdQGvDqV-QAghuSOiY7pS2JT-STZdo';

// Local API key
// const accessKey = 'iGEDdqIrMOagEXLKKdciqlSQj7JKuy5UXnM2Ki4xu48';

// Unsplash Base URL
const apiEndpoint = 'https://api.unsplash.com/';

// Unsplash Search endpoint
const searchPhotoEndpoint = `${apiEndpoint}search/photos`;

// Search photos
export const searchPhotos = async (param) => {
	const result = await axios
		.get(searchPhotoEndpoint, {
			// Search Parameters
			params: {
				client_id: accessKey,
				per_page: 8,
				...param,
			},
		})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			throw err.response;
		});

	return result;
};
