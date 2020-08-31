Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    const args = [...arguments].slice(1)
    const result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.myApply = function(context) {
    if(typeof this !== 'function') {
        throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    let result
    if(arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

Function.prototype.myBind = function (context) {
    if(typeof this !== 'function') {
        throw new TypeError('Error')
    }
    const _this = this
    const args = [...arguments].slice(1)
    return function F() {
        if(this instanceof F) {
            return new _this(...args, ...arguments)
        } else {
            return _this.apply(context, args.concat(...arguments))
        }
    }
}


function debounce(fn, wait, immediate) {
    let timeout

    return function() {
        let context = this
        let args = arguments
        if(timeout) clearTimeout(timeout)

        if(immediate) {
            let callnow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if(callnow) fn.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args)
            }, wait)
        }
    }
}

function debounce(fn, wait, immediate) {
    let timeout 

    return function() {
        const context = this
        const args = arguments
        if(timeout) clearTimeout(timeout)

        if(immediate) {
            const callnow = !timeout
            timeout = setTimeout(() => {
                timeout = null
            }, wait)
            if(callnow) fn.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                fn.apply(context, args)
            }, wait)
        }

    }
}

function throttle(func, wait) {
    let timer = null
    return function () {
        let context = this
        let args = arguments
        if(!timer) {
            timer = setTimeout(function() {
                timer = null
                func.apply(context, args)
            }, wait)
        }
    }
}