import { Quality } from "../video/video.types"

export function getQualities(data: string) {
    let lines = data.split("\n")
    const qualities: Quality[] = []
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        const attributes = line.split('"')
        // console.log(attributes)
        const quality: Quality = { id: null, url: null, name: null }
        for (let j = 0; j < attributes.length; j++) {
            const attribute = attributes[j]
            if (attribute.includes("NAME")) {
                quality.name = attributes[j + 1]
                quality.url = lines[i + 2]
            }
            if (attribute.includes("GROUP-ID")) {
                quality.id = attributes[j + 1]
                quality.url = lines[i + 2]
            }
        }
        if (quality.id) {
            qualities.push(quality)
        }
    }
    console.log(qualities)
    return qualities
}

export function getAmountOfChunks(data: string) {
    let lines = data.split("\n")
    const secondToLastLine = lines[lines.length - 3]
    const amount = secondToLastLine.substring(0, secondToLastLine.length - 3)
    console.log(amount)
    return amount
}
