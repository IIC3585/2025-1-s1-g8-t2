// Import de wasm
use wasm_bindgen::prelude::*;

pub fn add(left: u64, right: u64) -> u64 {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

// Función de prueba para WASM
#[wasm_bindgen]
pub fn invert_color(value: u8) -> u8 {
    255 - value
}