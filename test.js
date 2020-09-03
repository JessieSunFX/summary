function debounce(fn, wait, immediate) {
    let timer = null
    return function(...args) {
        if(timer) clearTimeout(timer)

        if(immediate && !timer) {
            fn.apply(this, args)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, wait)
    }
}

function throttle(fn, wait) {
    let previous = 0
    return function(...args) {
        let now = Date.now()
        if(now - previous > wait) {
            previous = now
            fn.apply(this, args)
        }
    }
}