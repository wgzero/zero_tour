// 获取优惠券
const express = require('express')
const router = express.Router()
const db = require('../utils/sql')

// 1.获取用户已经取到的优惠券
router.get('/record', async (req, res) => {
    try {
        let { userId } = req.query
        let data = await db(`select count(coupon_name) as num, coupon_type from tour_coupon where id in 
        (select coupon_id from tour_coupon_user where user_id=${userId}) group by coupon_type)`)
        res.json({
            code: 0,
            data,
            message: ''
        })
    } catch (err) {
        res.json({
            code: -1,
            data: null,
            message: err
        })
    }
})
// 2.获取用户已经领到的具体某一个优惠券列表
router.get('/received', async (req, res) => {
    try {
        let { userId, type } = req.query
        let receivedCouponList = await db(`select a.id, a.coupon_name, a.coupon_explain, a.coupon_ico_path, a.coupon_received_num,
        b.status from tour_coupon as a right join tour_coupon_user as b on a.id=b.coupon_id where a.coupon_status=0 and a.coupon_type=${type}
        and a.id in (select coupon_id from tour_coupon_user where user_id=${userId}) and b.user_id=${userId}`)
        res.json({
            code: 0,
            data: receivedCouponList,
            message: ''
        })
    } catch (error) {
        res.json({
            code: -1,
            data: null,
            message: '获取失败'
        })
    }
})
// 3.获取优惠券详情
router.get('/detail', async (req, res) => {
    try {
        let { id } = req.query
        let data = await db(`select a.coupon_name, a.coupon_explain, a.coupon_starttime, a.coupon_endtime, a.coupon_ico_path, b.comment_content,
        b.comment_star, b.comment_user_phone from tour_coupon as a left join tour_comment as b on a.id=b.comment_coupon_id where a.id=${id}`)
        if (data) {
            res.json({
                code: 0,
                data,
                message: ''
            })
        } else {
            res.json({
                code: -1,
                data: null,
                message: '没有查询到优惠券信息'
            })
        }
    } catch (err) {
        res.json({
            code: -1,
            data: null,
            message: err
        })
    }
})
// 4.立即获取优惠券
router.post('/receive', async (req, res) => {
    try {
        let { couponId, userId } = req.body
        let id = await db(`select id from tour_coupon_user where coupon_id=${couponId} and user_id=${userId}`)
        if (id) {
            res.json({
                code: -1,
                data: 2,
                message: '已经领取过了'
            })
        } else {
            let { insertId } = await db(`insert into tour_coupon_user set coupon_id=${couponId}, user_id=${userId}`)
            if (insertId) {
                let data = await db(`update tour_coupon set coupon_received_num=coupon_received_num+1 where id= ${couponId}`)
                if (data) {
                    res.json({
                        code: 0,
                        data: 1,
                        message: '领取成功'
                    })
                } else {
                    res.json({
                        code: -1,
                        data: 0,
                        message: '领取失败,请重新操作'
                    })
                }
            }
        }
    } catch (error) {
        res.json({
            code: -1,
            data: null,
            message: error
        })
    }   
})

router.get('/hot', async (req, res) => {
    let { regionId } = req.query
    let getTime = Date.now()
    let $limit = 'limit 0, 4'
    let $belong = `coupon_belong_region=${regionId}`
    let $query = 'select id, coupon_name, coupon_explain, coupon_ico_path from tour_coupon ' + regionId === 1
    ? $limit : 'where"' + getTime +'" < coupon_endtime and ' + $belong + ' ' + $limit
    try {
        let hotCouponList = await db($query + ' ' + $limit)
        res.json({
            code: 0,
            data: hotCouponList,
            message: ''
        })
    } catch (err) {
        res.json({
            code: -1,
            data: [],
            message: err
        })
    }
})

// 5.优惠券分类列表
router.get('/classify', async (req, res) => {
    try {
        let classifyList = await db(`select id, classify_name from tour_classify`)
        res.json({
            code: 0,
            data: classifyList,
            message: ''
        })
    } catch (error) {
        res.json({
            code: -1,
            data: [],
            message: e
        })
    }
})
// 6.首页展示地区和对应类别的优惠券
router.get('/home', async (req, res) => {
    try {
        let { regionId, classifyId, page } = req.query
        let couponList = regionId - 0 === 1
            ? await db(`select * from tour_coupon where coupon_classify=${classifyId} limit ${(page - 1) * 10}, 10`)
            : await db(`select * from tour_coupon where coupon_belong_region=${regionId} and coupon_classify=${classifyId} limit ${(page - 1) * 10}, 10`)
        res.json({
            code: 0,
            data: couponList,
            message: ''
        })
    } catch (error) {
        res.json({
            code: -1,
            data: [],
            message: JSON.stringify(error)
        })
    }
})

module.exports = router;