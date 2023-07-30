import IngesterItem from "../../db/IngesterItem"

export default {
    'ingester_item': async ({ ingester_item_id }) => ({
        id: 2,
        provider: 'slack',
        created_at: 22222,
        message: 'test message',
        link: 'https://a.co',
        metadata: 'this is test metadata unstructured aaa'
      })
        // await IngesterItem.findOne({ where: { id: ingester_item_id } })
}