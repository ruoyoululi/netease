import * as types from './mutation-types'
import {saveFollow, deleteFollow, saveSearch, deleteSearch, clearSearch, saveInterest, deleteInterest} from 'common/js/cache'

export const saveFollowList = function ({commit}, follow) {
  commit(types.SET_FOLLOW_LIST, saveFollow(follow))
}

export const deleteFollowList = function ({commit}, follow) {
  commit(types.SET_FOLLOW_LIST, deleteFollow(follow))
}

export const saveSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({commit}, query) {
	commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function({commit}) {
	commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const saveInterestList = function ({commit}, interest) {
  commit(types.SET_INTEREST, saveInterest(interest))
}

export const deleteInterestList = function ({commit}, interest) {
  commit(types.SET_INTEREST, deleteInterest(interest))
}