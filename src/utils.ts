import { Campaign } from '@effectai/effect-js/dist/lib/types/campaign.js'
import { efxTaskProxy } from './effect.js'
import { env } from './env.js';

export const getAccountBalance = async () => {
    const efxRow = (await efxTaskProxy.api.rpc.get_currency_balance(
        String(efxTaskProxy.config.efxTokenContract), 
        env.EFXTASKPROXY_ACCOUNT_NAME, 
        efxTaskProxy.config.efxSymbol))[0]
    if (efxRow) {
        return parseFloat(efxRow.replace(` ${efxTaskProxy.config.efxSymbol}`, ''))
    } else {
        return 0
    }
}

export const printPrice = async (campaignId: number, reps: number, tasks: number) => {
    try {
        const campaign: Campaign = await efxTaskProxy.force.getCampaign(campaignId, true)
        if(campaign && campaign.info) {
            const costs = Number(campaign.info.reward) * reps * tasks
            const balance = await getAccountBalance()
            console.log(
                `Creating new tasks for:\n`, 
                `#${campaignId}. ${campaign.info.title}\n`,
                `${tasks} tasks of ${reps} reps at ${campaign.info.reward} EFX/task\n`,
                `Total: ${costs} EFX\n`,
                `Balance: ${balance} EFX\n`,
            )
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
