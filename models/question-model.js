import mongoose from 'mongoose';
import Schema from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  description: { type: String, required: false, default: '' },
  inputType: { type: Boolean, required: true },
  answerQuantity: { type: Number, required: true },
  test_id: { type: String, required: true }
});

export default mongoose.model('Question', QuestionSchema);
