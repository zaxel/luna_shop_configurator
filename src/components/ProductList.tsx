import { createWixClientServer } from '@/lib/wixClientServer';
import { getWixImageUrl } from '@/lib/getWixImageUrl';
import { extractPlainText } from '@/lib/wixRichContent';


import Image from 'next/image';
import Link from 'next/link';
import getSecondImage from '../lib/getSecondImage';
import { STORES_TREE_REFERENCE } from '@/lib/treeReference';
import Pagination from './Pagination';


import type { collections } from '@wix/stores';
type Category = collections.Collection;

type InfoSectionType = {
    _id: string;
    description: any;
};

const PRODUCTS_PER_PAGE = 9;

const ProductList = async ({ categoryId, limit, searchParams }: { categoryId: string, limit?: number, searchParams?: any }) => {
    const wixClientServer = await createWixClientServer();
    let resolvedCategoryId = categoryId;

    // Filter by category
    if (!resolvedCategoryId && searchParams?.cat) {
        const catUpper = searchParams.cat.toUpperCase();

        const { categories } = await wixClientServer.categories.queryCategories(
            {},
            { treeReference: STORES_TREE_REFERENCE }
        );

        const safeCategories: Category[] = categories ?? [];
        resolvedCategoryId = safeCategories.find(
                (cat) => cat.name?.toUpperCase() === catUpper
            )?._id ?? "";
    }

    if (!resolvedCategoryId)
        return null;

    const response = await wixClientServer.categories.listItemsInCategory(
        resolvedCategoryId,
        STORES_TREE_REFERENCE
    );

    const productIds = response.items
        ?.map(item => item.catalogItemId)
        .filter((id): id is string => Boolean(id)) || [];

    if (!productIds.length) return null;

    // Query products by IDs - ONLY use filterable fields
    let productQuery = wixClientServer.productsV3
        .queryProducts()
        .in("_id", productIds);


    // Fetch ALL matching items
    productQuery = productQuery.limit(100);
    const { items  } = await productQuery.find();

    // CLIENT-SIDE FILTERS
    let filteredItems = items || [];

    // Name search 
    if (searchParams?.name) {
        const nameUpper = searchParams.name?.toUpperCase();
        if (!nameUpper) return;
        filteredItems = filteredItems.filter(item => item.name?.toUpperCase().includes(nameUpper));
    }

    // Filter by product type
    if (searchParams?.type) {
        const typeUpper = searchParams.type.toUpperCase();
        filteredItems = filteredItems.filter(item => item.productType === typeUpper);
    }

    // Filter by min price
    if (searchParams?.min) {
        const minPrice = parseFloat(searchParams.min);
        filteredItems = filteredItems.filter(item => {
            const price = parseFloat(item.actualPriceRange?.minValue?.amount || "0");
            return price >= minPrice;
        });
    }

    // Filter by max price
    if (searchParams?.max) {
        const maxPrice = parseFloat(searchParams.max);
        filteredItems = filteredItems.filter(item => {
            const price = parseFloat(item.actualPriceRange?.maxValue?.amount || "999999");
            return price <= maxPrice;
        });
    }


    // Filter by size
    if (searchParams?.size) {
        filteredItems = filteredItems.filter((item: any) =>
            item.options?.some((option: any) =>
                option.name === "Size" &&
                option.choicesSettings?.choices?.some((choice: any) =>
                    choice.key === searchParams.size && choice.inStock
                )
            )
        );
    }
    // Filter by color
    if (searchParams?.color) {
        filteredItems = filteredItems.filter((item: any) =>
            item.options?.some((option: any) =>
                option.name === "Color" &&
                option.choicesSettings?.choices?.some((choice: any) =>
                    choice.key === searchParams.color && choice.inStock
                )
            )
        );
    }

    // CLIENT-SIDE SORTING 
    if (searchParams?.sortBy) {
        const [sortType, sortField] = searchParams.sortBy.split(' ');

        filteredItems.sort((a, b) => {
            let compareResult = 0;

            switch (sortField) {
                case 'price':
                    const priceA = parseFloat(a.actualPriceRange?.minValue?.amount || "0");
                    const priceB = parseFloat(b.actualPriceRange?.minValue?.amount || "0");
                    compareResult = priceA - priceB;
                    break;

                case 'lastUpdated':
                    const dateA = new Date(a._updatedDate || 0).getTime();
                    const dateB = new Date(b._updatedDate || 0).getTime();
                    compareResult = dateA - dateB;
                    break;

                case 'name':
                    const nameA = (a.name || '').toLowerCase();
                    const nameB = (b.name || '').toLowerCase();
                    compareResult = nameA.localeCompare(nameB);
                    break;

                default:
                    compareResult = 0;
            }

            return sortType === 'asc' ? compareResult : -compareResult;
        });
    }

    // Client-side pagination
    const currentPage = searchParams?.page ? parseInt(searchParams.page) : 0;
    const itemsPerPage = limit || PRODUCTS_PER_PAGE;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);

    // Calculate pagination state
    const hasPrev = currentPage > 0;
    const hasNext = endIndex < filteredItems.length;

    let infoSection: InfoSectionType[] = [];

    if (paginatedItems.length) {
        const infoSectionIds = paginatedItems
            .map(item => item.infoSections?.[3]?._id)
            .filter((id): id is string => !!id);

        if (!infoSectionIds.length) {
            infoSection = [];
        } else {
            const myQuery = {
                filter: {
                    "_id": { "$in": infoSectionIds }
                }
            };
            const resp = await wixClientServer.infoSectionsV3.queryInfoSections(myQuery);
            infoSection = (resp.infoSections ?? []).filter(
                (info): info is InfoSectionType =>
                    typeof info?._id === 'string' && info.description != null
            );
        }
    }

    const infoSectionMap = new Map(
        infoSection.map(info => [info._id, info])
    );

    return (
        <>
            <div className='mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap'>
                {(paginatedItems ?? []).map((item) => {
                    const minPrice = item.actualPriceRange?.minValue?.amount;
                    const maxPrice = item.actualPriceRange?.maxValue?.amount;
                    const priceDisplay = minPrice === maxPrice
                        ? `$${minPrice}`
                        : `$${minPrice} - $${maxPrice}`;

                    const mainImage = getWixImageUrl(item.media?.main?.image || "/product.png");
                    const hoverImage = getSecondImage(item);

                    const compareAtPrice = item.compareAtPriceRange?.minValue?.amount;
                    const isOnSale = compareAtPrice && parseFloat(compareAtPrice) > 0;


                    const shortDescId = item.infoSections?.[3]?._id;
                    const info = shortDescId ? infoSectionMap.get(shortDescId) : null;

                    return (
                        <Link
                            key={item._id}
                            href={`/${item.slug}`}
                            className='w-full sm:w-[45%] lg:w-[22%] flex flex-col gap-4'
                        >
                            <div className='relative w-full h-80'>
                                <Image
                                    className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-all ease-in-out duration-500'
                                    src={mainImage}
                                    alt={item.media?.main?.altText || item.name || 'Product'}
                                    fill
                                    sizes='25vw'
                                />
                                <Image
                                    className='absolute object-cover rounded-md'
                                    src={hoverImage}
                                    alt={item.name || 'Product'}
                                    fill
                                    sizes='25vw'
                                />
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-medium'>{item.name}</span>
                                <span className='font-semibold'>
                                    {isOnSale && (
                                        <span className='line-through text-gray-400 text-xs mr-2'>
                                            ${compareAtPrice}
                                        </span>
                                    )}
                                    {priceDisplay}
                                </span>
                            </div>
                            <div className='text-sm text-gray-500'>
                                {info ? extractPlainText(info.description) : 'No description available'}
                            </div>
                            <button className='rounded-2xl ring-1 ring-luna text-luna w-max py-2 px-4 text-xs hover:bg-luna hover:text-white'>
                                Add to Cart
                            </button>
                        </Link>
                    );
                })}


            </div>

            {(searchParams?.cat || searchParams?.name) && <Pagination
                currentPage={currentPage || 0}
                hasPrev={hasPrev}
                hasNext={hasNext}
            />}
        </>

    );
};

export default ProductList;