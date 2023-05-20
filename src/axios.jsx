import AxiosInstances from 'axios';

const axios = AxiosInstances.create({
	baseURL: 'https://kitsu.io/api/edge/',
	headers: {
		'Content-Type': 'application/vnd.api+json',
		Accept: 'application/vnd.api+json',
	},
});
export default axios;

export function getAnimePaginationList(limit, offset) {
	return axios({
		method: 'get',
		url: `anime?page[limit]=${limit}&page[offset]=${offset}`,
	});
}

export function getAnime(id) {
	return axios({
		method: 'get',
		url: `anime/${id}`,
	});
}
