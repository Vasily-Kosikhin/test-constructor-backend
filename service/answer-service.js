import ApiError from '../exeptions/api-error.js';
import answerModel from '../models/answer-model.js';
import questionModel from '../models/question-model.js';

class AnswerService {
  async createAnswer(value, correct, question_id) {
    const question = await questionModel.findById(question_id);
    if (!question) {
      throw ApiError.BadRequest(`Неверный квест id`);
    }
    const answer = await answerModel.findOne({ question_id, value });
    if (answer) {
      throw ApiError.BadRequest(`Такой вариант ответа уже существует`);
    }
    const answerData = await answerModel.create({
      value,
      correct,
      question_id
    });
    return answerData;
  }

  async createEmptyAnswer(correct, question_id) {
    const question = await questionModel.findById(question_id);
    if (!question) {
      throw ApiError.BadRequest(`Неверный квест id`);
    }

    const answerData = await answerModel.create({
      correct,
      question_id
    });
    return answerData;
  }
  async deleteAnswerById(id) {
    const answer = await answerModel.findByIdAndDelete(id);
    if (!answer) {
      throw ApiError.BadRequest(`Ответ не найден!`);
    }
    return answer;
  }
}

export default new AnswerService();
