import {loadFollow, loadSearch, loadInterest} from 'common/js/cache'
const state = {
	fieldsList: [],
	sellList: [],
	followList: loadFollow(),
	searchHistory: loadSearch(),
	system: {},
	interestList: loadInterest()
}
export default state