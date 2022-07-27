import mongoose from 'mongoose';
import Schema from 'mongoose';

const СurrentSchema = new mongoose.Schema({
  test_id: { type: String, required: true },
  email: { type: String, required: true },
  question_number: { type: Number, required: true, default: 0 },
  right: { type: Number, required: true, default: 0 },
  wrong: { type: Number, required: true, default: 0 },
  total: { type: Number, required: true },
  current: { type: Number, required: true, default: 0 }
});

export default mongoose.model('СurrentTest', СurrentSchema);
