import mongoose from 'mongoose';
import Task from '../models/Task.js';

export async function getTasks(req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }).lean();
    res.json(tasks);
  } catch (error) { next(error); }
}

export async function createTask(req, res, next) {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) { next(error); }
}

export async function updateTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: false,
    });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) { next(error); }
}

export async function deleteTask(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.status(204).end();
  } catch (error) { next(error); }
}
