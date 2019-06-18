import axios from 'axios'
export function getTeachers() {
	const url = '/api/teacher'
	const data = {}
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}
export function getCourseInfos() {
	const url = '/api/getCourseInfos'
	const data = {}
	return axios.get(url, {
		params: data
	}).then((res) => {
		return Promise.resolve(res.data)
	})
}