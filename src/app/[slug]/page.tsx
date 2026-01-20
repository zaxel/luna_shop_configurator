import type { products } from '@wix/stores';
import { createWixClientServer } from '@/lib/wixClientServer';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/product/ProductCard';
import Product3DColorConfigurator from '@/components/product/Product3DColorConfigurator';
import Product3DCustomizer from '@/components/product/Product3DCustomizer';

const sneakers3DSlug = "3d-sneakers";
const tShirt3DSlug = "3d-t-shirt";

const SinglePage = async ({ params }: { params: { slug: string } }) => {

    const { slug } = await params;
    const wixClientServer = await createWixClientServer();

    const { items } = await wixClientServer.products
        .queryProducts()
        .eq("slug", slug)
        .find();

    const item: products.Product | undefined = items[0];
    if (!item)
        return notFound();
    
    if(slug === sneakers3DSlug)
        return <Product3DColorConfigurator item={item} />
    
    if(slug === tShirt3DSlug)
        return <Product3DCustomizer item={item} /> 
    
    return <ProductCard item={item} />
    
};

export default SinglePage;