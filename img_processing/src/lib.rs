use image::DynamicImage;
// Import de wasm
use wasm_bindgen::prelude::*;
use std::io::Cursor;

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
pub fn negative_filter(image_data: &[u8]) -> Vec<u8> {
    let image = image::load_from_memory(image_data).expect("Failed to open the file");
    // Convierte a RGBA8 para poder manipular los píxeles
    let mut rgba = image.to_rgba8();
    for pixel in rgba.pixels_mut() {
        let rgb_data = pixel.0; // [R, G, B, A]
        pixel.0[0] = 255 - rgb_data[0]; // R
        pixel.0[1] = 255 - rgb_data[1]; // G
        pixel.0[2] = 255 - rgb_data[2]; // B
    }
    // Convierte de nuevo al formato original
    let inverted_image = DynamicImage::ImageRgba8(rgba);

    let mut buf = Cursor::new(Vec::new());
    inverted_image.write_to(&mut buf, image::ImageFormat::Png).expect("Failed to write the image");
    buf.into_inner()
}

#[wasm_bindgen]
pub fn grayscale_filter(image_data: &[u8]) -> Vec<u8> {
    let image = image::load_from_memory(image_data).expect("Failed to open the file");
    let gray_image = image.grayscale();

    let mut buf = Cursor::new(Vec::new());
    gray_image.write_to(&mut buf, image::ImageFormat::Png).expect("Failed to write the image");
    buf.into_inner()
}

#[wasm_bindgen]
// Valores extraidos de https://stackoverflow.com/questions/59143570/whats-the-formula-for-converting-a-rgb-image-to-the-sepia-filter
pub fn sepia_filter(image_data: &[u8]) -> Vec<u8> {
    let image = image::load_from_memory(image_data).expect("Failed to open the file");
    
    let mut rgba = image.to_rgba8();
    for pixel in rgba.pixels_mut() {
        let rgb_data = pixel.0; // [R, G, B, A]
        let r = rgb_data[0] as f32;
        let g = rgb_data[1] as f32;
        let b = rgb_data[2] as f32;
        let sr = 0.393*r + 0.769*g + 0.189*b;
        let sg = 0.349*r + 0.686*g + 0.168*b;
        let sb = 0.272*r + 0.534*g + 0.131*b;
        pixel.0[0] = if sr > 255.0 { 255 } else { sr as u8 }; // R
        pixel.0[1] = if sg > 255.0 { 255 } else { sg as u8 }; // G
        pixel.0[2] = if sb > 255.0 { 255 } else { sb as u8 }; // B
    }
    // Convierte de nuevo al formato original
    let sepia_image = DynamicImage::ImageRgba8(rgba);

    let mut buf = Cursor::new(Vec::new());
    sepia_image.write_to(&mut buf, image::ImageFormat::Png).expect("Failed to write the image");
    buf.into_inner()
}