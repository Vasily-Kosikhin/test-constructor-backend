import mongoose from 'mongoose';
import Schema from 'mongoose';

const ResultSchema = new mongoose.Schema({
  completed_id: { type: String, required: false },
  result: { type: Boolean, required: true }
});

export default mongoose.model('Result', ResultSchema);
