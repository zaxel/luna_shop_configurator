import { getWixImageUrl } from '@/lib/getWixImageUrl';
import { STORES_TREE_REFERENCE } from '@/lib/treeReference';
import { createWixClientServer } from '@/lib/wixClientServer';
import Image from 'next/image';
import Link from 'next/link';

const CategoryList = async () => {
    const wixClientServer = await createWixClientServer();

    const { categories } = await wixClientServer.categories.queryCategories({}, {
        treeReference: STORES_TREE_REFERENCE,
    });

    return (
        <div className='px-4 overflow-x-scroll scrollbar-hide'>
            <div className='flex gap-4 md:gap-8'>
                {(categories ?? []).map(category => {
                    const mainImage = getWixImageUrl(category.image || "/product.png");

                    return <Link key={category._id} href={`/list?cat=${category.slug}`} className='flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6'>
                        <div className='relative bg-slate-100 w-full h-96'>
                            <Image src={mainImage} alt='category hero' sizes="20vw" fill className='object-cover' />
                        </div>
                        <h2 className='mt-8 font-light text-md tracking-wide'>{category.name}</h2>
                    </Link>
                })}

            </div>
        </div>
    );
};

export default CategoryList;