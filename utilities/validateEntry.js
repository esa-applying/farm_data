const validateMetricValue = (metricType, metricValue) => {
    switch (metricType) {
        case "pH":
            if (metricValue < 0 || metricValue > 14) {
                console.log('invalid ph value on entry: ')
                return false
            }
            break
        case "temperature":
            if (metricValue < -50 || metricValue > 100) {
                console.log('invalid temperature value on entry: ')
                return false
            }
            break
        case "rainFall":
            if (metricValue < 0 || metricValue > 500) {
                console.log('invalid rainfall value on entry: ')
                return false
            }
            break
        default:
            console.log("Unsupported metric type on entry: ")
            return false
    }
    return true
}



const validateEntry = entry => {
    if (entry.length !== 4)
        return false

    const [farmName, dateString, metricType, metricValue] = entry

    if (!farmName.length || !dateString.length || !metricType.length || !metricValue.length) {
        console.log('empty column on entry: ', entry)
        return false
    }
    if (isNaN(metricValue)) {
        console.log('invalid metric value on entry: ', entry)
        return false
    }
    if (!Date.parse(dateString)) {
        console.log('invalid datetime on entry: ', entry)
        return false
    }
    if (!validateMetricValue(metricType, metricValue)) {
        console.log(entry)
        return false
    }
    return true
}

export default validateEntry