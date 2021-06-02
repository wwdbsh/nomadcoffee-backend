export const processCategories = categories => {
    return categories.map(category => ({
        where:{ name:category },
        create:{ name:category, slug:category.toLowerCase().replaceAll(" ", "-") }
    }));
};

export const processPhotos = (photos) => {
    return photos.map(url => ({
        where:{ url },
        create:{ url }
    }));
};