import { EffectClient } from '@effectai/effect-js'
import { JsSignatureProvider } from "eosjs/dist/eosjs-jssig.js";
import { config } from 'dotenv'

config({
    path: '.env',
    debug: true,
})

const {
    EOS_ENV,
    QUALIFIER_REPS,
    EOS_PRIVATE_KEY,
    EOS_PUBLIC_KEY,
    EFXTASKPROXY_ACCOUNT_NAME,
    EFXTASKPROXY_ACCOUNT_PERMISSION,
    EFXQUALIFER_ACCOUNT_NAME,
    EFXQUALIFER_ACCOUNT_PERMISSION,
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
}).catch(console.error)

const efxQualifier = new EffectClient(EOS_ENV)
await efxQualifier.connectAccount(signatureProvider, {
    accountName: EFXQUALIFER_ACCOUNT_NAME!,
    permission: EFXQUALIFER_ACCOUNT_PERMISSION!,
    publicKey: EOS_PUBLIC_KEY!
}).catch(console.error)

/******************************************************************************
 * Task Batches
 *****************************************************************************/

export const createLikeBatch = async (batch: any, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_LIKE_CAMPAIGN_ID), batch, reps).then(console.log).catch(console.log)
}

export const createCommentBatch = async (batch: any, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_COMMENT_CAMPAIGN_ID), batch, reps).then(console.log).catch(console.log)
}

export const createFollowBatch = async (batch: any, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_FOLLOWS_CAMPAIGN_ID), batch, reps).then(console.log).catch(console.log)
}

export const createRetweetBatch = async (batch: any, reps: number) => {
    efxTaskProxy.force.createBatch(Number(EFFECT_RETWEETS_CAMPAIGN_ID), batch, reps).then(console.log).catch(console.log)
}

/******************************************************************************
 * Qualifier Batches
 *****************************************************************************/

export const createHumanQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_HUMAN_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(console.log)
}

export const createTwitterQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_TWITTER_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(console.log)
}

export const createInstagramQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_INSTAGRAM_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(console.log)
}

export const createYoutubeQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_YOUTUBE_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(console.log)
}

export const createNftResearchQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_NFT_RESEARCH_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(console.log)
}

export const createImageClassificationQualifierBatch = async () => {
    efxQualifier.force.createBatch(Number(EFFECT_IMAGE_CLASSIFICATION_QUALIFIER), [], Number(QUALIFIER_REPS)).then(console.log).catch(console.log)
}
