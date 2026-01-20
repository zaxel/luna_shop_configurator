import { getWixImageUrl } from './getWixImageUrl';

const getSecondaryImages = (item: any): string[] => {
    const fallbackImage = "/product.png";

    const firstOption = item.productOptions?.[0];
    const firstChoice = firstOption?.choices?.[0];
    const linkedImagesObjs = firstChoice?.media?.items || firstChoice?.media;

    if (!linkedImagesObjs || !linkedImagesObjs.length) {
        return [fallbackImage];
    }
    
    const res = linkedImagesObjs
        .map((imageData: any) => getWixImageUrl(imageData.image?.url || imageData.url))
        .filter((img: string): img is string => img !== fallbackImage);

    return res.length > 0 ? res : [fallbackImage];
}

export default getSecondaryImages;