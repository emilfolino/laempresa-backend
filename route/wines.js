const express = require('express');
const router = express.Router();

const winesModel = require("../models/wines");
const usersModel = require("../models/users");

router.get(
    "/",
    (req, res, next) => usersModel.checkToken(req, res, next),
    async (req, res) => {
        const wines = await winesModel.getAllWines();

        return res.json({
            data: wines
        });
    }
);

router.post(
    "/",
    async (req, res) => {
        const newWine = req.body;

        if (newWine.name && newWine.price && newWine.amount) {
            const result = await winesModel.insertWine(newWine);

            return res.status(201).json({ data: result });
        } else {
            return res.status(400).json({ errors: {
                message: "Price and amount needed to create wine."
            }});
        }
    }
);

router.post(
    "/init",
    async (req, res) => {
        await winesModel.init();

        res.send("tjo tjim!");
    }
);

module.exports = router;
