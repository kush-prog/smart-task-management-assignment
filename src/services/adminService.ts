import Task from "../models/Task";
import User from "../models/User"


export const getAllUsers = async () => {
    const users = await User.find().select('-password');
    return users;
};

export const getAllTasks = async () => {
    const tasks = await Task.find()
        .populate('user', 'name email')
        .sort({ createdAt: -1 });

    return tasks;
}