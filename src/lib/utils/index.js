export function getBriefArr(arr) {
    return arr.map(data => getBriefData(data))
}

export function getBriefData(fullData) {
    const { id, name, icon } = fullData || {}
    return { id, name, icon }
}