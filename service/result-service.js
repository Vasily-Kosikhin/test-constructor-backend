import ApiError from '../exeptions/api-error.js';
import resultModel from '../models/result-model.js';

class ResultService {
  async createResult(completed_id, result) {
    const newResult = await resultModel.create({ completed_id, result });
    return newResult;
  }

  async deleteQuestionById(id) {
    const question = await questionModel.findByIdAndDelete(id);
    if (!question) {
      throw ApiError.BadRequest(`Вопрос не найден!`);
    }
    await answerModel.deleteMany({
      question_id: JSON.parse(JSON.stringify(question._id))
    });

    return question;
  }
}

export default new ResultService();
