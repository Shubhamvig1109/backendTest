import express from 'express'
import AuthController from '../../controllers/authController'


const authRouter = express.Router()

authRouter.route('/register').post(AuthController.register)
authRouter.route('/login').post(AuthController.login)


export default authRouter