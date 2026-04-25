import Task, { ITask } from "../models/Task";

// Create task
export const createTask = async (taskData: Partial<ITask>, userId: string) => {
    const task = await Task.create({
        ...taskData,
        user: userId,
    });
    return task;
};

// Get all task belong to a user
export const getUserTask = async (userId: string) => {
    const task = await Task.find({
        user: userId
    }).sort({
        createdAt: -1
    });

    return task;
};

// Get one task by ID that belong to the user
export const getTaskById = async (taskId: string, userId: string) => {
    const task = await Task.findOne({
        _id: taskId,
        user: userId 
    });

    if(!task) {
        throw new Error("Task not found");
    }
    return task;
};

// Update task
export const updateTask = async (
    taskId: string,
    userId: string,
    updateData: Partial<ITask>
) => {
    const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId },
        updateData,
        { new: true, runValidators: true }
    );
    if(!task) {
        throw new Error('Task not found');
    }
    return task;
}

// Delete task
export const deleteTask = async (taskId: string, userId: string) => {
    const task = await Task.findOneAndDelete({ 
        _id: taskId,
        user: userId 
    });

    if(!task) {
        throw new Error('Task not founf');
    }

    return task;
};