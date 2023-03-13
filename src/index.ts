// Load environment variables
import { Env, loadEnv, env } from './env.js';
loadEnv();

// Load imports
import cron from 'node-cron'
import { createNftBatch } from './nft_cat.js';
import { createImageLabelerBatch, createLikeBatch, createNftCategorizationBatch, createRetweetBatch } from './effect.js'
import { retrieveUserTweets, prepareLikeTweets, prepareRetweets } from './twitter.js'
import { getRandomPhotos, prepareImageLabelingBatch } from './unsplash.js';

console.log('Startup Effect Bot 🤖', new Date())

// https://crontab.guru/#0_6,12_*_*_*
// const cronSchedule = "0 12 * * *"
// cron.schedule(cronSchedule, async () => {
    //     console.log('Running cron job 🤖', new Date())
        // await mainNftResearch()
        // await mainPhotoLabeler()
//     // await mainTwitter()
//     console.log('Finished cron job 🤖', new Date())
// })

/**
 * Main function to run the image labeling campaign
 */
async function mainPhotoLabeler () {
    console.log('Getting images for image labeling campaign 🖼')
    const images = await getRandomPhotos(env.TWITTER_MAX_RESULTS)
    console.log(`Retrieved ${images} images`)
    const batch = prepareImageLabelingBatch(images)
    await createImageLabelerBatch(batch, env.TASKPROXY_REPS)
    console.log('Finished image labeling campaign 🖼')
}

/**
 * Main function nft labeler
 */
async function mainNftResearch () {
    try {
        await createNftBatch()
    } catch (error) {
        console.error(error)
    }
}

/**
 * Main function to run the Twitter bot
 */
async function mainTwitter () {
    console.log('Retrieving tweets from Twitter 🐦')
    console.table(env.TWITTER_HANDLES)
    const handles = env.TWITTER_HANDLES.split(',')
    for (const handle of handles) {
        try {
            const userTweets = await retrieveUserTweets(handle, env.TWITTER_MAX_RESULTS)
            console.log('userTweets', userTweets)

            const tweetsToLike = prepareLikeTweets(userTweets)
            console.table(tweetsToLike)
            await createLikeBatch(tweetsToLike, env.TASKPROXY_REPS)

            const tweetsToRetweet = prepareRetweets(userTweets, env.RETWEET_INSTRUCTION)
            console.table(tweetsToRetweet)
            await createRetweetBatch(tweetsToRetweet, env.TASKPROXY_REPS)
        } catch (error) {
            console.error(error)
        }
    }
}
