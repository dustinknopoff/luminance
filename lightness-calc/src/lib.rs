mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Given r,g,b values between 0-255, calculates the perceived lightness level
#[wasm_bindgen]
pub fn rgb_to_lightness(r: f32, g: f32, b: f32) -> f32 {
    y_to_lstar(rgb_to_y(r / 255_f32, g / 255_f32, b / 255_f32))
}

/// Converts r,g,b into luminance
///
/// **NOTE**: function will panic is passed values are not [0-1]
pub fn rgb_to_y(r: f32, g: f32, b: f32) -> f32 {
    assert!((0_f32..=1_f32).contains(&r));
    assert!((0_f32..=1_f32).contains(&g));
    assert!((0_f32..=1_f32).contains(&b));
    0.2126 * s_rgbto_lin(r) + 0.7152 * s_rgbto_lin(g) + 0.0722 * s_rgbto_lin(b)
}

/// Converts a sRGB, gamma encoded value into it's linearized value
pub fn s_rgbto_lin(color_channel: f32) -> f32 {
    if color_channel <= 0.04045 {
        return color_channel / 12.92;
    }
    ((color_channel + 0.055) / 1.055).powf(2.4)
}

/// Converts luminance into perceived brightness.
pub fn y_to_lstar(y: f32) -> f32 {
    // Send this function a luminance value between 0.0 and 1.0,
    // and it returns L* which is "perceptual lightness"

    if y <= (216_f32 / 24389_f32) {
        // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
        return y * (24389_f32 / 27_f32); // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
    }

    y.powf(1_f32 / 3_f32) * 116_f32 - 16_f32
}
