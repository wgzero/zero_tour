const express = require('express')
const router = express.Router()
const db = require('../utils/sql')
const crypto = require('crypto')

// 登录
router.post('/loginForm', async (req, res) => {
    const md5 = crypto.createHash('md5')
    const loginMsg = req.body
    const phone = loginMsg.phone
    const pwd = md5.update(loginMsg.pwd).digest('hex')
    try {
        const result = await db('select id from tour_user where user_phone="' + phone + '" and user_pwd="' + pwd +'"')
        const [item] = result
        if(!item){
            res.json({
                code: -1,
                data: null,
                message: '用户不存在或者密码错误'
            })
        }else{
            res.json({
                code: 0,
                data: item.id,
                message: ''
            })
        }
    } catch (e) {
        res.json({
            code: -1,
            data: null,
            message: '登录失败,请重新登录'
        })
    }
})

// 注册
router.post('/registForm', async (req, res) => {
    const md5 = crypto.createHash('md5')
    const registMsg = req.body
    const phone = registMsg.phone
    const pwd = md5.update(registMsg.pwd).digest('hex')
    try {
        let result = await db('select id from tour_user where user_phone="' + phone +'"')
        // 如果存在提示已注册
        if(result.length > 1){
            res.json({
                code: -1,
                data: null,
                message: '该手机号码已注册'
            })
        }else{
            // 如果不存在就插入到数据库中
            const inserted = db('insert into tour_user set user_phone="' + phone + '", user_pwd="' + pwd +'"')
            if(inserted){
                res.json({
                    code: 0,
                    data: null,
                    message: '注册成功'
                })
            }else{
                res.json({
                    code: -1,
                    data: null,
                    message: '注册失败'
                })
            }
        }
    } catch (e) {
        res.json({
            code: -1,
            data: null,
            message: e
        })
    }
})


// 获取短信验证码
router.post('/getPhoneCode', async (req, res) => {
    let msg = req.body
    let phone = msg.phone
    try {
        let [data] = await db('select id from tour_user where user_phone="' + phone + '"')
        if(!data){
            res.json({
                code: -1,
                data: null,
                message: '手机号码不存在'
            })
        }else{
            // 模拟获取手机验证码
            let code = ''
            for(let i=0; i < 6; i+=1){
                code+=Math.floor(Math.random() * 10)

            }
            res.json({
                code: 0,
                data: code,
                message: ''
            })
        }
    } catch (error) {
        res.json({
            code: -1,
            data: null,
            message: error
        })
    }
})

// 重新设置密码
router.post('/resetPassword', async (req, res) => {
    let md5 = crypto.createHash('md5')
    let { phone, pwd } = req.body
    let _pwd = md5.update(pwd).digest('hex')
    try {
        let result = await db('update tour_user set user_pwd="' +_pwd + '" where user_phone="' + phone + '"')
        if(result){
            res.json({
                code: 0,
                data: null,
                message: '修改密码成功'
            })
        }else{
            res.json({
                code: -1,
                data: null,
                message: '修改密码失败'
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

module.exports = router;