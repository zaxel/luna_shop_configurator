export function getWixImageUrl(
  wixImageUrl: string | undefined,
  width: number = 640,
  height: number = 640
): string {
  if (!wixImageUrl) return '/product.png';
  if (wixImageUrl.startsWith('http')) {
    return wixImageUrl;
  }
  
  if (wixImageUrl.startsWith('wix:image://')) {
    const match = wixImageUrl.match(/wix:image:\/\/v1\/([^/]+)/);
    if (match) {
      const imageId = match[1].split('#')[0]; 
      return `https://static.wixstatic.com/media/${imageId}`;
    }
  }
  
  return wixImageUrl;
}