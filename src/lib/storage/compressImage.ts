import imageCompression from "browser-image-compression";

export async function compressImage(file: File) {
    return await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        useWebWorker: true
    });
}