import axios from 'axios'
export function getHotKey() {
	const url = '/api/getHotkey'
	const data = {
		hotwordType: 0
	}
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
export function search(query) {
	const url = '/api/search'
	const data = {
		keyword: query
	}
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}