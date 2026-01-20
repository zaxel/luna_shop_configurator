"use client"
import { colorMap } from "@/const/colorMap";
import { useWixClient } from "@/hooks/useWixClient";
import { STORES_TREE_REFERENCE } from "@/lib/treeReference";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { collections } from "@wix/stores";

type Collection = collections.Collection;

type FilterClientPropsType = {
    categories: Collection[];
}


const FilterClient = ({ categories }: FilterClientPropsType) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const selectedCat = searchParams.get("cat") ?? "";

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className='mt-12 flex justify-between'>
            <div className='flex flex-wrap gap-6'>
                <select onChange={handleFilterChange} name="type" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
                    <option value="">Type</option>
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                </select>

                <input onBlur={handleFilterChange} type="text" name='min' placeholder='min price' className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400' />
                <input onBlur={handleFilterChange} type="text" name='max' placeholder='max price' className='text-xs rounded-2xl pl-2 w-24 ring-1 ring-gray-400' />

                <select onChange={handleFilterChange} name="size" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
                    <option value="" >Size</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                </select>
                <select onChange={handleFilterChange} name="color" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
                    <option value="" >Color</option>
                    {(Object.keys(colorMap) ?? []).map(color => {
                        return <option key={color} value={color}>{color}</option>
                    })}
                </select>

                <select
                    name="cat"
                    value={selectedCat}
                    onChange={handleFilterChange}
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option value="">All products</option>

                    {categories.map((cat) => (
                        <option key={cat._id} value={cat.slug ?? ""}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <select onChange={handleFilterChange} name="sortBy" className='py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]'>
                    <option value="">Sort By</option>
                    <option value="asc price">Price (low to high)</option>
                    <option value="desc price">Price (high to low)</option>
                    <option value="desc lastUpdated">Newest</option>
                    <option value="asc lastUpdated">Oldest</option>
                </select>
            </div>
        </div>
    );
};

export default FilterClient;