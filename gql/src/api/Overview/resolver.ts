import { Op } from "sequelize"
import IntegrationItem from "../../db/IntegrationItem"
import IngesterItem from '../../db/IngesterItem'
import { summarizeItems } from "../Claude"
import sequelize from "../../db"

const PROVIDERS = ['slack', 'email', 'provider', 'asana']

export default {
    'overview': () => ({
        'integrations': async () =>
            await IntegrationItem.findAll({
                where: {
                    completed_at: {
                        [Op.is]: null
                    }
                }
            })
        ,

        'summaries': async () => {
            const e = await Promise.all(PROVIDERS.map(async provider => {
                const intItems = await IntegrationItem.findAll({
                    where: {
                        'provider': { [Op.eq]: provider }
                    }
                })
                const promises = await Promise.all(intItems.map(item => IngesterItem.findOne({
                    where: { id: { [Op.eq]: item.ingester_item_id } }
                })))
                const ret = []
                for (let i = 0; i < promises.length; ++i) {
                    ret.push({
                        message: promises[i].message,
                        citation: promises[i].link
                    })
                }
                if (ret.length === 0) return false
                const res = await summarizeItems(JSON.stringify(ret))
                const json = JSON.parse(res)
                return { citation: json.citation, summary: json.summary, provider, message: ret[0].message }
            }))
            return e.filter(x => x)
        },

        'notifications': async () => {
            return await IngesterItem.findAll({
                attributes: [[sequelize.fn('COUNT', sequelize.col('provider')), 'number'], 'provider'],
                raw: true,
                group: ['provider']
            })
        }
    })
}
