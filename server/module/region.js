const express = require('express')
const router = express.Router()
const db = require('../utils/sql')

router.get('/list', async (req, res) => {
    try {
        let data = await db('select id, region_name from tour_region')
        res.json({
            code: 0,
            data,
            message: ''
        })
    } catch (err) {
        res.json({
            code: 0,
            data: null,
            message: e
        })
    }
})

module.exports = router;