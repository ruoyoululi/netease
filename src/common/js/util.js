function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}
function _pad(num, n = 2) {
    let len = num.toString().length
    while (len < n) {
        num = '0' + num
        len++
    }
    return num
}
export function shuffle(arr) {
	let _arr = arr.slice()
	for (let i = 0; i < _arr.length; i++) {
		let j = getRandomInt(0, i)
		let t = _arr[i]
		_arr[i] = _arr[j]
		_arr[j] = t
	}
	return _arr
}

export function debounce(func, delay) {
	let timer
	return function (...args) {
		if (timer) {
			clearTimeout(timer)
		}
		timer = setTimeout(() => {
			func.apply(this, args)
		}, delay)
	}
}
export function getTime(interval) {
      	let date = new Date(interval)
        const year = date.getFullYear()
        const month = date.getMonth()+1
        const day = date.getDate()
        const hour = date.getHours()
        let minute = date.getMinutes()
        minute = _pad(minute, 2)
        const dataNow = new Date()
        const yearNow = dataNow.getFullYear()
        const monthNow = dataNow.getMonth()+1
        const dayNow = dataNow.getDate()
        const hourNow = dataNow.getHours()
        const minuteNow = dataNow.getMinutes()
        if (year === yearNow && month === monthNow) {
        	if (day === dayNow) {
        		if (hour > hourNow) {
        			return `${hour}:${minute}`
        		} else if (hour === hourNow && parseInt(minute) > minuteNow) {
        			return `${hour}:${minute}`
        		} else {
        			return '直播中'
        		}
        	} else if (day === dayNow + 1) {
        		return `明日\n${hour}:${minute}`
        	} else {
        		return `${month}月${day}日\n${hour}:${minute}`
        	}
        } else if (month === monthNow + 1) {
        	let date1 = date
        	date1.setMonth(month + 1)
        	date1.setDate(0)
        	let days = date1.getDate()
        	if (days === dayNow) {
        		return `明日\n${hour}:${minute}`
        	} else {
        		return `${month}月${day}日\n${hour}:${minute}`
        	}
        } else {
        	return `${month}月${day}日\n${hour}:${minute}`
        }
}

