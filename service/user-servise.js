import * as bcrypt from 'bcrypt';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import userModel from '../models/user-model.js';
import ApiError from '../exeptions/api-error.js';

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адрерссом ${email} уже существует`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user = await userModel.create({
      email,
      password: hashPassword,
      activationLink
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/users/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
    return;
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь с ${email} не найден!`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);

    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto
    };
  }

  async password(email) {
    const candidate = await userModel.findOne({ email });
    if (!candidate) {
      throw ApiError.BadRequest(
        `Пользователь с почтовым адрерссом ${email} не зарегестрирован`
      );
    }

    const recoverLink = uuidv4();
    await userModel.findOneAndUpdate(email, {
      passwordRecoveryLink: recoverLink
    });

    await mailService.sendPasswordRecoveryMail(
      email,
      `${process.env.CLIENT_URL}/recover/?link=${recoverLink}`
    );
    return recoverLink;
  }

  async recoverPassword(recoverLink, newPassword) {
    const user = await userModel.findOne({ recoverLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    const hashPassword = await bcrypt.hash(newPassword, 3);
    user.password = hashPassword;
    await user.save();
    return 'Пароль был успешно изменен';
  }

  async getAllUsers() {
    const users = await userModel.find();
    return users;
  }
}

export default new UserService();
