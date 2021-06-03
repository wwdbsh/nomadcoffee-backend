import { FileUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";

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

export const handleFile = async (file, id) => {
    const { filename, createReadStream } = await file;
    const newFilename = `${id}-${Data.now()}-${filename}`;
    const readStream = createReadStream();

    const writeStream = createWriteStream(path.join(process.cwd(), "uploads", newFilename));
    readStream.pipe(writeStream);
    return `http://localhost:4000/static/${newFilename}`;
};