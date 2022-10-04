const database = require("../db/database.js");
const initWines = require("../data/wines.json");

const ObjectId = require('mongodb').ObjectId;

const wines = {
    getAllWines: async function getAllWines() {
        let db = await database.getDb();

        try {
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
    },

    updateWine: async function updateWine(id, newAmount) {
        let db;

        try {
            db = await database.getDb();

            // create a filter for a movie to update
            const filter = { _id: ObjectId(id) };
            // this option instructs the method to create a document if no documents match the filter
            const options = { upsert: false };
            // create a document that sets the plot of the movie
            const updateDoc = {
              $set: {
                amount: newAmount
              },
            };

            const result = await db.collection.updateOne(filter, updateDoc, options);
        } catch (e) {
            console.error(e.message);
        } finally {
            await db.client.close();
        }
    },

    updateAmounts: function updateAmounts(newAmounts) {
        Object.keys(newAmounts).forEach(async (id) => {
            await wines.updateWine(id, newAmounts[id]);
        });
    }
};

module.exports = wines;
