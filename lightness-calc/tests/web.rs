//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

use std::assert_eq;

use lightness_calc::rgb_to_lightness;
use wasm_bindgen_test::*;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    assert_eq!(rgb_to_lightness(25_f32, 47_f32, 133_f32), 23.449226);
}
