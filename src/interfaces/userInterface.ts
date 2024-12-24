import { Document, ObjectId } from "mongoose";

interface userInterface extends Document {
    userEmail: string,
    userPassword: string,
}


export default userInterface