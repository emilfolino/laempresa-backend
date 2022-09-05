const database = require("../db/database.js");

const wines = {
    getAllWines: function getAllWines () {
        let db;

        try {
            db = await database.getDb();

        } catch (error) {

        } finally {

        }
    }
};

export default wines;
