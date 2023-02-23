import { LikeBatch, CommentBatch, FollowBatch, RetweetBatch } from './twitter.js'
import { EffectClient } from '@effectai/effect-js'
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig.js"
import { config } from 'dotenv'
import { ImageLabelingBatch } from './unsplash.js'

config({
    path: '.env',
    encoding: 'utf8',
    debug: process.env.NODE_ENV === 'development',
})

const {
    EOS_ENV,
    QUALIFIER_REPS,
    EOS_PRIVATE_KEY,
    EOS_PUBLIC_KEY,
    EFXTASKPROXY_ACCOUNT_NAME,
    EFXTASKPROXY_ACCOUNT_PERMISSION,
    EFXQUALIFIER_ACCOUNT_NAME,
    EFXQUALIFIER_ACCOUNT_PERMISSION,
    EFFECT_LIKE_CAMPAIGN_ID,
    EFFECT_FOLLOWS_CAMPAIGN_ID,
    EFFECT_RETWEETS_CAMPAIGN_ID,
    EFFECT_COMMENT_CAMPAIGN_ID,
    EFFECT_HUMAN_QUALIFIER,
    EFFECT_TWITTER_QUALIFIER,
    EFFECT_INSTAGRAM_QUALIFIER,
    EFFECT_YOUTUBE_QUALIFIER,
    EFFECT_NFT_RESEARCH_QUALIFIER,
    EFFECT_IMAGE_CLASSIFICATION_QUALIFIER,
    EFFECT_IMAGE_LABELING_CAMPAIGN_ID
} = process.env

/******************************************************************************
 * Set up the Effect API 🦾
 *****************************************************************************/
const signatureProvider = new JsSignatureProvider([EOS_PRIVATE_KEY!])

const efxTaskProxy = new EffectClient(EOS_ENV)
await efxTaskProxy.connectAccount(signatureProvider, {
    accountName: EFXTASKPROXY_ACCOUNT_NAME!,
    permission: EFXTASKPROXY_ACCOUNT_PERMISSION!,
    publicKey: EOS_PUBLIC_KEY!
}).catch((err) => {
    console.log('Error connecting to Effect Task Proxy, exiting...')
    console.error(err)
    process.exit(1)
})

const efxQualifier = new EffectClient(EOS_ENV)
await efxQualifier.connectAccount(signatureProvider, {
    accountName: EFXQUALIFIER_ACCOUNT_NAME!,
    permission: EFXQUALIFIER_ACCOUNT_PERMISSION!,
    publicKey: EOS_PUBLIC_KEY!
}).catch((err) => {
    console.log('Error connecting to Effect Qualifier, exiting...')
    console.error(err)
    process.exit(1)
})

/******************************************************************************
 * Task Batches
 *****************************************************************************/

export const createLikeBatch = async (batch: LikeBatch, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_LIKE_CAMPAIGN_ID), batch, reps).then(console.log).catch(err => { throw err })
}

export const createCommentBatch = async (batch: CommentBatch, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_COMMENT_CAMPAIGN_ID), batch, reps).then(console.log).catch(err => { throw err })
}

export const createFollowBatch = async (batch: FollowBatch, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_FOLLOWS_CAMPAIGN_ID), batch, reps).then(console.log).catch(err => { throw err })
}

export const createRetweetBatch = async (batch: RetweetBatch, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_RETWEETS_CAMPAIGN_ID), batch, reps).then(console.log).catch(err => { throw err })
}

export const createImageLabelerBatch = async (batch: ImageLabelingBatch, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_IMAGE_LABELING_CAMPAIGN_ID), batch, reps).then(console.log).catch(err => { throw err })
}

/******************************************************************************
 * Qualifier Batches
 *****************************************************************************/

export const createHumanQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_HUMAN_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(err => { throw err })
}

export const createTwitterQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_TWITTER_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(err => { throw err })
}

export const createInstagramQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_INSTAGRAM_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(err => { throw err })
}

export const createYoutubeQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_YOUTUBE_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(err => { throw err })
}

export const createNftResearchQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_NFT_RESEARCH_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(err => { throw err })
}

export const createImageClassificationQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_IMAGE_CLASSIFICATION_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(err => { throw err })
}
