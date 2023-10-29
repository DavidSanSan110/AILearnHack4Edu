import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    course_id: String,
    created_at: Date,
    url: String,
    status: String,
    method: String,
    params: Object,
    result: Object
});

export const TaskModel = mongoose.model('Task', taskSchema);

export class Task {
    constructor() {
        this.taskModel = new TaskModel();
    }

    async getTasks() {
        return await this.taskModel.find();
    }

    async getTask(task_id) {
        return await this.taskModel.findById(task_id);
    }

    async addTask(url, status, method, params, result) {
        const task = new TaskModel({
            created_at: new Date(),
            url: url,
            status: status,
            method: method,
            params: params,
            result: result
        });
        return await task.save();
    }
}