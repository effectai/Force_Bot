import { TweetV2, TwitterApi, UserV2Result } from "twitter-api-v2"
import { config } from "dotenv"

// import { TWITTER_BEARER_TOKEN } from "./index.js"
import { env, loadEnv } from "./env.js"

loadEnv();

/**
 * Set up the Twitter API 🐦
*/
const twitterClient = new TwitterApi(env.TWITTER_BEARER_TOKEN)

/**
 * User timeline 📝
 * @interface UserTimeline
 * @property {UserV2Result} user
 * @property {TweetV2[]} timeline
 * @returns UserTimeline
 */
export interface UserTimeline {
    user: UserV2Result,
    timeline: TweetV2[]
}

/**
 * Retrieve user tweets 📝
 * @param twitterHandle Username of the Twitter user
 * @param max_results max number of tweets to retrieve (min: 5, max: 100)
 * @returns Promise<TweetV2[]>
 */
export const retrieveUserTweets = async (twitterHandle: string, max_results: number): Promise<UserTimeline> => {
    try {
        const user = await twitterClient.v2.userByUsername(twitterHandle)

        const userTimeline = await twitterClient.v2.userTimeline(user.data.id, {
            max_results: max_results,
            exclude: ['retweets', 'replies'],
            start_time: new Date(Date.now() - env.TWITTER_HOUR_INTERVAL * 60 * 60 * 1000).toISOString() // hours ago
        })
        return { user, timeline: userTimeline.data.data }
    } catch (error) {
        throw error
    }
}

/******************************************************************************
 * Prepare a batch of tweets to like 💬
 *****************************************************************************/
export interface LikeBatch {
    tasks: {
        tweet: string
    }[]
}

/**
 * Prepare a batch of tweets to like 🤍
 * https://app.effect.network/campaigns/14/
 * Campaign template has has the following placeholder:
 * { 'tweet': "nosana/1594994422856306688" }
 * @param userTimeline
 * @returns LikeBatch
 */
export const prepareLikeTweets = (userTimeline: UserTimeline): LikeBatch => {
    const userName = userTimeline.user.data.username
    if (userTimeline && userTimeline.timeline && userTimeline.timeline.length) {
        const likeTweets = userTimeline.timeline.map(tweet => ({ 'tweet': `${userName}/${tweet.id}` }))
        const likeBatch = { tasks: likeTweets }
        return likeBatch
    } else {
        throw new Error('No tweets found')
    }
}
/******************************************************************************
 * Prepare a batch of tweets to retweet 💬
 *****************************************************************************/
export interface RetweetBatch {
    tasks: {
        tweet_instructions: string,
        tweet_id: string
    }[]
}

/**
 * Prepare a batch of tweets to retweet 🔄
 * https://app.effect.network/campaigns/16/
 * Campaign template has has the following placeholder:
 * { 'tweet_instructions': "Lorem Ipsum", 'tweet_id': "nosana/1594994422856306688" }
 * @param userTimeline
 * @param tweet_instructions
 * @returns RetweetBatch
 */
export const prepareRetweets = (userTimeline: UserTimeline, tweet_instructions: string): RetweetBatch => {
    // const userName = userTimeline.user.data.username
    if (userTimeline && userTimeline.timeline && userTimeline.timeline.length) {
        const retweets = userTimeline.timeline.map(tweet => {
            return {
                'tweet_instructions': tweet_instructions,
                'tweet_id': `${tweet.id}`
            }
        })
        const retweetBatch = { tasks: retweets }
        return retweetBatch
    } else {
        throw new Error('No tweets found')
    }
}

/******************************************************************************
 * Prepare a batch of tweets to Comment on 💬
 *****************************************************************************/
export interface CommentBatch {
    tasks: {
        tweet_instructions: string,
        tweet_id: string
    }[]
}

/**
 * TODO: These need to implement
 * Prepare a batch of tweets to comment on 💬
 * https://app.effect.network/campaigns/17/
 * Campaign template has has the following placeholder:
 * { 'tweet_instructions': "Lorem Ipsum", 'tweet_id': "1594994422856306688" }
 * @param userTimeline
 * @returns CommentBatch
 * TODO: Does the template need to updated to include the username?
 */
export const prepareComments = (userTimeline: UserTimeline, tweet_instructions: string): CommentBatch => {
    const username = userTimeline.user.data.username
    const comments = userTimeline.timeline.map(tweet => {
        return {
            'tweet_instructions': tweet_instructions,
            'tweet_id': `${tweet.id}`
        }
    })
    const commentBatch = { tasks: comments }
    return commentBatch
}

/******************************************************************************
 * Prepare a batch of twitter users to follow 👥
 *****************************************************************************/
export interface FollowBatch {
    tasks: {
        twitter_handle: string
    }[]
}

/**
 * Prepare a batch of users to follow 👥
 * https://app.effect.network/campaigns/15/
 * Campaign template has has the following placeholder:
 *
 * @param twitterHandles
 * @returns FollowBatch
 */
export const prepareFollows = (twitterHandles: string[]): FollowBatch => {
    const follows = twitterHandles.map(handle => ({ 'twitter_handle': handle }))
    const followBatch = { tasks: follows }
    return followBatch
}
