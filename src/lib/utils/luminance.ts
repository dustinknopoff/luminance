/**
* @param colorChannel {number} r,g, or b value [0-1]
*/
function sRGBtoLin(colorChannel: number): number {
  // Send this function a decimal sRGB gamma encoded color value
  // between 0.0 and 1.0, and it returns a linearized value.

  if (colorChannel <= 0.04045) {
    return colorChannel / 12.92
  }

  return Math.pow((colorChannel + 0.055) / 1.055, 2.4)
}

/**
 * @param r {number} Red, [0-1]
 * @param g {number} Green, [0-1]
 * @param b {number} Blue, [0-1]
 * @returns Luminance, [0-1]
 */
function rgbToY(r: number, g: number, b: number) {
  return 0.2126 * sRGBtoLin(r) + 0.7152 * sRGBtoLin(g) + 0.0722 * sRGBtoLin(b)
}

/**
 * Luminance to perceived lightness.
 *
 * @param Y {number} Luminance, [0-1]
 */
function YtoLstar(Y: number) {
  // Send this function a luminance value between 0.0 and 1.0,
  // and it returns L* which is "perceptual lightness"

  if (Y <= (216 / 24389)) {  // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
    return Y * (24389 / 27)  // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
  }

  return Math.pow(Y, (1 / 3)) * 116 - 16
}

/**
 * Calculate perceived lightness from RGB values
 *
 * @param r {number} [0-255]
 * @param g {number} [0-255]
 * @param b {number} [0-255]
 * @returns {number} Lightness value, [0-100].
 */
export function rgbToLightness(r: number, g: number, b: number): number {
  return YtoLstar(rgbToY(r / 255, g / 255, b / 255))
}