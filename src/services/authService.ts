import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User"
import bcrypt from 'bcryptjs';

// Function for registering new user
export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    
    // Checking if user already exists or not
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new Error('User already exists with this email');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating new user
    const user = await User.create({
        name, email, password: hashedPassword,
    });

    const token = generateToken(user);
    return { user, token };

}

// Login function with credentials verfication and returning token
export const loginUser = async (email: string, password: string) => {
    
    // Finding user by email
    const user = await User.findOne({ email });
    if(!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token  = generateToken(user);
    return { user, token };

}

const generateToken = (user: IUser): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        { userId: user._id, role: user.role },
        secret,
        { expiresIn: '7d' }
    );
}
