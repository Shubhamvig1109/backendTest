import mongoose, { Model, Schema } from 'mongoose';
import userInterface from '../interfaces/userInterface';

const userSchema = new Schema<userInterface>({
    userEmail: {
        type: String,
        required: true  // Corrected from 'require' to 'required'
    },
    userPassword: {
        type: String,
        required: true
    },
}, { timestamps: true });

const UserSchema: Model<userInterface> = mongoose.model('Users', userSchema);

export default UserSchema;
