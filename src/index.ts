import { config } from 'dotenv'
import cron from 'node-cron'
import { twitterHandles } from './handles.js'
import { retrieveUserTweets, prepareLikeTweets, prepareRetweets } from './twitter.js'
import { createLikeBatch, createRetweetBatch } from './effect.js'

// Load environment variables
const dotenv = config({
    path: '.env',
    encoding: 'utf8',
    debug: process.env.NODE_ENV === 'development',
})

if (dotenv.error) {
    throw dotenv.error
} else {
    console.log('Loaded environment variables')
}

// Twitter parameters and Effect parameters
const tweet_instruction = process.env.RETWEET_INSTRUCTION ?? 'Be sure to follow task instructions and be decent.'
const max_results = Number(process.env.TWITTER_MAX_RESULTS)
const reps = Number(process.env.QUALIFIER_REPS)

// Run a task every nth ⏲
// https://crontab.guru/#0_6,12_*_*_*
const cronSchedule = "0 6,12 * * *"

console.log('Startup Effect Bot 🤖', new Date())

cron.schedule(cronSchedule, async () => {
    console.log('Running cron job 🤖', new Date())
    for (const handle of twitterHandles) {
        try {
            const userTweets = await retrieveUserTweets(handle, max_results)
        
            const tweetsToLike = prepareLikeTweets(userTweets)
            createLikeBatch(tweetsToLike, reps)
    
            const tweetsToRetweet = prepareRetweets(userTweets, tweet_instruction)
            createRetweetBatch(tweetsToRetweet, reps)
        } catch (error) {
            console.error(error)
        }
    }
})
