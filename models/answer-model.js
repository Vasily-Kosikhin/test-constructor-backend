import mongoose from 'mongoose';
import Schema from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  value: { type: String, required: false, default: '' },
  correct: { type: Boolean, required: true },
  question_id: { type: String, required: true }
});

export default mongoose.model('Answer', AnswerSchema);
