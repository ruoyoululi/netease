import * as types from './mutation-types'

const mutations = {
	[types.SET_FIELDS_LIST](state, list) {
		state.fieldsList = list
	},
	[types.SET_SELL_LIST](state, list) {
		state.sellList = list
	},
	[types.SET_FOLLOW_LIST](state, list) {
		state.followList = list
	},
	[types.SET_SEARCH_HISTORY](state, history) {
    	state.searchHistory = history
  	},
  	[types.SET_SYSTEM](state, list) {
  		state.system = list
  	},
  	[types.SET_INTEREST](state, interest) {
  		state.interestList = interest
  	}
}
export default mutations