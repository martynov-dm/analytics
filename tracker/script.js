class Buffer {
    SEND_TIMING = 4000
    lastSentTime = 0

    constructor() {
        this._buffer = []
    }

    _wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    get timeSinceSent() {
        return Date.now() - this.lastSentTime
    }

    get isPossibleToSend() {
        return this.timeSinceSent > this.SEND_TIMING
    }

    async register(event) {
        this._buffer.push(event)
        if (this._buffer.length === 3) return this.send()

        if (this.isPossibleToSend) return this.send()

        await this._wait(this.SEND_TIMING - this.timeSinceSent)

        return this.send()
    }

    send() {
        if (this._buffer.length) {

            const data = this._buffer
            this.lastSentTime = Date.now()
            this.clear()

            return fetch('http://localhost:8001/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then((res) =>  res.json())
                .catch((err) => {
                    console.log(err)
                    this._buffer = [...data, ...this._buffer]
                })

        }

    }

    clear() {
        this._buffer = []
    }

}

class Event {
    constructor(event, tags, url, title, ts) {
        this.event = event
        this.tags = tags
        this.url = url
        this.title = title
        this.ts = ts
    }
}

const buffer = new Buffer()

window.onbeforeunload = () => {
    buffer.send()
}

class Tracker {
    constructor() {
    }

    track(event, ...tags) {
        const url = window.location.href
        const title = document.title
        const ts = new Date()

        const eventObj = new Event(event, tags, url, title, ts)

        buffer.register(eventObj)
    }
}

const tracker = new Tracker()
