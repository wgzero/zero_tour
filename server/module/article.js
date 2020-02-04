const express = require('express')
const router = express.Router()
const db = require('../utils/sql')

router.get('/list', async (req, res) => {
    let { regionId } = req.query
    let $query = 'select * from tour_feature' + regionId === 1 ? ' ' : ' where feature_belong_region= "' + regionId + '"'
    let $limit = 'limit 0, 4'
    try {
        let articleList = await db($query + ' ' + $limit)
        res.json({
            code: 0,
            data: articleList,
            message: ''
        })
    } catch (err) {
        res.json({
            code: 0,
            data: [],
            message: err
        })
    }

})

module.exports = router;