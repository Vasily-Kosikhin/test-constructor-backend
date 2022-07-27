import ApiError from '../exeptions/api-error.js';
import completedModel from '../models/completed-model.js';

import completedService from '../service/completed-service.js';

class CompletedController {
  async createCompleted(req, res, next) {
    try {
      const { email, test_id, passed_at, right, wrong, total, title } =
        req.body;
      const currentData = await completedModel.create({
        email,
        test_id,
        passed_at,
        right,
        wrong,
        total,
        title
      });
      return res.json(currentData);
    } catch (error) {
      next(error);
    }
  }

  async deleteCompletedById(req, res, next) {
    try {
      const id = req.params.id;
      await completedService.deleteCurrentById(id);
      return res.json(`Прохождение удалено`);
    } catch (error) {
      next(error);
    }
  }

  async getCompletedById(req, res, next) {
    try {
      const id = req.params.id;
      const completed = await completedModel.findById(id);
      if (!completed) {
        throw ApiError.BadRequest(`Тест не найден!`);
      }
      return res.json(completed);
    } catch (error) {
      next(error);
    }
  }

  async getAllCompleted(req, res, next) {
    try {
      const completed = await completedModel.find();
      return res.json(completed);
    } catch (error) {
      next(error);
    }
  }
}

export default new CompletedController();
