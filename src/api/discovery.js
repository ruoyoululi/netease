import axios from 'axios'

export function getRecommendList(query, page, perpage) {
	// const url = 'https://study.163.com/j/web/fetchTopBanner.json'
	const url = '/api/getRecommendList'
	const data = {
		limit: perpage,
		offset: 0,
		pageIndex: page,
		pageSize: perpage,
		relativeOffset: 0,
		categoryId: query
	}
	return axios.get(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}