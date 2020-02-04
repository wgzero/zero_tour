// 用户评论

const express = require('express')
const router = express.Router()
const db = require('../utils/sql')


// 获取所有评论
router.get('/get', async (req, res) => {
    try {
        let { couponId } = req.query
        let commentList = await db('select * from tour_comment where comment_coupon_id=' + couponId)
        res.json({
            code: 0,
            data: commentList,
            message: ''
        })
    } catch (err) {
        res.json({
            code: -1,
            data: [],
            message: '获取评论失败'
        })
    }
})

// 发布评论
router.post('/publish', async (req, res) => {
    let { userId, starGrade, commentContent, couponId } = req.body
    if(!couponId || !userId){
        res.json({
            code: -1,
            data: null,
            message: '参数有误'
        })
    }

    let item = await db(`select status from tour_coupon_user where coupon_id=${couponId} and user_id=${userId}`)
    if(!item){
        res.json({
            code:-1,
            data: null,
            message: '购买优惠券之后才能评论哦'
        })
    }

    if(item.status === 0){
        let userItem = await db(`select user_phone from tour_user where id=${userId}`)
        if(!userItem){
            return res.json({
                code:-1,
                data: null,
                message: '用户不存在'
            })
        }else{
            await db(`insert into tour_comment set comment_user_phone = ${userItem.user_phone}, comment_star=${starGrade},
            comment_content=${commentContent}, comment_time=${new Date().getTime()}, comment_coupon_id=${couponId} `)
            let result = await db(`update tour_coupon_user set status=1 where coupon_id=${couponId} and user_id=${userId}`)
            res.json({
                code: 0,
                data: null,
                message: '评论成功'
            })
        }

        await db
    }else{
        res.json({
            code: -1,
            data: null,
            message: '已经发布过评论了'
        })
    }
})

module.exports = router;