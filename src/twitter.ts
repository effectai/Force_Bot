import { TweetV2, TwitterApi } from "twitter-api-v2";
import { config } from "dotenv";

config({
    path: '.env',
    debug: true,
})

/**
 * Set up the Twitter API 🐦
*/
const {
    TWITTER_BEARER_TOKEN,
} = process.env
const twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN!)

/**
 * Retrieve user tweets 📝
 * @param twitterHandle Username of the Twitter user
 * @param max_results max number of tweets to retrieve (min: 5, max: 100)
 * @returns Promise<TweetV2[] | undefined>
 */
export const retrieveUserTweets = async (twitterHandle: string, max_results: number): Promise<TweetV2[] | undefined> => {
    try {
        const user = await twitterClient.v2.userByUsername(twitterHandle)
        const userTimeline = await twitterClient.v2.userTimeline(user.data.id, { max_results })
        return userTimeline?.data?.data
    } catch (error) {
        console.error(error)
    }
}

// export const prepareLikeTweets = async (userTimeline: TweetV2[]) => {
//     try {
//         const likeTweets = userTimeline.map(tweet => ({ 'tweet': `${user.data.username}/${tweet.id}` }))
//         const likeBatch = { tasks: likeTweets }
//     } catch (error) {
//         console.error(error)
//     }
// }

// export const prepareRetweets = async (userTimeline: TweetV2[]) => {
//     try {
//         const retweets = userTimeline.map(tweet => ({ 'tweet': `${user.data.username}/${tweet.id}` }))
//         const retweetBatch = { tasks: retweets }
//     } catch (error) {
//         console.error(error)
//     }
// }

// export const prepareFollows = async (twitterHandles: string[]) => {
//     try {
//         const follows = twitterHandles.map(handle => ({ 'user': handle }))
//         const followBatch = { tasks: follows }
//     } catch (error) {
//         console.error(error)
//     }
// }

// export const prepareComments = async (userTimeline: TweetV2[]) => {
//     try {
//         const comments = userTimeline.map(tweet => ({ 'tweet': `${user.data.username}/${tweet.id}`, 'content': '🔥' }))
//         const commentBatch = { tasks: comments }
//     } catch (error) {
//         console.error(error)
//     }
// }

