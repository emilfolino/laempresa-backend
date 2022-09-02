const express = require('express');
const router = express.Router();

router.get(
    "/",
    (req, res) => res.json({
        name: "Faustino I",
        vintage: 2008,
        price: 199,
        amount: 1,
    })
);

module.exports = router;
