import axios from 'axios'

export function getCourseList(page, perpage) {
	const url = '/api/getCourseList'
	const data = {
		pageIndex: page,
		pageSize: perpage,
		relativeOffset: 0,
		orderType: 1,
		filterType: 0,
		appkey: '7b1d5479260a923d1e5b187c8b9ac9a9',
		foreignId: 1032292439,
		deviceId: 1032292439
	}
	return axios.post(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}