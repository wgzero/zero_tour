const fs = require('fs')

const multer = require('multer')

const storage = multer.diskStorage({
    // 设置上传后文件的路径
    destination(req, file, cb) {
        const path = `${process.cwd()}/tmp/`
        if(!fs.existsSync(path)){
            fs.mkdirSync(path)
        }
        cb(null, path)
    },
    // 给上传文件重命名，获取添加后缀名
    filename(req, file, cb ){
        let fileFormat = (file.originalname).split('.')
        cb(null, file.filename + '-' + Date.now() + '.' + fileFormat[fileFormat.length-1])
    }

})

// 添加配置文件到multer对象
let upload = multer({
    storage: storage
})

module.exports = upload;