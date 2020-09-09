class Event {
    constructor () {}
    handlers = {}

    addEventListener(type, handler) {
        if(!(type in this.handlers)) {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
    }

    dispatchEvent(type, ...params) {
        if(!(type in this.handlers)) {
            return new Error('未注册该事件')
        }
        this.handlers[type].forEach(handler => {
            handler(...params)
        });
    }

    removeEventListener(type, handler) {
        if(!(type in this.handlers)) {
            return new Error('未注册该事件')
        }
        if(!handler) {
            delete this.handlers[type]
        } else {
            const idx = this.handlers[type].findIndex(ele => ele === handler)
            if(idx === -1) {
                return new Error('无该绑定事件')
            }
            this.handlers[type].splice(idx, 1)
            if (this.handlers[type].length === 0) {
                delete this.handlers[type]
            }
        }
    }
}