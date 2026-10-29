import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true,
    maxlength: [120, 'Task title must be 120 characters or fewer'],
  },
  category: {
    type: String,
    enum: { values: ['Academic', 'Career', 'Personal'], message: 'Category must be Academic, Career, or Personal' },
    default: 'Academic',
  },
  duedate: {
    type: String,
    required: [true, 'Due date is required'],
    match: [/^\d{4}-\d{2}-\d{2}$/, 'Due date must use YYYY-MM-DD format'],
  },
  hours: {
    type: Number,
    required: [true, 'Effort hours are required'],
    min: [0.01, 'Effort must be greater than 0 hours'],
    max: [100, 'Effort cannot exceed 100 hours'],
  },
  status: {
    type: String,
    enum: { values: ['Not Started', 'In Progress', 'Completed'], message: 'Invalid task status' },
    default: 'Not Started',
  },
  isDemo: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });

export default mongoose.model('Task', taskSchema);
