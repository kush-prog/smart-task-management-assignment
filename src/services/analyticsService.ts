import Task from "../models/Task"
import User from "../models/User";
import mongoose from "mongoose";


export const getUserAnalytics = async (userId: string) => {
    
    const statusCounts = await Task.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const priorityCounts = await Task.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $group: { _id: '$priority', count: { $sum: 1 } } },
    ]);

    const overdueTasks = await Task.countDocuments({
        user: userId,
        status: { $ne: 'completed' },
        dueDate: { $lt: new Date() },
    });

    const totalTasks = await Task.countDocuments({ user: userId });
    const completedTasks = await Task.countDocuments({
        user: userId,
        status: 'completed',
    });

    return {
        totalTasks,
        completedTasks,
        overdueTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        statusBreakdown: statusCounts,
        priorityBreakdown: priorityCounts,
    };
};

export const getSystemAnalytics = async () => {
    const totalUsers = await User.countDocuments();
    const totalTasks = await Task.countDocuments();
    const completedTasks = await Task.countDocuments({status: 'completed'});
    
    const taskByStatus = await Task.aggregate([
        { $group: { _id: '$status', count: { $sum: 1} } },
    ]);

    return {
        totalUsers,
        totalTasks,
        completedTasks,
        completeRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        taskByStatus,
    };
};