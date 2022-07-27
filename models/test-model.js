import mongoose from 'mongoose';
import Schema from 'mongoose';

const TestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  email: { type: String, required: true },
  author_id: { type: String, required: true },
  created_at: { type: String, required: true }
});

export default mongoose.model('Test', TestSchema);
