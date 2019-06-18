// import jsonp from 'common/js/jsonp.js'
import {
	commonParams,
	options
} from './config.js'
import axios from 'axios'

export function getTopBanner() {
	// const url = 'https://study.163.com/j/web/fetchTopBanner.json'
	const url = '/api/getTopBanner'
	const data = {}
	return axios.post(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}
export function getStudyList() {
	const url = '/api/getStudyList'
	const data = {}
	return axios.get(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}
export function getLiveCardList() {
	const url = '/api/getLiveCardList'
	const data = {
		categoryId: -1
	}
	return axios.get(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}
export function getIndexMicroData() {
	const url = '/api/getIndexMicroData'
	const data = {}
	return axios.get(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}
export function getSellList(activityDate, fields) {
	const url = '/api/getSellList'
	const data = {}
	if (fields) {
		Object.assign(data, {
			activityDate,
			fields
		})
	}
	return axios.get(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}
export function getFrontCategory() {
	const url = '/api/getFrontCategory'
	const data = {}
	return axios.get(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}
export function getPointsOfInterest() {
	const url = '/api/getPointsOfInterest'
	const data = {
		needUserInfo: true
	}
	return axios.post(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}
export function fetchPersonalData(id) {
	const url = '/api/fetchPersonalData'
	const data = {
		categoryId: id
	}
	return axios.get(url, {
		params: data
	}).then((response) => {
		return Promise.resolve(response.data)
	})
}