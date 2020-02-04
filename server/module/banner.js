const express = require('express')
const router = express.Router()
const db = require('../utils/sql')

router.get('/get', async (req, res) => {
    const { regionId } = req.query;
    try {
        const bannerList = db('select banner_path from tour_banner where banner_belong_region=' + regionId)
        res.json({
            code: 0,
            data: bannerList,
            message: ''
        })
    } catch (e) {
        res.json({
            code: -1,
            data: [],
            message: e
        })
    }
})

module.exports = router;