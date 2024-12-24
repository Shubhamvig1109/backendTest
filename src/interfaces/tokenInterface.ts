import { Document, ObjectId } from "mongoose";

interface tokenInterFace extends Document {
    token: string,
    user: ObjectId,
    otp: number
}

export default tokenInterFace