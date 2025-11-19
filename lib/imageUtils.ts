/**
 * Converts Base64 image data to data URL for items
 */
export function convertImagesToDataUrls<T extends { image?: string; imageType?: string }>(
    items: T[]
): (T & { imageUrl?: string })[] {
    return items.map(item => {
        const obj = { ...item };
        if (obj.image && obj.imageType) {
            (obj as any).imageUrl = `data:${obj.imageType};base64,${obj.image}`;
        }
        return obj;
    });
}

/**
 * Converts Base64 image data to data URL for a single item
 */
export function convertImageToDataUrl<T extends { image?: string; imageType?: string }>(
    item: T
): T & { imageUrl?: string } {
    const obj = { ...item };
    if (obj.image && obj.imageType) {
        (obj as any).imageUrl = `data:${obj.imageType};base64,${obj.image}`;
    }
    return obj;
}
