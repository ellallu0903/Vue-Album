import express from 'express'
import { create, edit, deletee, user, file } from '../controllers/albums.js'

const router = express.Router()

router.post('/', create)
router.patch('/:id', edit)
router.delete('/:id', deletee)
// 查使用者所有的圖片
router.get('/user/:user', user)
// 回傳檔案
router.get('/file/:file', file)

export default router
