import { getWixImageUrl } from './getWixImageUrl';


const getSecondaryImages = (item: any): string[] => {
    const fallbackImage = "/product.png";

    const firstOption = item.options?.[0];
    const firstChoice = firstOption?.choicesSettings?.choices?.[0];
    const linkedImagesObjs = firstChoice?.linkedMedia;
    
    if (linkedImagesObjs && linkedImagesObjs.length > 0) {
        return linkedImagesObjs
            .map((imageData: any) => getWixImageUrl(imageData.image))
            .filter((img: string): img is string => img !== fallbackImage);
    }

    return [fallbackImage];
}

export default getSecondaryImages;