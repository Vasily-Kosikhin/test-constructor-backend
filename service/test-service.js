import ApiError from '../exeptions/api-error.js';
import answerModel from '../models/answer-model.js';
import questionModel from '../models/question-model.js';
import testModel from '../models/test-model.js';
import userModel from '../models/user-model.js';

class TestService {
  async create(title, email) {
    const author = await userModel.findOne({ email });
    if (!author.isActivated) {
      throw ApiError.BadRequest(
        `Аккаунт пользователя не активирован. Проверьте почту`
      );
    }
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const test = await testModel.findOne({ title });
    if (test) {
      throw ApiError.BadRequest(`Тест с таким названием уже существует`);
    }
    const creationDate = new Date().toLocaleDateString('ru-RU', options);
    const testData = await testModel.create({
      title,
      email,
      author_id: author._id,
      created_at: creationDate
    });
    return testData;
  }

  async getAllTests() {
    const tests = await testModel.find();
    return tests;
  }
  async getTestById(id) {
    const test = await testModel.findById(id);
    if (!test) {
      throw ApiError.BadRequest(`Тест не найден!`);
    }
    return test;
  }
  async updateTest(title, id) {
    const test = await testModel.findById(id);
    if (!test) {
      throw ApiError.BadRequest(`Тест не найден!`);
    }
    console.log(`test`, test);
    if (test.title === title) {
      throw ApiError.BadRequest(`Тест с таким названием уже существует`);
    }
    test.title = title;
    await test.save();
    return test;
  }
  async deleteTestById(id) {
    const test = await testModel.findByIdAndDelete(id);
    if (!test) {
      throw ApiError.BadRequest(`Тест не найден!`);
    }
    const question = await questionModel.find({ test_id: id });

    await questionModel.deleteMany({ test_id: id });

    for (let quest of question) {
      await answerModel.deleteMany({
        question_id: JSON.parse(JSON.stringify(quest._id))
      });
    }

    return test;
  }

  async getFullTestById(id) {
    const superTest = {};
    const test = await testModel.findById(id);
    if (!test) {
      throw ApiError.BadRequest(`Тест не найден!`);
    }
    superTest.test = test;

    const question = await questionModel.find({ test_id: id });
    superTest.question = question;
    async function findAnswers(question) {
      let test = {};
      for (let quest of question) {
        test.answer = await answerModel.find({
          question_id: JSON.parse(JSON.stringify(quest._id))
        });

        console.log(JSON.parse(JSON.stringify(quest._id)));
      }
      return test;
    }
    const Best = await findAnswers(question);
    return superTest;
  }
}

export default new TestService();
