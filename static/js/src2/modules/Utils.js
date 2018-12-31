class Utils {
    constructor() {}

    static pause(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}

module.exports = Utils