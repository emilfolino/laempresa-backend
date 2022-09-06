const database = require("../db/database.js");
const initWines = require("../data/wines.json");

const wines = {
    getAllWines: async function getAllWines() {
        let db;

        try {
            db = await database.getDb();

            const allWines = await db.collection.find().toArray();

            return allWines;
        } catch (error) {
            return {
                errors: {
                    message: error.message,
                }
            };
        } finally {
            await db.client.close();
        }
    },
    insertWine: async function insertWine(newWine) {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertOne(newWine);

            return {
                ...newWine,
                _id: result.insertedId,
            };
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    },
    init: async function init() {
        let db;

        try {
            db = await database.getDb();

            const result = await db.collection.insertMany(initWines);

            console.log(`${result.insertedCount} documents were inserted`);
        } catch (error) {
            console.error(error.message);
        } finally {
            await db.client.close();
        }
    }
};

module.exports = wines;
