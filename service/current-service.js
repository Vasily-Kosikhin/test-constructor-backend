import ApiError from '../exeptions/api-error.js';
import answerModel from '../models/answer-model.js';
import completedModel from '../models/completed-model.js';
import currentModel from '../models/current-model.js';
import questionModel from '../models/question-model.js';
import resultModel from '../models/result-model.js';

import testModel from '../models/test-model.js';

class CurrentService {
  async createCurrent(test_id, email, total) {
    const test = await testModel.findById(test_id);

    if (!test) {
      throw ApiError.BadRequest(`Такого теста не существует`);
    }
    const current = await currentModel.findOne({ test_id });
    if (current) {
      throw ApiError.BadRequest(`Тест уже проходится`);
    }
    const currentData = await currentModel.create({
      test_id,
      email,
      total
    });
    return currentData;
  }

  async deleteCurrentById(id) {
    const current = await currentModel.findByIdAndDelete(id);
    if (!current) {
      throw ApiError.BadRequest(`Тест не найден!`);
    }

    return current;
  }
  async makeCurrent(email, test_id, question_id, answer_id, asnwer_value) {
    const current = await currentModel.findOne({ email, test_id });
    const total = await questionModel.find({ test_id });
    if (!current) {
      await currentModel.create({
        email,
        test_id,
        question_id,
        answer_id,
        asnwer_value,
        total: total.length
      });
      return;
    }
    return;
  }

  async checkCurrent(email, test_id, question_id, answer_id, asnwer_value) {
    async function addRight(current) {
      current.question_number = Number(current.question_number) + 1;
      current.right = Number(current.right) + 1;
      await resultModel.create({ completed_id: current._id, result: true });
      await current.save();
      console.log('CURRENT R', current);
    }

    async function addWrong(current) {
      current.question_number = Number(current.question_number) + 1;
      current.wrong = Number(current.wrong) + 1;
      await resultModel.create({ completed_id: current._id, result: false });
      await current.save();
      console.log('CURRENT W', current);
    }

    const question = await questionModel.findById(question_id);
    if (!question) {
      throw ApiError.BadRequest(`Неверный question_id`);
    }

    const current = await currentModel.findOne({ email, test_id });
    if (!current) {
      throw ApiError.BadRequest(`Уже сущесвтует!`);
    }

    if (question.inputType) {
      const answer = await answerModel.findById(answer_id);
      if (answer.value.toUpperCase() === asnwer_value.toUpperCase()) {
        await addRight(current);
        return current;
      }
      await addWrong(current);

      return current;
    }

    const answers = answer_id.split(',');

    let sum = 0;

    if (answers.length > 1) {
      for (let i = 0; i < answers.length; i++) {
        const answer = await answerModel.findOne({ _id: answers[i] });

        if (answer) {
          if (answer.correct) {
            sum += 1;
          } else {
            sum -= 1;
          }
        }
      }
    } else {
      const answer = await answerModel.findOne({ _id: answers[0] });
      if (answer) {
        if (answer.correct) {
          sum += 1;
        } else {
          sum -= 1;
        }
      }
    }
    console.log('SUM', sum);
    console.log('question.answerQuantity', question.answerQuantity);
    if (sum === Number(question.answerQuantity)) {
      await addRight(current);
      return current;
    }
    await addWrong(current);

    return current;
  }

  async finishTest(checkResult) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const passedDate = new Date().toLocaleDateString('ru-RU', options);
    const title = await testModel.findById(checkResult.test_id);

    const completed = await completedModel.create({
      email: checkResult.email,
      test_id: checkResult.test_id,
      passed_at: passedDate,
      right: checkResult.right,
      wrong: checkResult.wrong,
      total: checkResult.total,
      title: title.title
    });

    const results = await resultModel.find({
      completed_id: JSON.parse(JSON.stringify(checkResult._id))
    });

    for (let result of results) {
      result.completed_id = JSON.parse(JSON.stringify(completed._id));
      await result.save();
    }

    await currentModel.findByIdAndDelete(checkResult._id);
    return completed;
  }
}

export default new CurrentService();
