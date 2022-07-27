import ApiError from '../exeptions/api-error.js';
import answerModel from '../models/answer-model.js';
import questionModel from '../models/question-model.js';
import testModel from '../models/test-model.js';

class QuestionService {
  async createQuestion(description, inputType, answerQuantity, test_id) {
    try {
      const test = await testModel.findById(test_id);
      if (!test) {
        throw ApiError.BadRequest(`Такого теста нет`);
      }
    } catch (error) {
      throw ApiError.BadRequest(`Очень неверный тест id`);
    }
    const question = await questionModel.findOne({ description, test_id });
    if (question) {
      throw ApiError.BadRequest(`Такой вопрос уже есть`);
    }
    const questionData = await questionModel.create({
      description,
      inputType,
      answerQuantity,
      test_id
    });
    return questionData;
  }

  async createEmptyQuestion(inputType, answerQuantity, test_id) {
    try {
      const test = await testModel.findById(test_id);
      if (!test) {
        throw ApiError.BadRequest(`Такого теста нет`);
      }
    } catch (error) {
      throw ApiError.BadRequest(`Очень неверный тест id`);
    }

    const questionData = await questionModel.create({
      inputType,
      answerQuantity,
      test_id
    });
    return questionData;
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

  async clearQuestionById(id) {
    const question = await questionModel.findById(id);
    if (!question) {
      throw ApiError.BadRequest(`Вопрос не найден!`);
    }
    await answerModel.deleteMany({
      question_id: JSON.parse(JSON.stringify(question._id))
    });

    return question;
  }
}

export default new QuestionService();
