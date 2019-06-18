import storage from 'good-storage'

const FOLLOW_KEY = '__follow__'
const FOLLOW_MAX_LEN = 100
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LENGTH = 15
const INTEREST_KEY = '__search__'
const INTEREST_MAX_LENGTH = 100

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveFollow(follow) {
  let follows = storage.get(FOLLOW_KEY, [])
  insertArray(follows, follow, (item) => {
    return item.productId === follow.productId
  }, FOLLOW_MAX_LEN)
  storage.set(FOLLOW_KEY, follows)
  return follows
}

export function deleteFollow(follow) {
  let follows = storage.get(FOLLOW_KEY, [])
  deleteFromArray(follows, (item) => {
    return item.productId === follow.productId
  })
  storage.set(FOLLOW_KEY, follows)
  return follows
}

export function loadFollow() {
  return storage.get(FOLLOW_KEY, [])
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearch() {
  return storage.get(SEARCH_KEY, [])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadInterest() {
  return storage.get(INTEREST_KEY, [])
}
export function saveInterest(query) {
  let interests = storage.get(INTEREST_KEY, [])
  insertArray(interests, query, (item) => {
    return item.id === query.id
  }, INTEREST_MAX_LENGTH)
  storage.set(INTEREST_KEY, interests)
  return interests
}
export function deleteInterest(query) {
  let interests = storage.get(INTEREST_KEY, [])
  deleteFromArray(interests, (item) => {
    return item.id === query.id
  })
  storage.set(INTEREST_KEY, interests)
  return interests
}