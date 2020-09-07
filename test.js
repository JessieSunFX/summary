function cache(key, value, seconds) {
    const timestamp = Date.parse(new Date())/1000
    if(key && value === null) {
        localStorage.removeItem(key)
    } else if(key && value) {
        let expire
        if(!seconds) {
            expire = timestamp + (7*24*3600)
        } else {
            expire = timestamp + seconds
        }
        value = `${value}|${expire}`
        localStorage.setItem(key, value)
    } else if(key) {
        const val = localStorage.getItem(key)
        if(!val) return false
        const tmp = val.split("|")
        if(!tmp[1] || timestamp >= tmp[1]) {
            localStorage.removeItem(key)
            return false
        } else {
            return tmp[0]
        }
    } else {
        alert('key不能为空')
    }
}