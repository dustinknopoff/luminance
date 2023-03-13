import * as tf from "@tensorflow/tfjs"
import { rgbToLightness } from "./lib/utils/luminance"
import { mapTo1Grid, mapToPercentage } from "./lib/utils/planes"

function approxRollingAverage(avg, new_sample) {
    avg -= avg / 120
    avg += new_sample / 120

    return avg
}

let xAvg = 200
let yAvg = 200
let luminance = 0.6

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)


onmessage = async (e) => {
    const img = tf.tensor(e.data.buffer, e.data.shape)
    const [width, height, _rgbLen] = img.shape
    const lightness = tf.tensor(
        // Calculate lightness at every pixel
        ((await img.reshape([width * height, 3]).array()) as Array<number[]>).map((values) => {
            // @ts-ignore
            const lightness = rgbToLightness(...values)
            return lightness
        }),
    )
    // Luminance as a %
    const actualLuminance = (lightness.sum().arraySync() as number) / (lightness.arraySync() as Array<number>).length / 100
    luminance = clamp(luminance - 0.1, actualLuminance, luminance + 0.1)
    // Location of maximum luminance is the largest value in tensor 0
    const maxInd = lightness.argMax(0).arraySync() as number
    // Get the x,y coordinates
    const actualLoc = [Math.floor(maxInd / width), maxInd % height]
    xAvg = approxRollingAverage(xAvg, actualLoc[1])
    yAvg = approxRollingAverage(yAvg, actualLoc[0])
    const xPercent = mapToPercentage(xAvg, width)
    const yPercent = mapToPercentage(yAvg, height)
    const onGridX = mapTo1Grid(xPercent)
    const onGridY = mapTo1Grid(yPercent)
    postMessage({luminance, x: onGridX, y: onGridY, loc: actualLoc})

    lightness.dispose()
    img.dispose()
}