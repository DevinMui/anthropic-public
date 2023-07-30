import { HasOne, Op } from "sequelize";
import IntegrationItem from './db/IntegrationItem'
import { extractActionItem, summarizeItems, writeEmail } from "./api/Claude";
import IngesterItem from './db/IngesterItem'
import sequelize from './db';
import { HasMany } from "sequelize-typescript";

(async function () {
    // await sequelize.authenticate();
    console.log('connection established');

    // await IntegrationItem.sync({ alter: true });
    // await IngesterItem.sync({ alter: true });

    return await writeEmail('hello world its me siraj')
    
})().then(e => console.log(e)).then(e => process.exit(0))