// Load environment variables
import { config } from 'dotenv';
const dotenv = config({
    path: '.env',
    encoding: 'utf8',
    debug: process.env.NODE_ENV === 'development',
})

if (dotenv.error) {
    console.error(dotenv.error)
    process.exit(1)
} else {
    console.log('Loaded environment variables 🌎')
}

import { getRandomPhotos, prepareImageLabelingBatch } from './unsplash.js';
import cron from 'node-cron'
import { twitterHandles } from './handles.js'
import { retrieveUserTweets, prepareLikeTweets, prepareRetweets } from './twitter.js'
import { createImageLabelerBatch, createLikeBatch, createRetweetBatch } from './effect.js'

// Twitter parameters and Effect parameters
const tweet_instruction = process.env.RETWEET_INSTRUCTION ?? 'Be sure to follow task instructions and be decent.'
const max_results = Number(process.env.TWITTER_MAX_RESULTS)
const reps = Number(process.env.QUALIFIER_REPS)
console.log('Startup Effect Bot 🤖', new Date())

await mainPhoto()

// https://crontab.guru/#0_6,12_*_*_*
const cronSchedule = "0 12 * * *"
cron.schedule(cronSchedule, async () => {
    console.log('Running cron job 🤖', new Date())E
    await mainPhoto()
    // await mainTwitter()
    console.log('Finished cron job 🤖', new Date())
})

async function mainPhoto () {
    console.log('Getting images for image labeling campaign 🖼')
    const images = await getRandomPhotos(max_results)
    console.log(`Retrieved ${images} images`)
    const batch = prepareImageLabelingBatch(images)
    await createImageLabelerBatch(batch, reps)
    console.log('Finished image labeling campaign 🖼')
}

async function mainTwitter () {
    console.log('Retrieving tweets from Twitter 🐦')
    console.table(twitterHandles)
    for (const handle of twitterHandles) {
        try {
            const userTweets = await retrieveUserTweets(handle, max_results)
            console.log('userTweets', userTweets)

            const tweetsToLike = prepareLikeTweets(userTweets)
            console.table(tweetsToLike)
            await createLikeBatch(tweetsToLike, reps)

            const tweetsToRetweet = prepareRetweets(userTweets, tweet_instruction)
            console.table(tweetsToRetweet)
            await createRetweetBatch(tweetsToRetweet, reps)
        } catch (error) {
            console.error(error)
        }
    }
}