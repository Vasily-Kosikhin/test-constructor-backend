import mongoose from 'mongoose';
import Schema from 'mongoose';

const CompletedSchema = new mongoose.Schema({
  email: { type: String, required: true },
  test_id: { type: String, required: true },
  passed_at: { type: String, required: true },
  right: { type: Number, required: true },
  wrong: { type: String, required: true },
  total: { type: String, required: true },
  title: { type: String, required: true }
});

export default mongoose.model('Completed', CompletedSchema);
