import resultModel from '../models/result-model.js';
import resultService from '../service/result-service.js';

class ResultController {
  async createResult(req, res, next) {
    try {
      const { completed_id, result } = req.body;
      const resultData = await resultService.createResult(completed_id, result);
      return res.json(resultData);
    } catch (error) {
      next(error);
    }
  }

  async getResult(req, res, next) {
    try {
      const id = req.params.id;
      const result = await resultModel.find({ completed_id: id });
      return res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteResult(req, res, next) {
    try {
      const id = req.params.id;
      await resultModel.deleteMany({ completed_id: id });
      return res.json(`Результаты удалены`);
    } catch (error) {
      next(error);
    }
  }
}
export default new ResultController();
