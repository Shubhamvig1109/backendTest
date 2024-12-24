import TokenSchema from "../models/token";
import UserSchema from "../models/users";
import bcrypt from 'bcrypt'
import jwt, { verify } from 'jsonwebtoken';
import environment from "../config/environment";
import mongoose from "mongoose";
import chatGpt from './../openAI/chat'

const AuthController = {
    register: async (req: any, res: any, next: any) => {
        try {
            const { email, password }: any = req.body;

            // FIND IF EMAIL IS ALREADY REGISTERED
            const duplicateEmail = await UserSchema.findOne({ userEmail: email.toLowerCase() });
            if (duplicateEmail) {
                return res.status(400).json({ error: 'Email ID Already Registered' });
            }

            const saltPassword = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, saltPassword);

            const newUser = await new UserSchema({ userEmail: email.toLowerCase(), userPassword: hashPassword }).save();
            if (!newUser) {
                return res.status(400).json({ error: 'Something went wrong' });
            }

            const tokenPayload = {
                userId: newUser._id,
                userEmail: newUser.userEmail,
            };
            const generateAccessToken: any = jwt.sign(tokenPayload, environment.jwtSecret as string, { expiresIn: '1h' });
            if (!generateAccessToken) {
                return res.status(400).json({ error: 'Something went wrong' });
            }

            // create OTP 
            const generateOtp = Math.floor(100000 + Math.random() * 900000)

            const accessToken = await new TokenSchema({
                token: generateAccessToken,
                user: newUser._id,
                otp: generateOtp
            }).save();
            if (!accessToken) {
                return res.status(400).json({ error: 'Something went wrong' });
            }
            // chatGpt()
            res.status(200).json({ message: 'User Registered', data: accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    login: async (req: any, res: any, next: any) => {
        const { email, password } = req.body

        const checkEmailExists = await UserSchema.findOne({ userEmail: email.toLowerCase() })
        if (!checkEmailExists) {
            return res.status(400).send({error:'Email Does not Exists'})
        }

        const comparePassword = bcrypt.compare(password, checkEmailExists.userPassword)
        if (!comparePassword) {
            return res.status(400).send('Password is not matching, try different password')
        }


        // find and update token
        const findaccessToken: any = await TokenSchema.findOne({ user: checkEmailExists._id })
        if (!findaccessToken) {
            return res.status(400).json({ error: "Something Went Wrong" })
        }

        const decodedToken: any = jwt.decode(findaccessToken.token);
        if (!decodedToken) {
            return res.status(400).send({ error: "Something Went Wrong" })
        }

        const currentTimeStamp = Math.floor(Date.now() / 1000)
        if (currentTimeStamp < decodedToken.exp) {

            return res.status(200).send({ data: findaccessToken.token })

        } else {
            const tokenPayload = {
                userId: checkEmailExists._id,
                userEmail: checkEmailExists.userEmail,
            }
            const generateAccessToken: any = jwt.sign(tokenPayload, environment.jwtSecret as string, { expiresIn: '1h' });
            const updatedToken = await TokenSchema.findOneAndUpdate({ user: checkEmailExists._id, token: generateAccessToken }).populate('user')

            if (!updatedToken) {
                res.status(400).send({ error: "Something Went Wrong" })
            }

            res.status(200).send({ data: updatedToken })

        }
    }
}

export default AuthController