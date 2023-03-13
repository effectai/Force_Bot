import { Batch } from '@effectai/effect-js/dist/lib/types/batch.js';
import papaparse from 'papaparse';
import { efxTaskProxy, createNftCategorizationBatch, batch } from './effect.js';
import { env } from './env.js';

export const getLatestNftImageUrl = async (): Promise<NftLink> => {
    try {
        const batches: Batch[] = await efxTaskProxy.force.getCampaignBatches(env.EFFECT_NFT_CATEGORIZATION_CAMPAIGN_ID)
        if (!batches || batches.length === 0) {
            console.log(`No batches found for campaign #${env.EFFECT_NFT_CATEGORIZATION_CAMPAIGN_ID}`)
            return Promise.resolve({ image_url: '' })
        } else {
            const ipfsData = await efxTaskProxy.force.getIpfsContent(batches[batches.length - 1].content.field_1)
            if (!ipfsData || !ipfsData.tasks || ipfsData.tasks.length === 0) {
                return Promise.reject(`No tasks found for batch #${env.EFFECT_NFT_CATEGORIZATION_CAMPAIGN_ID}`)
            } else {
                const lastTask = ipfsData.tasks[ipfsData.tasks.length - 1]
                return Promise.resolve(lastTask)
            }
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

interface NftLink {
    image_url: string;
}

export const getNftUrls = async (): Promise<NftLink[]> => {
    try {
        const urls = await fetch(env.NFT_URL)
        const response = await urls.text()
        const nftList = papaparse.parse(response, { header: true })?.data
        return nftList as unknown as NftLink[]
    } catch (error) {
        console.error(error)
        throw error
    }
}

export const createNftBatch = async () => {
    try {
        const nftUrls = await getNftUrls()
        console.debug('nftUrls', nftUrls.slice(0, 2))
        const lastNftUrl = await getLatestNftImageUrl()
        console.debug('lastNftUrl', lastNftUrl)

        if (lastNftUrl.image_url.length === 0) {
            console.log('No last nft url found, starting from beginning')
            const batch = { tasks: nftUrls.slice(0, env.TASKPROXY_TASKS) }
            await createNftCategorizationBatch(batch, env.TASKPROXY_REPS);
        } else {
            console.log('Last nft url found, starting from there')
            const index = nftUrls.map(img => img.image_url).indexOf(lastNftUrl.image_url)
            console.log('index', index)
            const batch = { tasks: nftUrls.slice(index, env.TASKPROXY_TASKS + index) }
            console.log(batch)
            await createNftCategorizationBatch(batch, env.TASKPROXY_REPS);
        }

    } catch (error) {
        console.error(error)
        throw error
    }
}
