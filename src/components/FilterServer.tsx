import { createWixClientServer } from '@/lib/wixClientServer';
import React from 'react';
import FilterClient from './FilterClient';
import { STORES_TREE_REFERENCE } from '@/lib/treeReference';

const FilterServer = async() => {
    const wix = await createWixClientServer();

    const { categories } = await wix.categories.queryCategories(
        {},
        { treeReference: STORES_TREE_REFERENCE }
    );

    return <FilterClient categories={categories ?? []} />;
};

export default FilterServer;