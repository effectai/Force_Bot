// Load environment variables
import { EnvType, load } from 'ts-dotenv';
import { existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export type Env = EnvType<typeof schema>;

export const schema = {

    // GENERAL
    EOS_ENV: String,

    // ASSETS
    TWITTER_HANDLES: String,
    NFT_URL: String,

    // EFFECT ACCOUNTS
    EOS_PRIVATE_KEY: String,
    EOS_PUBLIC_KEY: String,
    EFXTASKPROXY_ACCOUNT_NAME: String,
    EFXTASKPROXY_ACCOUNT_PERMISSION: String,
    EFXQUALIFIER_ACCOUNT_NAME: String,
    EFXQUALIFIER_ACCOUNT_PERMISSION: String,

    // EFFECT UTILS
    TASKPROXY_TASKS: Number,
    QUALIFIER_REPS: Number,
    TASKPROXY_REPS: Number,

    // EFFECT CAMPAIGNS
    EFFECT_LIKE_CAMPAIGN_ID: Number,
    EFFECT_FOLLOWS_CAMPAIGN_ID: Number,
    EFFECT_RETWEETS_CAMPAIGN_ID: Number,
    EFFECT_COMMENT_CAMPAIGN_ID: Number,
    EFFECT_IMAGE_LABELING_CAMPAIGN_ID: Number,
    EFFECT_NFT_CATEGORIZATION_CAMPAIGN_ID: Number,
    EFFECT_HUMAN_QUALIFIER: Number,
    EFFECT_TWITTER_QUALIFIER: Number,
    EFFECT_INSTAGRAM_QUALIFIER: Number,
    EFFECT_YOUTUBE_QUALIFIER: Number,
    EFFECT_NFT_RESEARCH_QUALIFIER: Number,
    EFFECT_IMAGE_CLASSIFICATION_QUALIFIER: Number,

    // TWITTER
    RETWEET_INSTRUCTION: String,
    TWITTER_BEARER_TOKEN: String,
    TWITTER_MAX_RESULTS: Number,

    // UNSPLASH
    UNSPLASH_ACCESS_KEY: String,
    UNSPLASH_SECRET_KEY: String,
}

export let env: Env

export const loadEnv = (): void => {
    // console.log('Loading environment variables...')
    const __filename = fileURLToPath(import.meta.url);
    // console.log('filename', __filename)
    const __dirname = dirname(__filename);
    // console.log('dirname', __dirname)
    const envPath = process.env.NODE_ENV === 'production' ? resolve(__dirname, '../.env') : resolve(__dirname, '../.env');
    // console.log('envPath', envPath)
    // const envPath = process.env.NODE_ENV === 'production' ? '.env' : '.env.development';
    if (!existsSync(envPath)) {
        console.error('Missing .env file 🚨')
        process.exit(1)
    } else {
        // console.log('Found .env file ✅')
        env = load(schema, {
            path: envPath,
            encoding: 'utf8',
        })
    }
}
