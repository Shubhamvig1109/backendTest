import mongoose, { Model, Schema, model } from "mongoose";
import tokenInterFace from "../interfaces/tokenInterface";

// asdasd

const token = new Schema<tokenInterFace>({
    token: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    otp: {
        type: Number
    }


}, { timestamps: true })


const TokenSchema: Model<tokenInterFace> = mongoose.model('Tokens', token)

export default TokenSchema