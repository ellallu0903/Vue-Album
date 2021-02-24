import express from 'express'
import { create, login, logout, heartbeat, getPersonal } from '../controllers/users.js'

const router = express.Router()

router.post('/', create)
router.post('/login', login)
router.delete('/logout', logout)
router.get('/heartbeat', heartbeat)
router.get('/:id', getPersonal)

export default router
