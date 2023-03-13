import { createApi} from 'unsplash-js';
import { Random } from 'unsplash-js/dist/methods/photos/types.js';
import { config } from 'dotenv';
import nodeFetch from 'node-fetch'

// import { UNSPLASH_ACCESS_KEY } from './index.js';
import { env } from './env.js'

const unsplash = createApi({
    accessKey: env.UNSPLASH_ACCESS_KEY,
    fetch: nodeFetch as any,
});

export const getRandomPhotos = async (count: number) => {
    const random = await unsplash.photos.getRandom({ count: count, contentFilter: 'low' });

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
