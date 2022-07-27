import testService from '../service/test-service.js';

class TestController {
  async createTest(req, res, next) {
    try {
      const { title, email } = req.body;
      console.log(req.body);
      const testData = await testService.create(title, email);
      return res.json(testData);
    } catch (error) {
      next(error);
    }
  }

  async getAllTests(req, res, next) {
    try {
      const tests = await testService.getAllTests();
      return res.json(tests);
    } catch (error) {
      next(error);
    }
  }
  async getTestById(req, res, next) {
    try {
      const testId = req.params.id;
      console.log(`testId`, testId);
      const test = await testService.getTestById(testId);
      return res.json(test);
    } catch (error) {
      next(error);
    }
  }
  async updateTest(req, res, next) {
    try {
      const { title, id } = req.body;
      const updatedTest = await testService.updateTest(title, id);
      return res.json(updatedTest);
    } catch (error) {
      next(error);
    }
  }
  async deleteTestById(req, res, next) {
    try {
      const id = req.params.id;
      const test = await testService.deleteTestById(id);

      return res.json(`Тест ${test.title} удален`);
    } catch (error) {
      next(error);
    }
  }
  async getCompletedTests(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getFullTestById(req, res, next) {
    try {
      const testId = req.params.id;

      const test = await testService.getFullTestById(testId);
      console.log(test);
      return res.json(test);
    } catch (error) {
      next(error);
    }
  }
}

export default new TestController();
