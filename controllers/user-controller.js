import userServise from '../service/user-servise.js';
import { body, validationResult } from 'express-validator';
import ApiError from '../exeptions/api-error.js';

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }
      const { email, password } = req.body;
      const userData = await userServise.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userServise.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userServise.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userServise.activate(activationLink);

      return res.redirect(`${process.env.CLIENT_URL}/created`);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      console.log(req.cookies);
      const { refreshToken } = req.cookies;
      const userData = await userServise.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async password(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }

      const { email } = req.body;
      await userServise.password(email);

      return res.json(
        `На почту ${email} отправлена ссылка для восстановлнеия пароля`
      );
    } catch (error) {
      next(error);
    }
  }

  async recoverPassword(req, res, next) {
    try {
      console.log(req.body);
      const recoverLink = req.body.link;
      console.log(recoverLink);
      const newPasswrod = req.body.password;
      const user = await userServise.recoverPassword(recoverLink, newPasswrod);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
  async getUsers(req, res, next) {
    try {
      const users = await userServise.getAllUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
