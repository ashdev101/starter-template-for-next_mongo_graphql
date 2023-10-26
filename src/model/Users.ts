import mongoose, { Schema } from 'mongoose';

// Document interface
interface User {
    username: string;
    email: string;
    password: string;
}

// Schema
const UserSchema = new Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

// if there is no UserModel create one if thers already use one 

const User = mongoose.models.users || mongoose.model("users", UserSchema)

export default User
