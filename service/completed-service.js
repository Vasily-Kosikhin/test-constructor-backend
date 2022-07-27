import ApiError from '../exeptions/api-error.js';
import answerModel from '../models/answer-model.js';
import completedModel from '../models/completed-model.js';
import currentModel from '../models/current-model.js';

import testModel from '../models/test-model.js';

class CompletedService {
  async deleteCurrentById(id) {
    const completed = await completedModel.findByIdAndDelete(id);
    if (!completed) {
      throw ApiError.BadRequest(`Тест не найден!`);
    }
    return completed;
  }
}

export default new CompletedService();
