import authRouter from './authRoutes'
import express from 'express'

const app = express()


const router = express.Router()

router.use('/auth', authRouter)




export default router
