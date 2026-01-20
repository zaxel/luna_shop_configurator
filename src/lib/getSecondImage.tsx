import { getWixImageUrl } from './getWixImageUrl';

const getSecondImage = (item: any) => {
    let hoverImage = "/product.png";

    const firstOption = item.options?.[0];
    const firstChoice = firstOption?.choicesSettings?.choices?.[0];
    const linkedImage = firstChoice?.linkedMedia?.[0]?.image;

    if (linkedImage) {
        hoverImage = getWixImageUrl(linkedImage);
    }
    return hoverImage;
}

export default getSecondImage;