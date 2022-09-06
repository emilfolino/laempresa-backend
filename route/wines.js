const express = require('express');
const router = express.Router();

const winesModel = require("../models/wines");

router.get(
    "/",
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

        const result = await winesModel.insertWine(newWine);

        return res.status(201).json({ data: result});
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
