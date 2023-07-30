import IngesterItem from "../../db/IngesterItem"
import IntegrationItem from "../../db/IntegrationItem"
import { extractActionItem } from "../Claude"

export default {
    async classify(_, {
        input: {
            provider, message, link, metadata
        }
    }) {
        const { action, citation, label } = await extractActionItem(message)
        const createdAt = Math.round(Date.now() / 1000)
        
        const ingesterItem = await IngesterItem.create({
            provider,
            created_at: createdAt,
            message,
            link,
            metadata
        })

        if (!action) {
            return { ingester_item: ingesterItem }
        }

        const integrationItem = await IntegrationItem.create({
            provider,
            created_at: createdAt,
            ingester_item_id: ingesterItem.id,
            label,
            citation
        })

        return {
            integration_item: integrationItem,
            ingester_item: ingesterItem
        }
    }
}
