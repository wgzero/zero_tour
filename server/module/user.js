
const express = require('express')
const router = express.Router()
const db = require('../utils/sql')
const multer = require('../utils/multer')

// 获取用户基本信息
router.get('/info', async (req, res) => {
    try {
        const { id } = req.query
        const [data] = await db('select * from tour_user where id="' + id + '"')
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
                message: '用户不存在'
            })
        }
    } catch (e) {
        res.json({
            code: -1,
            data: null,
            message: e
        })
    }
})

// 修改用户名
router.post('/changeUserName', async (req, res) => {
    try {
        let msg = req.body;
        let userId = msg.userId;
        let userName = msg.userName;
        const data = await db('update tour_user set user_name="' + userName + '"where id="' + userId + '"')
        if (data) {
            res.json({
                code: 0,
                data: null,
                message: '用户名修改成功'
            })
        } else {
            res.json({
                code: 0,
                data: null,
                message: '用户名修改失败,请重新操作'
            })
        }
    } catch (e) {
        res.json({
            code: -1,
            data: null,
            message: e
        })
    }
})


// 修改性别
router.post('/changeUserSex', async (req, res) => {
    try {
        const msg = req.body;
        const userId = msg.userId;
        const sex = msg.sex;
        let data = await db('update tour_user set user_sex="' + sex + '"where id="' + userId + '"')
        if (data) {
            res.json({
                code: 0,
                data: null,
                message: '修改成功'
            })
        } else {
            res.json({
                code: -1,
                data: null,
                message: '修改失败'
            })
        }
    } catch (e) {
        res.json({
            code: -1,
            data: null,
            message: e
        })
    }
})

// 修改密码
router.post('/resetPassword', async (req, res) => {
    try {
        let md5 = crypto.createHash('md5')
        let msg = req.body;
        let phone = msg.phone;
        let pwd = md5.update(msg.pwd).digest('hex')
        let data = await db('update tour_user set user_pwd="' + pwd + '" where user_phone="' + phone + '"')
        if (data) {
            res.json({
                code: 0,
                data: null,
                message: '修改密码成功'
            })
        } else {
            res.json({
                code: -1,
                data: null,
                message: '修改密码失败'
            })
        }
    } catch (e) {
        res.json({
            code: -1,
            data: null,
            message: e
        })
    }

})

module.exports = router;