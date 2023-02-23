import { createApi} from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types.js';
import { config } from 'dotenv';

// Load environment variables
const dotenv = config({
    path: '.env',
    encoding: 'utf8',
    debug: process.env.NODE_ENV === 'development',
})

const unsplash = createApi({
    accessKey: String(process.env.UNSPLASH_ACCESS_KEY),
    fetch: fetch,
});

export const getRandomPhotos = async (count: number) => {
    const random = await unsplash.photos.getRandom({ count: count, contentFilter: 'high' });

    if (random.errors) {
        throw new Error(random.errors[0]);
    } else {
        if (Array.isArray(random.response)) {
            return random.response;
        } else {
            return [random.response];
        }
    }
}

export interface ImageLabelingBatch {
    tasks: {
        image_url: string;
    }[]
}

export const prepareImageLabelingBatch = (photos: Random[]) => {
    const tasks = photos.map((photo) => {
        return {
            image_url: photo.urls.regular,
        };
    });

    return {
        tasks,
    };
}
export type Photo = {
    id: number;
    width: number;
    height: number;
    urls: { large: string; regular: string; raw: string; small: string };
    color: string | null;
    user: {
      username: string;
      name: string;
    };
};
