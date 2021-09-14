

export const convertMinuteToHM = (length) => {
    let isNum = /^\d+$/.test(length)
    if (isNum) {
        var hours = Math.floor(parseInt(length) / 60)
        var minutes = parseInt(length) - (hours * 60)
        var length = "";
        if (hours > 0) {
            length = hours + "h"
        }
        if (minutes > 0) {
            length += " " + minutes + "min"
        }
        return length
    }
    return "Length must be number"
}