import cron from 'node-cron';
import { twitterHandles } from './handles.js';
import { retrieveUserTweets } from './twitter.js';

/**
 * Run a task every minute ⏲
 */
const cronSchedule = "* */360 * * *"
//                    │  │  │ │ └──── day of week
//                    │  │  │ └────── month
//                    │  │  └──────── day of month
//                    │  └─────────── every hour
//                    └────────────── minute

cron.schedule(cronSchedule, () => {
    console.log('Running cron job 🤖', new Date())
    // for (const handle of twitterHandles) {
    //     await main(handle)
    // }
})

/**
 * Utility functions 🧰
 */
const main = async () => {
    const handle = twitterHandles[1]
    console.log('Running main function 🤖', handle, new Date())
    await retrieveUserTweets(handle, 5)
}

await main()