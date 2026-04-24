import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    name: string,
    email: string,
    password: string,
    role: "user" | "admin"
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must contain at least 6 characters']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
},
{
    timestamps: true,
}
);

export default mongoose.model<IUser>('User', userSchema);