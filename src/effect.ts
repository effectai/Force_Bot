import { LikeBatch, CommentBatch, FollowBatch, RetweetBatch } from './twitter.js'
import { EffectClient } from '@effectai/effect-js'
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig.js"
import { ImageLabelingBatch } from './unsplash.js'
import { printPrice } from './utils.js';

import { env, loadEnv } from './env.js'
loadEnv();

/******************************************************************************
 * Set up the Effect API 🦾
 *****************************************************************************/
const signatureProvider = new JsSignatureProvider([env.EOS_PRIVATE_KEY])

export const efxTaskProxy = new EffectClient(env.EOS_ENV)
await efxTaskProxy.connectAccount(signatureProvider, {
    accountName: env.EFXTASKPROXY_ACCOUNT_NAME,
    permission: env.EFXTASKPROXY_ACCOUNT_PERMISSION,
    publicKey: env.EOS_PUBLIC_KEY
}).catch((err) => {
    console.log('Error connecting to Effect Task Proxy, exiting...')
    console.error(err)
    process.exit(1)
})

export const efxQualifier = new EffectClient(env.EOS_ENV)
await efxQualifier.connectAccount(signatureProvider, {
    accountName: env.EFXQUALIFIER_ACCOUNT_NAME,
    permission: env.EFXQUALIFIER_ACCOUNT_PERMISSION,
    publicKey: env.EOS_PUBLIC_KEY
}).catch((err) => {
    console.log('Error connecting to Effect Qualifier, exiting...')
    console.error(err)
    process.exit(1)
})

/******************************************************************************
 * Task Batches
 *****************************************************************************/

export const createLikeBatch = async (batch: LikeBatch, reps: number) => {
    printPrice(env.EFFECT_LIKE_CAMPAIGN_ID, reps, batch.tasks.length)
    efxTaskProxy.force.createBatch(env.EFFECT_LIKE_CAMPAIGN_ID, batch, reps).then(console.log).catch(err => { throw err })
}

export const createCommentBatch = async (batch: CommentBatch, reps: number) => {
    printPrice(env.EFFECT_COMMENT_CAMPAIGN_ID, reps, batch.tasks.length)
    efxTaskProxy.force.createBatch(env.EFFECT_COMMENT_CAMPAIGN_ID, batch, reps).then(console.log).catch(err => { throw err })
}

export const createFollowBatch = async (batch: FollowBatch, reps: number) => {
    printPrice(env.EFFECT_FOLLOWS_CAMPAIGN_ID, reps, batch.tasks.length)
    efxTaskProxy.force.createBatch(env.EFFECT_FOLLOWS_CAMPAIGN_ID, batch, reps).then(console.log).catch(err => { throw err })
}

export const createRetweetBatch = async (batch: RetweetBatch, reps: number) => {
    printPrice(env.EFFECT_RETWEETS_CAMPAIGN_ID, reps, batch.tasks.length)
    efxTaskProxy.force.createBatch(env.EFFECT_RETWEETS_CAMPAIGN_ID, batch, reps).then(console.log).catch(err => { throw err })
}

export const createImageLabelerBatch = async (batch: ImageLabelingBatch, reps: number) => {
    printPrice(env.EFFECT_IMAGE_LABELING_CAMPAIGN_ID, reps, batch.tasks.length)
    efxTaskProxy.force.createBatch(env.EFFECT_IMAGE_LABELING_CAMPAIGN_ID, batch, reps).then(console.log).catch(err => { throw err })
}

export const createNftCategorizationBatch = async (batch: ImageLabelingBatch, reps: number) => {
    printPrice(env.EFFECT_NFT_CATEGORIZATION_CAMPAIGN_ID, reps, batch.tasks.length)
    efxTaskProxy.force.createBatch(env.EFFECT_NFT_CATEGORIZATION_CAMPAIGN_ID, batch, reps).then(console.log).catch(err => { throw err })
}

/******************************************************************************
 * Qualifier Batches
 *****************************************************************************/

export const createHumanQualifierBatch = async () => {
    efxQualifier.force.createBatch(env.EFFECT_HUMAN_QUALIFIER, [], env.QUALIFIER_REPS).then(console.log).catch(err => { throw err })
}

export const createTwitterQualifierBatch = async () => {
    efxQualifier.force.createBatch(env.EFFECT_TWITTER_QUALIFIER, [], env.QUALIFIER_REPS).then(console.log).catch(err => { throw err })
}

export const createInstagramQualifierBatch = async () => {
    efxQualifier.force.createBatch(env.EFFECT_INSTAGRAM_QUALIFIER, [], env.QUALIFIER_REPS).then(console.log).catch(err => { throw err })
}

export const createYoutubeQualifierBatch = async () => {
    efxQualifier.force.createBatch(env.EFFECT_YOUTUBE_QUALIFIER, [], env.QUALIFIER_REPS).then(console.log).catch(err => { throw err })
}

export const createNftResearchQualifierBatch = async () => {
    efxQualifier.force.createBatch(env.EFFECT_NFT_RESEARCH_QUALIFIER, [], env.QUALIFIER_REPS).then(console.log).catch(err => { throw err })
}

export const createImageClassificationQualifierBatch = async () => {
    efxQualifier.force.createBatch(env.EFFECT_IMAGE_CLASSIFICATION_QUALIFIER, [], env.QUALIFIER_REPS).then(console.log).catch(err => { throw err })
}
