# Force_Bot

This is a simple bot that looks at a list of Twitter users and posts tasks on Effect Force for social engagement.

## AUTH

There's an included `.env` file with this repo.
So copy `.env.bak` to `.env` and add the required credentials.

### Twitter

You'll need a Bearer Token from Twitter, which can be found by making an account and an app at [developer.twitter.com](https://developer.twitter.com)
Docs on how to generate a Twitter Bearer Token can be found here: [Twitter Bearer Token Docs](https://developer.twitter.com/en/docs/authentication/oauth-2-0/bearer-tokens)

### Effect Force

To post tasks to Effect Force we will need to add your privatee and public keys for `efxtaskproxy` in `.env`: `EOS_PRIVATE_KEY`, `EOS_PUBLIC_KEY`.

## Install and Run

To run this app, you'll need to install the dependencies with `npm ci` afterward you'll need to build it with `npm run build`, then you can run it with `npm run start`.
